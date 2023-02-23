import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", () => {
  // Esta tienda utiliza el Composition API
  const tasksArr = ref(null);
  // conesguir tareas de supabase
  const fetchTasks = async () => {
    const { data: tasks } = await supabase
      .from("tasks")
      .select("*")
      .order("id", { ascending: false });
    tasksArr.value = tasks;
    return tasksArr.value;
  };
  // añadir tareas de supabase
  const addTask = async (title, description, color) => {
    console.log(useUserStore().user.id);
    const { data, error } = await supabase.from("tasks").insert([
      {
        user_id: useUserStore().user.id,
        title: title,
        is_complete: false,
        description: description,
        color: color
      },
    ]);
  };

  //función para completar tareas en supabase
  const toggleTask = async (isComplete, id) => {
    const { data, error } = await supabase.from("tasks").update({ is_complete: isComplete }).match({ id: id });
  };

  //función para editar tareas en supabase
  const edited = async (title, description, color, putDate, id) => {
    const { data, error } = await supabase.from("tasks").update({ title: title, description: description, color: color, date: putDate }).match({ id: id });
  };

  //función para editar tareas en supabase
  const editedNoData = async (title, description, color, id) => {
    const { data, error } = await supabase.from("tasks").update({ title: title, description: description, color: color }).match({ id: id });
  };

  // borrar tareas de supabase
  const deleteTask = async (id) => {
    const { data, error } = await supabase.from("tasks").delete().match({
      id: id,
    });
  };
  return { tasksArr, fetchTasks, addTask, deleteTask, toggleTask, edited, editedNoData };
});