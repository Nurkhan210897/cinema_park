import firebase from 'firebase'
import Task from './task_help'

export default {
    state: {
        tasks: []
    },
    mutations: {
        NEW_TASK_PUSH(state, task) {
            state.tasks.push(task)
        },
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
                                tasks.title

                            )
                        )
                    })
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
    },
    getters: {
        tasks(state) {
            return state.tasks
        }
    }
}