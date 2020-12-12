<template>
  <div id="app">
    <div class="navbar">
      <div class="container">
        <div class="navbar-content">
          <router-link to="/">Film library</router-link>
          <div
            class="button-burger"
            @click="menuShow = !menuShow"
            :class="{ active: menuShow }"
          >
            <span class="line line-1"></span><span class="line line-2"></span
            ><span class="line line-3"></span>
          </div>
          <div class="navbar-list__wrapper" :class="{ active: menuShow }">
            <ul class="navbar-list">
              <li
                class="navbar-item"
                v-for="link in linkMenu"
                :key="link.url"
                @click="menuShow = false"
              >
                <router-link class="navbar-link" :to="`${link.url}`">{{
                  link.title
                }}</router-link>
              </li>
              <li @click="logout" v-if="checkUser" class="navbar-item">Выйти <i class="fas fa-sign-out-alt"></i></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    menuShow: false,
  }),
  methods:{
    logout(){
      this.$store.dispatch('LOGOUT_USER');
      this.$router.push('/login')
    },
  },
  computed: {
    checkUser() {
      return this.$store.getters.checkUser;
    },
    linkMenu() {
      if (this.checkUser) {
        return [
          {
            title: "Главая",
            url: "/",
          },
          {
            title: "Задачи",
            url: "/tasks",
          },
        ];
      }
      return [
        {
          title: "Логин",
          url: "/login",
        },
        {
          title: "Регистрация",
          url: "/registration",
        },
      ];
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.navbar-list{
  align-items: center;
  li{
    cursor: pointer;
    i{
      color: #444ce0;
    }
  }
}
</style>
