import { defineStore } from 'pinia';
import localForage from "localforage";

const storage = localForage.createInstance({
    storeName: "task",
    description: "Task data",
});

/**
 * Task Store
 */
export const useTaskStore = defineStore('task',{
    state: () => {
        return {
            instructions: null,
            writing_end: null
        }
    },

    actions: {
        setData(data) {
            this.instructions = data.instructions;
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