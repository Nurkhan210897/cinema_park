<template>
  <div class="wrapper">
    <div class="content-wrapper auth">
      <section>
        <h1 class="ui-title-1">Логин</h1>
        <form action="" @submit.prevent="onSubmit">
          <div class="form_item">
            <div class="form_input_item">
              <input
                type="email"
                placeholder="E-mail"
                v-model.trim="email"
                :class="{ form_error: $v.email.$error }"
                @change="$v.email.$touch()"
              />
              <small v-if="$v.email.$error" class="form_error"
                >Некоректный E-mail</small
              >
            </div>
            <div class="form_input_item">
              <input
                type="password"
                placeholder="Пароль"
                v-model="password"
                :class="{ form_error: $v.password.$error }"
                @change="$v.password.$touch()"
              />
              <small
                v-if="$v.password.$dirty && !$v.password.required"
                class="form_error"
                >Введите пароль</small
              >
              <small
                class="form_error"
                v-if="$v.password.$dirty && !$v.password.minLength"
                >Пароль должен быть не меньше
                {{ $v.password.$params.minLength.min }} символов, сейчас он ({{
                  password.length
                }}) .</small
              >
            </div>
          </div>
          <div class="form_bottom">
            <button type="submit" class="button button--round button-primary">
              <span v-if="loading === true">Загрузка...</span>
              <span v-else>Войти</span>
            </button>
            <div class="link_to_login">
              Зарегистрироваться?
              <router-link to="/Registration">Нажмите сюда</router-link>
            </div>
          </div>
          <div class="form_alert">
            <p v-if="submitStatus === 'OK'">
              Успешная регистрация
            </p>
            <p v-if="submitStatus === 'ERROR'">
              Заполните данные !!!
            </p>
            <p>{{ submitStatus }}</p>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
export default {
  data: () => ({
    email: "",
    password: "",
    submitStatus: null,
  }),
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
  },
  methods: {
    onSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        setTimeout(() => {
          this.submitStatus = "";
        }, 5000);
      } else {
        this.submitStatus = "Загрузка";
        const user = {
          email: this.email,
          password: this.password,
        };
        this.$store
          .dispatch("LOGIN_USER", user)
          .then(() => {
            this.submitStatus = "OK";
            this.$router.push("/");
          })
          .catch((err) => {
            this.submitStatus = "Данные не верны";
            console.log(err.message);
          });
      }
    },
  },
    computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
};
</script>

<style lang="scss" scoped>
.button-primary:focus {
  background-color: #444ce0;
}
.ui-title-1 {
  text-align: center;
}
input {
  &.form_error {
    border: 1px solid red;
  }
}
.form_input_item {
  margin-bottom: 20px;
  input {
    margin-bottom: 10px;
  }
}
small {
  &.form_error {
    border: none;
    color: red;
  }
}

.auth {
  form {
    max-width: 50%;
    margin: 0 auto;
  }
}
.form_bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  input {
    margin-bottom: 0;
  }
  .link_to_login {
    font-size: 15px;
  }
  a {
    color: #444ce0;
    &:hover {
      color: #000;
    }
  }
}
.form_alert {
  margin-top: 20px;
  text-align: center;
}
</style>
