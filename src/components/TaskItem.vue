<template>
    <div :id="'containerTask' + task.id" :class="{ completed: isComplete, containerTask: true}" :style="{backgroundColor: selectedColor}">
        <div>
           <!-- <button class="addColor" @click="addColor">
                  <img src="../images/ajustes.png">  
                  <img src="../images/favouriteTask.PNG"/> 
           </button>  -->
        </div>
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
        <div v-if= "task.date != null" class="date">
            {{ europeanDate(task.date) }}
        </div>
        <div v-if="!showEdit" class="buttonEditCheckDelete">
            <button @click="showModal" class="delete backgroundButton">
                <img class="buttonImg" src="../images/trashButton.png"/>
            </button>
            <button :id="'recoverColors' + task.id" @click="completeTask" class="completedButton backgroundButton">
                <img class="buttonImg" src="../images/checkButton.png"/>
            </button>
            <button :id="'shake' + task.id" @click ="editTask" :class="{buttonPencil: run, edit:true, backgroundButton: true}">
                <img class="buttonImg" src="../images/pencilButton.png"/>
            </button>
        </div>
        <div v-if="showEdit" class="editContainer">
            <input type="color" v-model="selectedColor" @input="changeBackground"/> 
            <input type ="date" v-model="putDate"/>
            <button @click="deleteDate" class="buttonRemove"> Remove date </button>
            <input type="text" v-model="currentTitle" />
            <textarea rows="10" cols="50" v-model="currentDescription" />
            <div class="buttonEditCheckDelete">
                <button @click="edited" class="backgroundButton">
                    <img class="buttonImgSaveAndCancel" src="../images/saveButton.png" />
                </button>
                <button @click="cancelEdit" class="backgroundButton">
                    <img class="buttonImgSaveAndCancel" src="../images/cancelButton.png" />
                </button>
            </div>
        </div>
    </div>
    <div v-if="modal" class="overlay">
        <div class="modal">
            <h3> Are you sure? </h3>
            <div class="centerImg">
                <img class="catImg" src="../images/modalImg.png"/>
            </div>
            <p> If you delete this task, you can't get it back</p>
            <div class="buttonEditCheckDelete">
                <button @click="deleteTask" class="modalButton"> 
                    <img src="../images/yesButton.png"/>
                </button>
                <button @click="closeModal" class="modalButton">  
                    <img src="../images/noButton.png"/>
                </button>
            </div>
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

//se crean variables para definir valores booleanicos para ense??ar o no contenidos
const modal = ref(false);

const run = ref (false);

const doIt = ref (false);

// const done = ref(false);

//se crea una variable para recuperar el color de la base de datos y se le concatena con el +# 
let selectedColor = ref("#" + props.task.color);

//definimos las variables para recuperar el t??tulo y la descripci??n de la tarea
const currentTitle = ref("");
const currentDescription = ref("");
const putDate = ref(props.task.date);

//definir dos variables una para recuperar el color y otra para la fecha
let date = ref("");
let color = ref("");

const props = defineProps({
    task: Object,
});

//se crea una funci??n para hacer un shake al darle al bot??n
const shake = () => {
    const button = document.getElementById('shake' + props.task.id);
    button.addEventListener("click", function () {
        button.classList.add("shake");
        setTimeout(function () {
            button.classList.remove("shake");
        }, 820);
    });
}

//se crea una funci??n para hacer un hover al completar la tarea
// const hoverButton = () => {
//     const recoverColors = document.getElementById ('recoverColors' + props.task.id);
//     recoverColors.classList.add ('hoverButton');
// }

//se agrega una funci??n para cambiar el background del div
const changeBackground = () => {
    const myDiv = document.getElementById('containerTask'+ props.task.id );
    myDiv.style.backgroundColor = selectedColor.value;
    // color.value = selectedColor.value;
}

//funci??n para ense??ar el modal al hacer click en delete
const showModal = () => {
    modal.value = true;
    document.body.style.overflow = 'hidden';
}

//funci??n para cerrar el modal al hacer click en delete
const closeModal = () => {
    modal.value = false;
    document.body.style.overflow = 'auto';
}

// Funci??n para borrar la tarea a trav??s de la store. El problema que tendremos aqu?? (y en NewTask.vue) es que cuando modifiquemos la base de datos los cambios no se ver??n reflejados en el v-for de Home.vue porque no estamos modificando la variable tasks guardada en Home. Usad el emit para cambiar esto y evitar ning??n page refresh.
const deleteTask = async() => {
    await taskStore.deleteTask(props.task.id);
    document.body.style.overflow = 'auto';
};

//Funci??n para completar las tareas
const completeTask = () => {
    //1?? Al ser llamada, modifica el style del h3 y del p. 
    isComplete.value = !isComplete.value;
    //2?? Se comunica con la base de datos, para marcar el estado de la tarea como realizado / no realizado.
    taskStore.toggleTask(isComplete.value, props.task.id);

    run.value = !run.value;

    doIt.value = !doIt.value;

    shake();

    // done.value = !done.value;
}

//Hacemos una funci??n para cambiar el valor booleano y as?? que no muestre el contenido de showEdit.
const cancelEdit = () => {
    selectedColor.value = "#" + props.task.color;
    showEdit.value = false; 
};


//se crea una funci??n de flecha para que cambie el valor de la variable creada a true.
const editTask = () => {
   if (isComplete.value === false ) {
    showEdit.value = true;
    currentTitle.value = props.task.title;
    currentDescription.value = props.task.description;
} 
};

//se crea una funci??n para actualizar el contenido de la tarea.
const edited = () => {
    // console.log(putDate.value);
    // console.log (putDate.value)
    // const dateForm = americanDate(putDate.value);
    const dateForm = putDate;
    console.log (dateForm)
    if (dateForm === null || dateForm == null || dateForm === undefined || dateForm == undefined) {
        // console.log('editedNoData');
        taskStore.editedNoData(currentTitle.value, currentDescription.value, selectedColor.value.slice(1), props.task.id);
    } else{
        // console.log('edited');
        taskStore.edited(currentTitle.value, currentDescription.value, selectedColor.value.slice(1), dateForm.value, props.task.id);
    }
    showEdit.value = false;
};

//se crea una funci??n para limpiar la fecha
const deleteDate = () =>  {
    putDate.value = null;
}

//se crea una funci??n para ordenar la fecha al formato europeo 
const europeanDate = (putDate) => {
    if (putDate != null) {
    const [year, month, day] = putDate.split('-');
    // Crea la fecha en formato europeo
    const europeanDate = `${day}-${month}-${year}`;
    // Devuelve la fecha en formato europeo
    return europeanDate;
    }
}

//se crea una funci??n para ordenar la fecha al formato americano
const americanDate = (putDate) => {
    if (putDate != null) {
        const [day, month, year] = putDate.split('-');
        // Crea la fecha en formato europeo
        const americanDate = `${year}-${month}-${day}`;
        // Devuelve la fecha en formato europeo
        return americanDate;
    }
}
//se crea una funci??n para que ense??e un input color 

const addColor = () => {
    addColor.value = true;
}

</script>

<style></style>

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
