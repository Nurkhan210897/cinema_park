import firebase from 'firebase'
import Task from './task_help'

export default {
    state: {
        tasks: []
    },
    mutations: {
        LOAD_TASKED(state, payload) {
            state.tasks = payload
        },
        NEW_TASK_PUSH(state, task) {
            state.tasks.push(task)
        },
        EDIT_TASK(state, { id, title, description }) {
            const task = state.tasks.find(t => {
                return t.id = id
            })
            task.title = title,
                task.description = description
        }
    },
    actions: {
        async LOAD_TASKS({ commit }, payload) {
            commit('CLEAR_ERROR')
            commit('GET_LOADING', true)
            try {
                const task = await firebase.database().ref('tasks').once('value')
                const tasks = task.val()
                const tasksArray = [];
                Object.keys(tasks).forEach(key => {
                    const t = tasks[key]
                    tasksArray.push(
                        new Task(
                            t.title,
                            t.whatWatch,
                            t.time,
                            t.tags,
                            t.description,
                            t.completed,
                            t.editing,
                            t.user,
                            key
                        )
                    )
                })
                commit('LOAD_TASKED', tasksArray)
                    // const newTask = new Task(
                    //     payload.title,
                    //     payload.whatWatch,
                    //     payload.time,
                    //     payload.tags,
                    //     payload.description,
                    //     payload.completed,
                    //     payload.editing,
                    //     getters.user.id,
                    // )

                commit('GET_LOADING', false)
            } catch (error) {
                commit('GET_LOADING', false)
                commit('GET_ERROR', error.message)
                console.log(error)
                throw error
            }
        },
        async NEW_TASK({ commit, getters }, payload) {
            commit('CLEAR_ERROR')
            commit('GET_LOADING', true)
            try {
                const newTask = new Task(
                    payload.title,
                    payload.whatWatch,
                    payload.time,
                    payload.tags,
                    payload.description,
                    payload.completed,
                    payload.editing,
                    getters.user.id,
                )
                const task = await firebase.database().ref('tasks').push(newTask);
                commit('NEW_TASK_PUSH', {
                    ...newTask,
                    id: task.key
                })
                commit('GET_LOADING', false)
            } catch (error) {
                commit('GET_LOADING', false)
                commit('GET_ERROR', error.message)
                console.log(error)
                throw error
            }
        },
        async EDIT_TASK({ commit }, { id, title, description }) {
            commit('CLEAR_ERROR')
            commit('GET_LOADING', true)
            try {
                await firebase.database().ref('tasks').child(id).update({
                    title,
                    description,
                });
                commit('EDIT_TASK', { id, title, description })
            } catch (error) {
                commit('GET_LOADING', false)
                commit('GET_ERROR', error.message)
                console.log(error)
                throw error
            }
        }
    },
    getters: {
        tasks(state, getters) {
            return state.tasks.filter(task => {
                return task.user === getters.user.id
            })
        }
    }
}