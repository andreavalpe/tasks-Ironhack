<template>
    <div class="wallpaperWeb">
    <Nav />
        <div class="completedTasks">
            <h1>Completed Tasks:</h1>
        </div>
        <div class="divCard">
            <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
        </div>
    </div>
</template>

<script setup>
import TaskItem from '../components/TaskItem.vue';
import Nav from '../components/Nav.vue';
import NewTask from '../components/NewTask.vue';
import { ref, onUpdated } from 'vue'
import { useTaskStore } from "../stores/task";

const taskStore = useTaskStore();

// Variable para guardar las tareas de supabase
const tasks = ref([]);

// Creamos una función que conecte a la store para conseguir las tareas de supabase
const getTasks = async () => {
    tasks.value = await taskStore.fetchTasks();
};

getTasks();
onUpdated(() => {
    getTasks();
});

</script>

<style></style>