<template>
<div class="login-form">
    <form class="form-group" @submit.prevent="onLogin">
        <h2 class="header"><slot></slot></h2>
        <p class="note">Войдите с помощью учетной записи в других сервисах</p>
        <div class="auth-services">
          <span v-for="auth in 3" :key="auth" class='auth-service'>
          <a href="">
          <img src="../assets/ghub-icon-w-64.png" alt="">
          </a>
        </span>
        </div>
        
        <hr>
        <label class="form-label" for="login">Логин</label>
        <input v-model="login" class="form-input" type="text" id="login" placeholder="AlanParrish26">
        <label class="form-label" for="password">Пароль</label>
        <input v-model='password' class="form-input" type="password" id="password" placeholder="jYOUmanji">
        <button class="btn btn-primary">Войти</button>
    </form>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Signup extends Vue {
  private login = '';
  private password = '';
}
</script>

<style scoped>
.header {
  text-align: center;
  margin-bottom: 0;
}
.auth-services {
  display: flex;
  justify-content: space-evenly;
}
.login-form {
  margin: auto;
}
.note {
  color: #acb3c2;
}
button {
  margin-top: 20px;
  margin-left: 35%;
}
.auth-service img {
  border-radius: 35px;
  background-color: #acb3c2;
}
.auth-service img:hover {
  border-radius: 35px;
  background-color: black;
}
</style>
