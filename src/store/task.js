import localForage from "localforage";

const storage = localForage.createInstance({
    storeName: "task",
    description: "Task data",
});

/**
 * Task Store
 */
const state = {
    instructions: 'not yet loaded'
}

const getters = {
    instructions: state => state.instructions,
}

const mutations = {
    setInstructions(state, instructions) {
        state.instructions = instructions;
    }
}

const actions = {
    async loadFromStorage({commit}) {
        try {
            const value = await storage.getItem('instructions');
            console.log('got instructions from storage');
            commit('setInstructions', value);
        } catch (err) {
            console.log(err);
        }

        // other properties
    },

    async loadFromData({commit}, data) {
        try {
            await storage.setItem('instructions', data.instructions);
            console.log('got instructions from storage');
            commit('setInstructions', data.instructions);
        } catch (err) {
            console.log(err);
        }

        // other properties
    }
}

const modules = {
}

export default {
    state,
    getters,
    mutations,
    actions,
    modules
}
