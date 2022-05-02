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
            title: null,
            writer_name: null,
            instructions: null,
            writing_end: null
        }
    },

    getters: {
        hasWritingEnd: (state) => !!state.writing_end,
        writingEndReached: (state) => state.hasWritingEnd && state.remainingTime > 0,
        remainingTime: function(state) {
            const apiStore = useApiStore();
            return function () {
                return state.writing_end * 1000 + apiStore.timeOffset - Date.now()
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