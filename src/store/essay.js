import { defineStore } from 'pinia';
import localForage from "localforage";
import DiffMatchPatch from 'diff-match-patch';

const storage = localForage.createInstance({
    storeName: "essay",
    description: "Essay data",
});

const dmp = new DiffMatchPatch();

const checkInterval = 1000;     // time (ms) to wait for a new update check (e.g. 0.2s to 1s)
const saveInterval = 5000;      // maximum time (ms) to wait for a new save if content is changed
const saveDistance = 5;         // maximum levenshtein distance to wait for a new save if content is changed
const maxDistance = 1000;       // maximum cumulated levenshtein distance of patches before a new full save is done

const typeFull = 'FULL';        // type of a save object with full text
const typeDiff = 'DIFF';        // type of a save object with patch text from diff

const startState = {
    currentContent: '',         // directly mapped to the editor
    historyContent: '',         // full content of the last history entry
    history: [],                // list of save objects
    sumOfDistances: 0,          // sum of levenshtine distances sice the last full save
    lastFullIndex: -1,          // history index of the last full save
    lastStoredIndex: -1,        // history index of the last save in the store
    lastCheck: 0,               // timestamp of the last check if an update needs a saving
    lastSave: 0,                // timestamp of the last save in the store
}

let lockUpdate = 0;             // prevent updates during a processing

/**
 * Essay store
 */
export const useEssayStore = defineStore('essay',{

    state: () => {

        // todo: check if state is set as a reference, then use the alternative way
        return startState;

        // alternative deep copy
        // return JSON.parse(JSON.stringify(startState));
    },

    getters: {
        hasHistory: (state) => state.history.length > 0,
        historyLength: (state) => state.history.length,

        formatTimestamp() {
            return (timestamp) => (new Date(timestamp)).toISOString().slice(0, 23).replace('T', ' ');
        },
        formatIndex() {
            return (index) => index.toString().padStart(9, '0');
        }
    },

    actions: {

        /**
         * Load the full state from external data and save it to the storage
         * Called when the app is opened from the backend
         */
        async loadFromData(data) {
            lockUpdate = 1;

            try {
                this.$state = startState;  // todo check if referenced
                this.currentContent = data.content;
                this.historyContent = data.content;

                await storage.clear();
                await storage.setItem('content', this.currentContent);

                let index = 0;
                while (index < data.history.length) {
                    let entry = data.history[index];
                    let saveObject = {
                        type: entry.type,
                        time: entry.time,
                        distance: entry.distance,
                        content: entry.content
                    }
                    this.history.push(saveObject);
                    if (saveObject.type == typeFull) {
                        this.sumOfDistances = 0;
                        this.lastFullIndex = index;
                    }
                    else {
                        this.sumOfDistances += saveObject.distance;
                    }

                    await storage.setItem(this.formatIndex(index), saveObject);
                    this.lastStoredIndex = index;
                    index++;
                }

                this.lastStoredIndex = this.history.length -1;
                await storage.setItem('lastStoredIndex', this.lastStoredIndex);

            } catch (err) {
                console.log(err);
            }

            lockUpdate = 0;
            setInterval(this.updateContent, checkInterval);
        },

        /**
         * Load the full state from the storage
         * Called when the page is reloaded 
         */
        async loadFromStorage() {
            lockUpdate = 1;

            try {
                this.$state = startState; // todo check if referenced

                this.currentContent =  await storage.getItem('content') ?? '';
                this.lastStoredIndex = await storage.getItem('lastStoredIndex') ?? -1;
                this.historyContent = this.currentContent

                let index = 0;
                while (index <= this.lastStoredIndex) {
                    let saveObject = await storage.getItem(this.formatIndex(index));
                    if (saveObject == null) {
                        break;
                    }
                    this.history.push(saveObject);
                    this.lastSave = saveObject.time
                    if (saveObject.type == typeFull) {
                        this.sumOfDistances = 0;
                        this.lastFullIndex = index;
                    }
                    else {
                        this.sumOfDistances += saveObject.distance;
                    }
                    index++;
                }

            } catch (err) {
                console.log(err);
            }

            lockUpdate = 0;
            setInterval(this.updateContent, checkInterval);
        },


        /**
         * Update the stored content
         * Triggered from the editor component when the content is changed
         */
        async updateContent(fromEditor = false) {

            // avoid too many checks
            const currentTime = Date.now();
            if (currentTime - this.lastCheck < checkInterval) {
                return;
            }

            // avoid parallel updates
            // no need to wait because update is checked by interval
            // use post-increment for test-and set
            if (lockUpdate++) {
                return;
            }


            try {
                const currentContent = this.currentContent + '';   // ensure it is not changed because content is bound to tiny
                const historyContent = this.historyContent + '';
                let saveObject = null;

                //
                // create the save object if content has changed
                //
                if ((currentContent != historyContent)) {

                    // check for change and calculate the patch
                    let diffs = dmp.diff_main(historyContent, currentContent);
                    dmp.diff_cleanupEfficiency(diffs);
                    const distance = dmp.diff_levenshtein(diffs);
                    const difftext = dmp.patch_toText(dmp.patch_make(historyContent, diffs));

                    // be sure that the patch works
                    const result = dmp.patch_apply(dmp.patch_fromText(difftext), historyContent);

                    // make a full save if ...
                    if (this.history.length == 0                            // it is the first save
                        || difftext.length > currentContent.length          // or diff would be longer than full text
                        || this.sumOfDistances + distance > maxDistance     // or enough changes are saved as diffs
                        || result[0] != currentContent                      // or patch is wrong
                    ) {
                        saveObject = {
                            type: typeFull,
                            time: currentTime,
                            distance: 0,
                            content: currentContent,
                        }
                    }
                    // make a diff save if ...
                    else if (distance >= saveDistance                       // enouch changed since lase save
                        || currentTime - this.lastSave > saveInterval       // enogh time since last save
                    ) {
                        saveObject = {
                            type: typeDiff,
                            time: currentTime,
                            distance: distance,
                            content: difftext,
                        }
                    }
                }

                //
                // add the save object to the history
                //
                if (saveObject !== null) {

                    // push to history
                    this.history.push(saveObject);
                    this.historyContent = currentContent;
                    const lastIndex = this.history.length - 1;
                    if (saveObject.type == typeFull) {
                        this.lastFullIndex = lastIndex;
                        this.sumOfDistances = 0;
                    } else {
                        this.sumOfDistances = this.sumOfDistances + saveObject.distance;
                    }

                    // save in storage
                    await storage.setItem('content', currentContent);
                    await storage.setItem(this.formatIndex(lastIndex), saveObject);
                    await storage.setItem('lastStoredIndex', lastIndex);
                    this.lastStoredIndex = lastIndex;
                    this.lastSave = currentTime;

                    console.log(
                        "Type:", saveObject.type,
                        "| Distance (sum): ", saveObject.distance, "(", this.sumOfDistances, ")",
                        "| Editor: ", fromEditor,
                        "| Duration:", Date.now() - currentTime, 'ms');
                }

                // set this here
                this.lastCheck = currentTime;
            }
            catch(error) {
                console.error(error);
            }

            lockUpdate = 0;
        }
    }
});