import { defineStore } from 'pinia';
import localForage from "localforage";

const storage = localForage.createInstance({
    storeName: "writer-settings",
    description: "Settings data",
});

/**
 * Settings Store
 * Handles the editor settings of the writing task
 */
export const useSettingsStore = defineStore('settings',{
    state: () => {
        return {
            // saved in storage
            headline_scheme: null,          // identifier (string) of the CSS scheme used for headlines
            formatting_options: null,       // identifier (string) if the available formatting otions
            notice_boards: null,            // number (int) of available notice boards
            copy_allowed: null,             // flag (bool) if copy/paste from other web sites should be allowed
            primary_color: null,            // color for the background of primary actions
            primary_text_color: null,       // color for the text of primary actions
        }
    },

    getters: {
        primaryColorCss: (state) => {
            if (state.primary_color) {
                return '#' + state.primary_color
            }
            return '';
        },

        primaryTextColorCss: (state) => {
            if (state.primary_text_color) {
                return '#' + state.primary_text_color
            }
            return '';
        },

        primaryTextColorFullCss: (state) => {
            if (state.primary_text_color) {
                return 'color: #' + state.primary_text_color + ';'
            }
            return '';
        }
    },

    actions: {
        setData(data) {
            this.headline_scheme = data.headline_scheme;
            this.formatting_options = data.formatting_options;
            this.notice_boards = data.notice_boards;
            this.copy_allowed = data.copy_allowed;
            this.primary_color = data.primary_color;
            this.primary_text_color = data.primary_text_color;
        },

        async clearStorage() {
            try {
                await storage.clear();
            }
            catch (err) {
                console.log(err);
            }
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