import { defineStore } from 'pinia';
import localForage from "localforage";
import {useApiStore} from "./api";

const storage = localForage.createInstance({
    storeName: "task",
    description: "Task data",
});



/**
 * Task Store
 * Handles settings of the writing task
 */
export const useTaskStore = defineStore('task',{
    state: () => {
        return {
            // saved in storage
            title: null,            // title of the task - shown in the app bar
            writer_name: null,      // name of the writer - shown in the app bar
            instructions: null,     // instructions - shown in the left column
            writing_end: null       // writung end (sec in server time) - accept no writing step after this time
        }
    },

    getters: {
        hasWritingEnd: (state) => !!state.writing_end,
        writingEndReached: (state) => state.remainingTime === 0,

        /**
         * Remaining writing time in seconds
         * After this time no writing step should be accepted anymore
         * @return int|null
         */
        remainingTime: function(state) {
            const apiStore = useApiStore();

            return function () {
                if (state.writing_end) {
                    return Math.max(0, state.writing_end - apiStore.serverTime(Date.now()));
                }
                else {
                    return null;
                }
            }
        },
    },

    actions: {
        setData(data) {
            this.title = data.title;
            this.instructions = data.instructions;
            this.writer_name = data.writer_name;
            this.writing_end = data.writing_end;
        },

        async loadFromStorage() {
            try {
                const data = await storage.getItem('task');
                this.setData(data);
            } catch (err) {
                console.log(err);
            }
        },

        async loadFromData(data) {
            try {
                await storage.setItem('task', data);
                this.setData(data);
            } catch (err) {
                console.log(err);
            }
        }
    }
});