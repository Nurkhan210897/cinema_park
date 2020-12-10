export default {
    state: {
        loading: false,
        error: null
    },
    mutations: {
        GET_LOADING(state, loading) {
            state.loading = loading
        },
        GET_ERROR(state, loading) {
            state.error = loading
        },
        CLEAR_ERROR(state) {
            state.error = null
        },
    },
    actions: {
        SET_LOADING({ commit }, loading) {
            commit('GET_LOADING', loading)
        },
        SET_ERROR({ commit }, loading) {
            commit('GET_ERROR', loading)
        },
        CLEAR_LOADING({ commit }) {
            commit('CLEAR_ERROR')
        },
    },
    getters: {
        loading(state) {
            return state.loading
        },
        error(state) {
            return state.error
        },
    }
}