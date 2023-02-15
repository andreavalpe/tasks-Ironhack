<template>
  <nav>
    <!-- <PersonalRouter :route="route" :buttonText="buttonText" class="logo-link"/> -->
    <router-link to="/" class="linkNav">
      Home
    </router-link>

    <ul class="positionNav">
        <!-- <li>
          <router-link to="/completedTask" class="linkNav">Completed Task</router-link>
        </li> -->

        <li>
          <router-link to="/account" class="linkNav">Your Account</router-link>
        </li>
    </ul>

    <div>
      <ul class="positionNav">
        <li class="log-out-welcome linkNav">
          <p>Welcome, user</p>
        </li>
        <li>
          <button @click="signOut" class="buttonSignOut">
            <img src="../images/logOut.png"/>
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
// import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ref } from 'vue';

//constant to save a variable that will hold the use router method
const route = "/";
const buttonText = "Todo app";

// constant to save a variable that will get the user from store with a computed function imported from vue
// const getUser = computed(() => useUserStore().user);
const getUser = useUserStore().user;

// constant that calls user email from the useUSerStore
const userEmail = getUser.email;

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();

const signOut = async () => {
  try{
    await useUserStore().signOut(); 
    redirect.push({ path: "/auth/login" });
    // call the user store and send the users info to backend to signOut
    // then redirect user to the homeView
  } catch (error) {}
};

</script>

<style></style>
