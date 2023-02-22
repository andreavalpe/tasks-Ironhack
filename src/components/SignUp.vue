<template>
  <div class="backgroundImage">
      <div class="signUpFormRegister">
        <div class="container">
          <!-- <h3 class="header-title">Log In to ToDo App</h3> -->
          <!-- <div class="imgDiv">
            <img class="logo" src="../images/logo.png"/>
          </div> -->

    <!-- <div class="header">
      <div class="header-description">
        <h3 class="header-title">Register to ToDo App</h3>
        <p class="header-subtitle">Start organizing your tasks!</p>
      </div>
    </div> -->

    <form @submit.prevent="signUp" class="form-sign-in">
      <div class="formSignUp">
        <div class="imgDiv">
              <!-- <img class="logoSignUp" src="../images/logo.png"/> -->
        </div>
        <div class="form-input">
          <label class="input-field-label">E-mail</label>
          <input
            type="email"
            class="input-field"
            placeholder="example@gmail.com"
            id="email"
            v-model="email"
            required
          />
        </div>
        <div class="form-input">
          <label class="input-field-label">Password</label>
          <input
            type="password"
            class="input-field"
            placeholder="**********"
            id="password"
            v-model="password"
            required
          />
        </div>
        <div class="form-input">
          <label class="input-field-label">Confirm password</label>
          <input
            type="password"
            class="input-field"
            placeholder="**********"
            id="confirmPassword"
            v-model="confirmPassword"
            required
          />
        </div>
      <div class="containerButton">
        <button class="signInButton" type="submit">
          Sign Up
        </button>
        <div class="accountSignUp"> 
          <p class="linkSignUp">
          Have an account?
          </p>
          <span class="signUp"><PersonalRouter
            :route="route"
            :buttonText="buttonText"
            class="sign-up-link"/> </span>
        </div>
      </div>
    </div>
    <div v-if="modalWelcome" class="overlay">
          <div class="modalWelcome">
              <h3> Welcome </h3>
              <div class="centerImg">
                  <img class="catImgTwo" src="../images/welcomeCat.gif"/>
              </div>
              <p> ¡You completed your first task, enjoy your work! </p>
              <div>
                  <button @click="closeModal" class="modalButtonTwo">  
                      <img src="../images/closeButton.svg"/>
                  </button>
              </div>
          </div>
    </div>
    </form>
    </div>
  </div>

    <div v-show="errorMsg">{{errorMsg}}</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

//guardamos en una variable el valor booleano para que no se enseñe el modal
const modalWelcome = ref (false);

// Route Variables
const route = "/auth/login";
const buttonText = "Sign In";

// Input Fields
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// Error Message
const errorMsg = ref("");

// Router to push user once SignedUp to Log In
const redirect = useRouter();

//función para cerrar el modal al hacer click en delete
const closeModal = () => {
  modalWelcome.value = false;
  document.body.style.overflow = 'auto'
}

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      // calls the user store and send the users info to backend to logIn
      await useUserStore().signUp(email.value, password.value);

      //se le vuelve a dar un valor a la variable booleanica para que ahora enseñe el contenido
      modalWelcome.value = true; 
      setTimeout(() => {
        // redirects user to the homeView
        redirect.push({ path: "/auth/login" });
      }, 6000); 
      
    } catch (error) {
      // displays error message
      errorMsg.value = error.message;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "error";
};
</script>

<style></style>
