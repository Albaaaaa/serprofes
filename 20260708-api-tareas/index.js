//PRIMER SERVIDOR WEB CON EXPRESS
//1.Importaamos la librería express
//Express nos permite crear servidores web de forma sencilla
const express = require("express");
//2.Creamos una aplicacion con Express
//La variable "app" sera nuestro servidor
const app = express ();
//3.Definimos el puerto donde escuchará el servidor
//En este caso utilizamos el puerto 3000
const PORT = 3000;
//4.Iniciamos el servidor
//listen()hace que el servidor quede esperando aplicaciones
//de los clientes(por ejemplo,desde un navegador)

//==========================================================
//MIDDLEAWARE
//==========================================================
//Un middleware es una funcion que se ejecuta anteds de
//llegar a las rutas.
//express.json()convierte automáticamente los datos
//enviados en formato JSON en un objeto JavaScript
//Gracias a este middleware podremos acceder a:
// req.body
//cuando el cliente envíe informacion mediante POST o PUT.
app.use(express.json());

//==========================================================
//BASE
//==========================================================
//Simulamos una base de datos utilizando un arreglo
//IMPORTANTE:
//Los datos solo existen mientras el servidor está
//encendido
//Si detenemos Node.js, toda esta informacion se pierde
let tareas = [
    //Primera tarea
    {
        id: 1,
        título:"Aprender Express",
        completada: false
    },
    //Segunda tarea
    {
        id:2,
        título:"Estudiar Node.js",
        completada:true
    },
    //Tercera tarea
    {
        id:3,
        título:"practicar Thunder client",
        completada:false
    }

];

//========================================================================
//RUTA PRINCIPAL
//========================================================================
app.get("/"(req, rest)=> {
    res.send("🚀 Bienvenido a la API REST de Tareas
})

app.listen( PORT , ()=>{
    //5.Cuando el servidor se inicia correctamente,
    //mostramos un mensaje en la consola.
    console.log(`💕Servidor ejecutándose en http://localhost:${PORT}`);
});