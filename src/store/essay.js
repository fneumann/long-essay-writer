import { defineStore } from 'pinia';
import localForage from "localforage";
import DiffMatchPatch from 'diff-match-patch';

const storage = localForage.createInstance({
    storeName: "essay",
    description: "Essay data",
});

const dmp = new DiffMatchPatch();

const checkSeconds = 1;         // seconds to wait for a new update
const checkDistance = 10;       // levenshtein distance to wait for a new history entry
const maxDistance = 1000;       // maximum cumulated levenshtein distance of patches before a new full save is done

const typeFull = 'FULL';
const typeDiff = 'DIFF';

/**
 * Essay store
 */
export const useEssayStore = defineStore('essay',{
    state: () => {
        return {
            content: '',
            contentHistory: [
            ],
            sumOfDistance: 0,
            lastFullIndex: -1,
            lastStoredIndex: -1,
            lastCheck: (new Date()).getTime(),
            lockUpdate: false,
        }
    },

    getters: {
        hasHistory: (state) => state.contentHistory.length > 0,
        historyLength: (state) => state.contentHistory.length
    },

    actions: {
        async loadFromStorage() {
            try {
                this.currentContent =  await storage.getItem('currentContent');
            } catch (err) {
                console.log(err);
            }
        },

        async saveToStorage() {
            try {
                await storage.setItem('currentContent', this.currentContent);
            } catch (err) {
                console.log(err);
            }
        },

        async loadFromData(data) {
            try {
                //this.history = data.history;
                this.current = data.current;
                await this.saveToStorage();
            } catch (err) {
                console.log(err);
            }
        },

        async updateContent() {
            // avoid parallel updates
            if (this.lockUpdate) {
                return;
            }
            this.lockUpdate = true;

            const currentContent = this.content + '';       // ensure it is not changed because content is boud to tiny
            const currentTime = (new Date()).getTime();
            let toPush = null;

            if (this.contentHistory.length == 0) {
                toPush = {
                    type: typeFull,
                    time: currentTime,
                    content: currentContent,
                    distance: 0
                }
            }
            else if ((currentTime - this.lastCheck) / 1000 >= checkSeconds) {

                const lastIndex = this.contentHistory.length -1;

                let diffs = dmp.diff_main(currentContent, this.contentHistory[lastIndex].content);
                dmp.diff_cleanupEfficiency(diffs);
                const distance = dmp.diff_levenshtein(diffs);
                if (this.sumOfDistance + distance > maxDistance) {
                    toPush = {
                        type: typeFull,
                        time: currentTime,
                        content: currentContent,
                        distance: 0
                    }
                }
                else if (distance >= checkDistance) {
                    toPush = {
                        type: typeDiff,
                        time: currentTime,
                        content: dmp.patch_toText(dmp.patch_make(currentContent, diffs)),
                        distance: distance
                    }
                }
            }

            // push to history
            if (toPush !== null) {
                this.contentHistory.push(toPush);
                if (toPush.type == typeFull) {
                    this.lastFullIndex = this.contentHistory.length - 1;
                    this.sumOfDistance = 0;
                }
                else {
                    this.sumOfDistance = this.sumOfDistance + toPush.distance;
                }

                // toDo: save current content and history
            }

            this.lastCheck = currentTime;
            this.lockUpdate = false;
        }
    }
});