# [](https://github.com/zantonz/final-project/blob/master/README.md)ToDo App

[Click para acceder a la web](https://todo-zantonz.vercel.app/)

Autor: Anton Zyrianov
Fecha: 25/08/2022

## Descripcion

![Pagina Home](https://i.postimg.cc/m2rV83dV/Captura-de-pantalla-2022-08-25-a-las-10-38-46.png)

Se trata del proyecto final realizado durante el bootcamp de Front End Development en el Ironhack que consiste en una pagina web que te permite gestionar tus tareas.

Es una aplicacion creada con Vue.js que permite a usuarios crear una cuenta, añadir tareas a completar, editarlas, marcarlas como completadas y finalmente borrarlas. Nuestra pagina web esta vinculada a una base de datos, donde estaremos almacenando todos los datos de usuarios y las tareas. En este caso, para gestionarlo utilizaremos Supabase, que nos ofrece un subconjunto de funcionalidades de Back End que nos permite gestionarlo como un servicio.

__El objetivo__ de este proyecto es poner en practica los conocimientos de Vue.js obtenidos durante el curos y ademas poder conectarlo a una base de datos externa y gestionarla.

## Tecnologias empleadas:

* __Client:__ Vue.js y Vite
* __Router:__ Vue Router
* __Store:__ Pinia y Pinia Persist para el Log In
* __Database:__ Supabase

## Seguimiento del proyecto:

### 18 agosto:
* Implentar HTML y CSS del Sign Up y Sing In

### 19 agosto:
* Implentar la logica para el Sign Up, Sign In y Sing Out
* Implentar los componentes del Navbar y el Footer
* Empezar con el diseño HTML y CSS del componente addTask

### 22 de agosto:
* Implementar la funcionalidad de addTask y taskItem
* Añadir el diseño HTML y CSS del componente taskItem
* Hacer el fetch de las tareas de Supabase al cargar la pagina y cada vez que se ejecute alguna accion de cambio

### 23 de agosto:
* Preparar la tienda task.js para poder conectar los botones con la base de datos
* Añadir funcionalidad al boton toggle que permite cambiar el estado de la tarea
* Añadir funcionalidad al boton de cambiar el nombre que permite al usuario cambiar el titulo de la tarea
* Añadir funcionalidad al boton de borrar la tarea
* Implemntar la funcionalidad de ocultar/mostrar contraseña a la hora de hacer Sign In
* Adaptar el diseño a la version movil, en este caso solo hay solo media query que se activa a partir de 747px para abajo

### 24 de agosto:
* Implementar menu hamburguesa para versiones moviles
* Cuando el usuario clique en el boton de toggle y cambie el estado de la tarea a "Hecha", esta se tacha
* Subir el proyecto a Vercel para que este disponible para todo el mundo
* Comenzar con la parte del perfil de usuario ~~(opcional)~~

### 25 de agosto:
* Repaso a la pagina y todas sus funcionalidades
* Preparar el README con la descripcion del proyecto
* Preparar la presentacion del proyecto
* Implementar funcionalidad del Timer
