//==================================
//1. IMPORTACIONES
//==================================
const express = require("express");
const cors = require("cors");// Importamos nuestro guardián de seguridad

//=============================================
//2. INICIALIZACIÓN
//=============================================
const app = express();

//=============================================
//3. MIDDLEWARES (CONFIGURACIÓN GLOBAL)
//=============================================
//REGLA DE ORO: ¡CORS SIEMPRE ANTES DE LAS RUTAS!
app.use(cors());// Da permiso a React para entrar sin que el navegador lo bloquee
app.use(express.json());// Traduce el texto entrante a formato JSON

//===============================================
//4. NUESTRA BASE DE DATOS
//===============================================
let peliculas = [
    {id:1, titulo: "Kung Fu panda", director: "Angelina Jolie"},
    {id:2, titulo: "serie de Naruto", director: "Naruto"},
    {id:3, titulo: "Cuarto Milenio", director: "La Cuatro"},
    {id:4, titulo: "Tarzán", director: "Disney"},
    {id:5, titulo: "Pocahontas", director: "Disney"},
    {id:6, titulo: "Kung Fu Panda 2", director: "Angelina Jolie"},
    {id:7, titulo: "Maléfica", director: "Angelina Jolie"},
    {id:8, titulo: "Maléfica 2", director: "Angelina Jolie"},
    {id:9, titulo: "Kung Fu Panda 3", director: "Angelina Jolie"},
    {id:10, titulo: "Kung Fu Panda 4", director: "Angelina Jolie"},
    {id:11, titulo: "Buscando a Nemo", director: "Disney"},
    {id:12, titulo: "La Sirenita", director: "Disney"},
];

//================================================
//5. RUTAS DE LA API (CRUD)
//================================================
// Leer el catálogo completo (GET)
app.get("/api/peliculas", (req,res)=>{
    res.json(peliculas);
});

//Añadir una película nueva (POST)
app.post("/api/peliculas", (req, res) => {
    const { titulo, director } = req.body;
    //Validación básica para evitar guardar datos vacíos
    if(!titulo || !director) {
        return res.status(400).json({ error: "Faltan datos obligatorios"});
    }

    const nuevaPelicula = {
        id: peliculas.length > 0 ? peliculas[peliculas.length - 1].id + 1 : 1,
        titulo: titulo,
        director: director

    };

    peliculas.push(nuevaPelicula);
    res.status(201).json(nuevaPelicula);
})

//Actualizar una película existente (PUT)
app.put("/api/peliculas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, director } = req.body;

    //Validación básica: no permitimos guardar datos vacíos
    if (!titulo || !director) {
        return res.status(400).json({ error: "Faltan datos obligatorios"});
    }

    const pelicula = peliculas.find(p => p.id === id);

    if(!pelicula){
        return res.status(404).json({ error: "Película no encontrada"});
    }

    //Actualizamos solo los campos, manteniendo el mismo id
    pelicula.titulo = titulo;
    pelicula.director = director;

    res.json(pelicula);
});

//Eliminar una película (DELETE)

app.delete("/api/peliculas/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const index = peliculas.findIndex(p  => p.id === id);

    if(index !== -1){
        peliculas.splice(index,1);
        res.json({mensaje: "Pelicula eliminada del catálogo"});
    }else {
        res.status(404).json({ error: "Película no encontrada"});
    }
});









//==========================================
//6. ENCENDIDO DEL SERVIDOR
//==========================================
app.listen(3000, () => {
    console.log("🎬 Servidor de películas listo en el puerto 3000 (CORS Activado)");
});