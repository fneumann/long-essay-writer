import { defineStore } from 'pinia';
import localForage from "localforage";

const storage = localForage.createInstance({
    storeName: "settings",
    description: "Settings data",
});

/**
 * Settings Store
 * Handles the editor settings of the writing task
 */
export const useSettingsStore = defineStore('settings',{
    state: () => {
        return {
            headline_scheme: null,
            formatting_options: null,
            notice_boards: null,
            copy_allowed: null
        }
    },

    actions: {
        setData(data) {
            this.headline_scheme = data.headline_scheme;
            this.formatting_options = data.formatting_options;
            this.notice_boards = data.notice_boards;
            this.copy_allowed = data.copy_allowed;
        },

        async loadFromStorage() {
            try {
                const data = await storage.getItem('settings');
                this.setData(data);
            } catch (err) {
                console.log(err);
            }
        },

        async loadFromData(data) {
            try {
                await storage.setItem('settings', data);
                this.setData(data);
            } catch (err) {
                console.log(err);
            }
        }
    }
});