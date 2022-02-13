import localForage from "localforage";

const storage = localForage.createInstance({
    storeName: "task",
    description: "Task data",
});

/**
 * Task Store
 */
const state = {
    instructions: null,
    writing_end: null
}

const getters = {
    instructions: state => state.instructions,
    writing_end:  state => state.writing_end
}

const mutations = {
    setData(state, data) {
        state.instructions = data.instructions;
        state.writing_end = data.writing_end;
    }
}

const actions = {
    async loadFromStorage({commit}) {
        try {
            const data = await storage.getItem('task');
            commit('setData', data);
        } catch (err) {
            console.log(err);
        }
    },

    async loadFromData({commit}, data) {
        try {
            await storage.setItem('task', data);
            commit('setData', data);
        } catch (err) {
            console.log(err);
        }
    }
}

const modules = {
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
    modules
}
