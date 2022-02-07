import {createStore} from "vuex";
import axios from 'axios'
import Cookies from 'js-cookie';
import task from './task';

/**
 * Root Store
 */
const state = {
        initialized: false,
        backendUrl: '',
        returnUrl: '',
        userKey: '',
        environmentKey: '',
        authToken: '',
}

const getters = {
    initialized: state => state.initialized,
    backendUrl: state => state.backendUrl,
    returnUrl: state => state.returnUrl,
    userKey: state => state.userKey,
    environmentKey: state => state.environmentKey,
    authToken: state => state.authToken,

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
}

const mutations = {
    setInitialized(state, initialized) {
        state.initialized = initialized;
    },
    setBackendUrl(state, url) {
        state.backendUrl = url;
        localStorage.setItem('backendUrl', url);
        },
    setReturnUrl(state, url) {
        state.returnUrl = url;
        localStorage.setItem('returnUrl', url);
    },
    setUserKey(state, key) {
        state.userKey = key;
        localStorage.setItem('userKey', key);
    },
    setEnvironmentKey(state, key) {
        state.environmentKey = key;
        localStorage.setItem('environmentKey', key);
    },
    setAuthToken(state, token) {
        state.authToken = token;
        localStorage.setItem('authToken', token);
    },
    refreshToken(state, response) {
        state.authToken = response.headers['LongEssayToken'];
        localStorage.setItem('authToken', state.authToken);
    }
}

const actions = {

    /**
     * Init the state
     * Take the state from the cookies or local store
     * Trigger a reload of all data if cookie valies differ from local store
     */
    async init ({commit, dispatch}) {

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

        // remove the cookies (no longer needed)
        Cookies.remove('LongEssayBackend');
        Cookies.remove('LongEssayReturn');
        Cookies.remove('LongEssayUser');
        Cookies.remove('LongEssayEnvironment');
        Cookies.remove('LongEssayToken');

        // save the current values
        if (!!backendUrl && !!returnUrl && !!userKey && !!environmentKey && !!authToken) {
            commit('setBackendUrl', backendUrl);
            commit('setReturnUrl', returnUrl);
            commit('setUserKey', userKey);
            commit('setEnvironmentKey', environmentKey);
            commit('setAuthToken', authToken);

            if (toReload) {
                await dispatch('loadData');
            }

            commit('setInitialized', true);
        }
    },

    /**
     * Load all data from the backend
     */
    async loadData({commit, getters, dispatch}) {

        let response = {};

        // call backend
        try {
            console.log(getters.axiosConfig);
            response = await axios.get( '/', getters.requestConfig);
            console.log(response);
        } catch (error) {
            console.error(error);
            return;
        }

        await dispatch('task/loadFromData', response.data.task);

        commit('refreshToken', response);
        commit('setInitialized', true);
    }
}

const modules = {
    task: task
}

export default createStore({
    state,
    getters,
    mutations,
    actions,
    modules
})