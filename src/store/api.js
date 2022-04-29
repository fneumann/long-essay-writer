import { defineStore } from 'pinia';
import axios from 'axios'
import Cookies from 'js-cookie';
import {useSettingsStore} from "./settings";
import {useTaskStore} from "./task";
import {useLayoutStore} from "./layout";
import {useResourcesStore} from "./resources";
import {useEssayStore} from "./essay";

/**
 * API Store
 * Handles the communication with the backend
 */
export const useApiStore = defineStore('api', {
    state: () => {
        return {
            initialized: false,
            review: false,
            toReload: false,
            showInitFailure: false,
            showReloadConfirmation: false,

            backendUrl: '',
            returnUrl: '',
            userKey: '',
            environmentKey: '',
            authToken: '',
        }
    },

    getters: {
        // config for backend calls
        requestConfig(state) {

            let baseURL = state.backendUrl;
            let params = new URLSearchParams();

            // cut query string and set it as params
            // a REST path is added as url to the baseURL by axias calls
            let position = baseURL.search(/\?+/);
            if (position != -1) {
                params = new URLSearchParams(baseURL.substr(position))
                baseURL = baseURL.substr(0, position);
            }

            return {
                baseURL: baseURL,
                params: params,
                headers: {
                    'LongEssayUser': state.userKey,
                    'LongEssayEnvironment': state.environmentKey,
                    'LongEssayToken': state.authToken
                },
                timeout: 30000,             // milliseconds
                responseType: 'json',       // default
                responseEncoding: 'utf8',   // default
            }
        }
    },


    actions: {

        /**
         * Init the state
         * Take the state from the cookies or local store
         * Trigger a reload of all data if cookie values differ from local store
         */
        async init () {

            // take values formerly stored
            this.backendUrl = localStorage.getItem('backendUrl');
            this.returnUrl = localStorage.getItem('returnUrl');
            this.userKey = localStorage.getItem('userKey');
            this.environmentKey = localStorage.getItem('environmentKey');
            this.authToken = localStorage.getItem('authToken');

            // check if context given by cookies differs and force a reload if neccessary
            if (!!Cookies.get('LongEssayUser') && Cookies.get('LongEssayUser') !== this.userKey) {
                this.userKey = Cookies.get('LongEssayUser');
                this.toReload = true;
            }
            if (!!Cookies.get('LongEssayEnvironment') && Cookies.get('LongEssayEnvironment') !== this.environmentKey) {
                this.environmentKey = Cookies.get('LongEssayEnvironment');
                this.toReload = true;
            }

            // these values can be changed without forcing a reload
            if (!!Cookies.get('LongEssayBackend') && Cookies.get('LongEssayBackend') !== this.backendUrl) {
                this.backendUrl = Cookies.get('LongEssayBackend');
            }
            if (!!Cookies.get('LongEssayReturn') && Cookies.get('LongEssayReturn') !== this.returnUrl) {
                this.returnUrl = Cookies.get('LongEssayReturn');
            }
            if (!!Cookies.get('LongEssayToken') && Cookies.get('LongEssayToken') !== this.authToken) {
                this.authToken = Cookies.get('LongEssayToken');
            }

             // check what to do
            if (!!this.backendUrl && !!this.returnUrl && !!this.userKey && !!this.environmentKey && !!this.authToken) {

                if (this.toReload) {
                    const essayStore = useEssayStore();
                    if (await essayStore.hasUnsentSavingsInStorage()) {
                        this.showReloadConfirmation = true;
                    }
                    else {
                        this.configure();
                    }
                }
                else {
                    this.configure();
                }
            }
            else {
                this.showInitFailure = true;
            }
        },

        /**
         * Configure the app
         * This is called when the initialisation can be done silently
         * Or when a confirmation dialog is confirmed
         */
        async configure() {

            // remove the cookies
            // needed to distinct the call from the backend from a later reload
            Cookies.remove('LongEssayBackend');
            Cookies.remove('LongEssayReturn');
            Cookies.remove('LongEssayUser');
            Cookies.remove('LongEssayEnvironment');
            Cookies.remove('LongEssayToken');

            localStorage.setItem('backendUrl', this.backendUrl);
            localStorage.setItem('returnUrl', this.returnUrl);
            localStorage.setItem('userKey', this.userKey);
            localStorage.setItem('environmentKey', this.environmentKey);
            localStorage.setItem('authToken', this.authToken);

            if (this.toReload) {
                await this.loadDataFromBackend();
            } else {
                await this.loadDataFromStorage();
            }

            this.initialized = true;
        },


        /**
         * Load all data from the backend
         */
        async loadDataFromBackend() {
            console.log("loadDataFromBackend...");
            let response = {};
            try {
                response = await axios.get( '/data', this.requestConfig);
                this.refreshToken(response);
            }
            catch (error) {
                console.error(error);
                return;
            }

            const settingsStore = useSettingsStore();
            await settingsStore.loadFromData(response.data.settings);

            const taskStore = useTaskStore();
            await taskStore.loadFromData(response.data.task);

            const essayStore = useEssayStore();
            await essayStore.loadFromData(response.data.essay);
        },

        /**
         * Load all data from the storage
         */
        async loadDataFromStorage() {
            console.log("loadDataFromStorage...");

            const settings = useSettingsStore();
            await settings.loadFromStorage();

            const taskStore = useTaskStore();
            await taskStore.loadFromStorage();

            const layoutStore = useLayoutStore();
            await layoutStore.loadFromStorage();

            const resourcesStore = useResourcesStore();
            await resourcesStore.loadFromStorage();

            const essayStore = useEssayStore();
            await essayStore.loadFromStorage();
        },

        /**
         * Save the writing steps to the backend
         */
        async saveWritingStepsToBackend(steps) {
            let response = {};
            let data = {
                steps: steps
            }
            try {
                response = await axios.put( '/steps', data, this.requestConfig);
                this.refreshToken(response);
                return true;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        },

        /**
         * Refresh the auth token with the value from the REST response
         */
        refreshToken(response) {
            this.authToken = response.headers['longessaytoken'];
            localStorage.setItem('authToken', this.authToken);
        },

    }
})