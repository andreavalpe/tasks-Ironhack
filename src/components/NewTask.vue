<template>
  <div class="posit">
      <div class="addTask">
        <div>
          <img class="iconPushpin" src="../images/pushpin.png"/>
        </div>
          <h1>Add a new Task
            <div v-if="showErrorMessage" class="error-text">
                {{ errorMessage }}
            </div>
          </h1>
          <div class="adding">
              <div class="input-field">
                  <input type="text" placeholder="Add a Task Title" v-model="name">
              </div>
              <div class="input-field">
                  <textarea class="taskDescription" rows="10" cols="50" placeholder="Add a Task Description" v-model="description" />
              </div>
              <button @click="addTask" class="buttonAdd"> Add <img src="../images/plusSymbol.png" />
              </button>
          </div>
      </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task"   

const taskStore = useTaskStore();

// variables para los valors de los inputs
const name = ref('');
const description = ref('');

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const showErrorMessage = ref(false);

// const constant to save a variable that holds the value of the error message
const errorMessage = ref(null);

// Arrow function para crear tareas.
const addTask = () => {
  if (name.value.length === 0 || description.value.length === 0) {
  // Primero comprobamos que ningún campo del input esté vacío y lanzamos el error con un timeout para informar al user.

  showErrorMessage.value = true;
  errorMessage.value = 'The task title or description is empty';
  setTimeout(() => {
  showErrorMessage.value = false;
  }, 5000);

  //añadimos otra condición por si no tiene los carácteres necesarios
} else if (description.value.length < 4 || name.value.length < 4) {

    showErrorMessage.value = true;
    errorMessage.value = 'You are missing a character';
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 5000);

} else {
  // Aquí mandamos los valores a la store para crear la nueva Task. Esta parte de la función tenéis que refactorizarla para que funcione con emit y el addTask del store se llame desde Home.vue.
    
  taskStore.addTask(name.value, description.value);
  name.value = '';
  description.value = '';
}
};

</script>

<style></style>
