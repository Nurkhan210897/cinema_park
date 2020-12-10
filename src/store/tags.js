import axios from 'axios'


export default {
    state: {
        tags: [{
                title: "Комедия",
                use: false,
            },
            {
                title: "Боевик",
                use: false,
            },
            {
                title: "Приключения",
                use: false,
            },
        ],
    },
    mutations: {
        NEW_TAG_PUSH(state, tag) {
            state.tags.push(tag)
        }
    },
    actions: {
        NEW_TAG({ commit }, tag) {
            commit('NEW_TAG_PUSH', tag)
        }
    },
    getters: {
        tags(state) {
            return state.tags
        }
    }
}