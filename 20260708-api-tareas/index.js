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
app.listen( PORT , ()=>{
    //5.Cuando el servidor se inicia correctamente,
    //mostramos un mensaje en la consola.
    console.log(`💕Servidor ejecutándose en http://localhost:${PORT}`);
});