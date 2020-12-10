import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Uimini from 'uimini/dist/css/uimini.css'
import vuelidate from 'vuelidate'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/storage'

Vue.config.productionTip = false
Vue.use(vuelidate, Uimini)


new Vue({
    router,
    store,
    render: h => h(App),
    created() {
        var firebaseConfig = {
            apiKey: "AIzaSyAEGRtYh4e1YBev1hS7Rq9hKbbLsjF2WQM",
            authDomain: "cinema-park-87dc4.firebaseapp.com",
            databaseURL: "https://cinema-park-87dc4.firebaseio.com",
            projectId: "cinema-park-87dc4",
            storageBucket: "cinema-park-87dc4.appspot.com",
            messagingSenderId: "680512004452",
            appId: "1:680512004452:web:6a4d05c76798885f1e1a71",
            measurementId: "G-PX9R1RPQMY"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.$store.dispatch('LOGGED_USER', user)
            }
            this.$store.dispatch('LOAD_TASKS')
        })
    },
}).$mount('#app')