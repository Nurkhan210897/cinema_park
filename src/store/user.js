import firebase from 'firebase'
import User from './user_help'

export default {
    state: {
        user: null
    },
    mutations: {
        SET_USER(state, id) {
            state.user = id
        }
    },
    actions: {
        async REGISTER_USER({ commit }, { email, password }) {
            commit('CLEAR_ERROR')
            commit('GET_LOADING', true)
            try {
                const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
                commit('SET_USER', new User(user.user.uid))
                commit('GET_LOADING', false)
                console.log(user)
            } catch (error) {
                commit('GET_LOADING', false)
                commit('GET_ERROR', error.message)
                console.log(error)
                throw error
            }
        },
        async LOGIN_USER({ commit }, { email, password }) {
            commit('CLEAR_ERROR')
            commit('GET_LOADING', true)
            try {
                const user = await firebase.auth().signInWithEmailAndPassword(email, password);
                commit('SET_USER', new User(user.user.uid))
                commit('GET_LOADING', false)
                console.log(user)
            } catch (error) {
                commit('GET_LOADING', false)
                commit('GET_ERROR', error.message)
                console.log(error)
                throw error
            }
        },
        LOGGED_USER({ commit }, user) {
            commit('SET_USER', new User(user.uid))
            console.log(user.uid)
        },
        LOGOUT_USER({ commit }) {
            firebase.auth().signOut();
            commit('SET_USER', null)
        }
    },
    getters: {
        user(state) {
            return state.user
        },
        checkUser(state) {
            return state.user !== null
        }
    }
}