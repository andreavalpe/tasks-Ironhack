<!-- COMPONENTE BOILERPLATE -->
 
<template>
  <div class="backgroundImage">
    <div class="signIn">
      <div class="container">
        <!-- <h3 class="header-title">Log In to ToDo App</h3> -->
        <div class="imgDiv">
          <img class="logo" src="../images/logo.png"/>
        </div>
        <!-- <p class="header-subtitle">Estamos en la ruta de login. Aquí deberíais crear un form con la lógica correspondiente para que este permita al usuario loguearse con su email y su contraseña. Miraros la lógica de SignUp si necesitáis inspiración :)</p>
        <p>Dont have an account? <PersonalRouter :route="route" :buttonText="buttonText" class="sign-up-link"/></p> -->
      </div>
      <form @submit.prevent="signIn" class="form-sign-in">
        <div class="form">
          <div class="form-input">
            <label class="input-field-label">E-mail</label>
            <input type="email" class="input-field" placeholder=" example@gmail.com" id="email" v-model="email" required />
          </div>
          <div class="form-input">
            <label class="input-field-label">Password</label>
            <input type="password" class="input-field" placeholder=" **********" id="password" v-model="password" required />
          </div>
          <div class="containerButton">
            <button id="signIn" class="signInButton" type="submit">
            Sign In
            </button>
            <p class="linkSignUp">
            Have an account? </p>
            <span class="signUp"> <PersonalRouter :route="route" :buttonText="buttonText" class="sign-up-link" /></span>
          </div>
        </div>
        </form>
    </div>
  </div>

</template>

<script setup>
import PersonalRouter from "./PersonalRouter.vue";
import { ref, computed } from "vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";

// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";

// Input Fields
const email = ref("");
const password = ref("");

// Error Message 
const errorMsg = ref("");

// Router to push user once SignedUp to Log In 
const redirect = useRouter();

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const signIn = async () => {
    try {
      // calls the user store and send the users info to backend to logIn
      await useUserStore().signIn(email.value, password.value);
      // redirects user to the homeView
      redirect.push({ path: "/" });
    } catch (error) {
      // displays error message
      errorMsg.value = error.message;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
  errorMsg.value = "error";
};

</script>

<style></style>
