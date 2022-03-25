import { defineStore } from 'pinia';
import axios from 'axios'
import Cookies from 'js-cookie';
import {useTaskStore} from "./task";
import {useLayoutStore} from "./layout";
import {useResourcesStore} from "./resources";

/**
 * API Store
 */
export const useApiStore = defineStore('api', {
    state: () => {
        return {
            initialized: false,
            backendUrl: '',
            returnUrl: '',
            userKey: '',
            environmentKey: '',
            authToken: ''
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
        setInitialized(initialized) {
            this.initialized = initialized;
        },
        setBackendUrl(url) {
            this.backendUrl = url;
            localStorage.setItem('backendUrl', url);
        },
        setReturnUrl(url) {
            this.returnUrl = url;
            localStorage.setItem('returnUrl', url);
        },
        setUserKey(key) {
            this.userKey = key;
            localStorage.setItem('userKey', key);
        },
        setEnvironmentKey(key) {
            this.environmentKey = key;
            localStorage.setItem('environmentKey', key);
        },
        setAuthToken(token) {
            this.authToken = token;
            localStorage.setItem('authToken', token);
        },
        refreshToken(response) {
            this.authToken = response.headers['longessaytoken'];
            localStorage.setItem('authToken', this.authToken);
        },

        /**
         * Init the state
         * Take the state from the cookies or local store
         * Trigger a reload of all data if cookie valies differ from local store
         */
        async init () {

            let toReload = false;

            // take values formerly stored
            let backendUrl = localStorage.getItem('backendUrl');
            let returnUrl = localStorage.getItem('returnUrl');
            let userKey = localStorage.getItem('userKey');
            let environmentKey = localStorage.getItem('environmentKey');
            let authToken = localStorage.getItem('authToken');


            // check if cookie values differ and force a reload
            if (!!Cookies.get('LongEssayBackend') && Cookies.get('LongEssayBackend') !== backendUrl) {
                backendUrl = Cookies.get('LongEssayBackend');
                toReload = true;
            }
            if (!!Cookies.get('LongEssayReturn') && Cookies.get('LongEssayReturn') !== returnUrl) {
                returnUrl = Cookies.get('LongEssayReturn');
                toReload = true;
            }
            if (!!Cookies.get('LongEssayUser') && Cookies.get('LongEssayUser') !== userKey) {
                userKey = Cookies.get('LongEssayUser');
                toReload = true;
            }
            if (!!Cookies.get('LongEssayEnvironment') && Cookies.get('LongEssayEnvironment') !== environmentKey) {
                environmentKey = Cookies.get('LongEssayEnvironment');
                toReload = true;
            }
            if (!!Cookies.get('LongEssayToken') && Cookies.get('LongEssayToken') !== authToken) {
                authToken = Cookies.get('LongEssayToken');
                toReload = true;
            }

            // remove the cookies
            // needed to distinct the call from the backend from a later reload
            Cookies.remove('LongEssayBackend');
            Cookies.remove('LongEssayReturn');
            Cookies.remove('LongEssayUser');
            Cookies.remove('LongEssayEnvironment');
            Cookies.remove('LongEssayToken');

            // save the current values
            if (!!backendUrl && !!returnUrl && !!userKey && !!environmentKey && !!authToken) {
                this.setBackendUrl(backendUrl);
                this.setReturnUrl(returnUrl);
                this.setUserKey(userKey);
                this.setEnvironmentKey(environmentKey);
                this.setAuthToken(authToken);

                if (toReload) {
                    await this.loadDataFromBackend();
                }
                else {
                    await this.loadDataFromStorage();
                }


                this.setInitialized(true);
            }
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

            const taskStore = useTaskStore();
            await taskStore.loadFromData(response.data.task);
        },

        /**
         * Load all data from the storage
         */
        async loadDataFromStorage() {
            console.log("loadDataFromStorage...");

            const taskStore = useTaskStore();
            await taskStore.loadFromStorage();

            const layoutStore = useLayoutStore();
            await layoutStore.loadFromStorage();

            const resourcesStore = useResourcesStore();
            await resourcesStore.loadFromStorage();
        }
    }
})