<template>
    <div class="container" :class="{overlay: modal}">
        <h3 :class="{completed: isComplete}">{{ task.title }}</h3>
        <p :class="{completed: isComplete}">{{ task.description }}</p>
        <button @click="modal = true">Delete</button>
        <button @click="completeTask">Completed</button>
        <button @click ="editTask">Edit</button>
        <div v-if="showEdit" class="editContainer">
            <input type="text" v-model="currentTitle"/>
            <textarea rows="10" cols="50" v-model="currentDescription"/>
            <button @click="edited">Edited</button>
            <button @click="cancelEdit">Cancel</button>
        </div>
            <div v-if="modal" class="modal">
                <h3> Are you sure? </h3>
                <p> If you delete this task, you can't get it back</p>
                <button @click="deleteTask"> Yes </button>
                <button @click="modal = false"> No </button>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useTaskStore } from '../stores/task';
import { supabase } from '../supabase';


//variable para llamar a la store de task.js
const taskStore = useTaskStore();
//variable para llamar al props.
const isComplete = ref(props.task.is_complete);

//creamos una variable para darle un valor booleano, que en este caso lo definiremos falso para que no muestre el contenido de los input.
let showEdit = ref(false);

const modal = ref(false);

//definimos las variables para recuperar el título y la descripción de la tarea
const currentTitle = ref("");
const currentDescription = ref("");

const props = defineProps({
    task: Object,
});

// Función para borrar la tarea a través de la store. El problema que tendremos aquí (y en NewTask.vue) es que cuando modifiquemos la base de datos los cambios no se verán reflejados en el v-for de Home.vue porque no estamos modificando la variable tasks guardada en Home. Usad el emit para cambiar esto y evitar ningún page refresh.
const deleteTask = async() => {
    await taskStore.deleteTask(props.task.id);
};

//Función para completar las tareas
const completeTask = () => {
    //1º Al ser llamada, modifica el style del h3 y del p. 
    isComplete.value = !isComplete.value;
    //2º Se comunica con la base de datos, para marcar el estado de la tarea como realizado / no realizado.
    taskStore.toggleTask(isComplete.value, props.task.id);
}

//Hacemos una función para cambiar el valor booleano y así que no muestre el contenido de showEdit.
const cancelEdit = () => {
    showEdit.value = false;
};

//se crea una función de flecha para que cambie el valor de la variable creada a true.
const editTask = () => {
    showEdit.value = true;
    currentTitle.value = props.task.title;
    currentDescription.value = props.task.description;
};

//se crea una función para actualizar el contenido de la tarea.
const edited = () => {
    taskStore.edited(currentTitle.value, currentDescription.value, props.task.id);
};

</script>

<style>
.completed{
    background-color: red;
}
</style>

// <!--
// **Hints**
// 1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or
// like an object, up to you.

// 2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error,
// a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit
// the new task detail or details[this is in reference of the task title and the task description].

// 3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the
// status[completed, not complted] of the taskItem.

// 4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean
// empty variable.

// 5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the
// inputField will be used here to save the value as a prop on this function.

// 6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
// send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.

// 7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional
// that first checks if the value of the task [either title and description or just title] is empty which if true it runs the
// function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2
// back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2;
// a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data
// property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value
// from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field
// to an empty string to clear it from the ui.

// 8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
// send via the prop to the parent component. This function can control the removal of  the task on the homeview.
// -->
