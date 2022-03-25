import { defineStore } from 'pinia';
import localForage from "localforage";

const storage = localForage.createInstance({
    storeName: "essay",
    description: "Essay data",
});

/**
 * Essay store
 */
export const useEssayStore = defineStore('essay',{
    state: () => {
        return {
            current: '',
            history: [
            ]
        }
    },

    getters: {
        hasHistory: (state) => state.history.length > 0,
        historyLength: (state) => state.history.length
    },

    actions: {
        async loadFromStorage() {
            try {
                //this.resources = await storage.getItem('resources');
                this.current =  await storage.getItem('current');
            } catch (err) {
                console.log(err);
            }
        },

        async saveToStorage() {
            try {
                //await storage.setItem('resources', this.resources);
                await storage.setItem('current', this.current);
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

        async updateContent(oldContent, newContent) {
            this.history.push(this.current);
            this.current = newContent
        }
    }
});