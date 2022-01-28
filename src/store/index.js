import {createStore} from "vuex";
import Cookies from 'js-cookie';

/**
 * Root Store
 */
const state = {
        initialized: '',
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
    authToken: state => state.authToken
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
    }
}

const actions = {

    /**
     * Init the state
     * Take the state from the cookies or local store
     * Trigger a reload of all data if cookie valies differ from local store
     *
     * @param commit
     */
    init ({commit}) {

        let toReload = false;

        // take values formerly stored
        let backendUrl = localStorage.getItem('backendUrl');
        let returnUrl = localStorage.getItem('returnUrl');
        let userKey = localStorage.getItem('userKey');
        let environmentKey = localStorage.getItem('environmentKey');
        let authToken = localStorage.getItem('authToken');


        // check if cookie falues difer and force a reload
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

        // save the current calues
        if (!!backendUrl && !!returnUrl && !!userKey && !!environmentKey && !!authToken) {
            commit('setBackendUrl', backendUrl);
            commit('setReturnUrl', returnUrl);
            commit('setUserKey', userKey);
            commit('setEnvironmentKey', environmentKey);
            commit('setAuthToken', authToken);
            commit('setInitialized', true);

            if (toReload) {
                // todo: dispatch loading of all other values
            }
        }

        // remove the cookies (no longer needed)
        Cookies.remove('LongEssayBackend');
        Cookies.remove('LongEssayReturn');
        Cookies.remove('LongEssayUser');
        Cookies.remove('LongEssayEnvironment');
        Cookies.remove('LongEssayToken');
    }
}

const modules = {

}

export default createStore({
    state,
    getters,
    mutations,
    actions,
    modules
})