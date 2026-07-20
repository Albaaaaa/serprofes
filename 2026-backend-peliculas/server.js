//==================================
//1. IMPORTACIONES
//==================================
const express = require("express");
const cors = require("cors");// Importamos nuestro guardián de seguridad
const path = require('path');
require('dotenv').config(); // llamamos a 'dotenv' que maneja el archivo .env con la clave api en local sin subirla a repo en github

//=============================================
//2. INICIALIZACIÓN
//=============================================
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

//=============================================
//3. MIDDLEWARES (CONFIGURACIÓN GLOBAL)
//=============================================
//REGLA DE ORO: ¡CORS SIEMPRE ANTES DE LAS RUTAS!
app.use(cors());// Da permiso a React para entrar sin que el navegador lo bloquee
app.use(express.json());// Traduce el texto entrante a formato JSON

// 3 y medio: función para obtener portadas
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const PORTADA_GENERICA = '/img/sin-portada.svg';

async function obtenerPortada(titulo) {
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
        console.error("Error: TMDB_API_KEY no está configurada en el archivo .env fistro pecador");
        return PORTADA_GENERICA;
    }

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(titulo)}`;
    console.log(`[TMDb] Buscando portada para: "{titulo}"`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
        const respuesta = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        console.log(`[TMDb] Status para "${titulo}": // Actualizar una película existente (PUT)
app.put("/api/peliculas/:id", async (req, res) => {

    const id = parseInt(req.params.id);

    const titulo = req.body.titulo?.trim();
    const director = req.body.director?.trim();

    // No permitir campos vacíos
    if (!titulo || !director) {
        return res.status(400).json({
            error: "El título y el director son obligatorios."
        });
    }

    const pelicula = peliculas.find(p => p.id === id);

    if (!pelicula) {
        return res.status(404).json({
            error: "Película no encontrada."
        });
    }

    // No permitir duplicados (excepto la propia película)
    const duplicada = peliculas.find(
        p =>
            p.id !== id &&
            p.titulo.toLowerCase() === titulo.toLowerCase()
    );

    if (duplicada) {
        return res.status(409).json({
            error: "Ya existe otra película con ese título."
        });
    }

    let nuevaPortada = pelicula.portada;

    if (pelicula.titulo !== titulo) {
        nuevaPortada = await obtenerPortada(titulo);
    }

    pelicula.titulo = titulo;
    pelicula.director = director;
    pelicula.portada = nuevaPortada;

    res.json(pelicula);
});{respuesta.status}`);

        if (!respuesta.ok) {
            const errorText = await respuesta.text();
            console.error(`[TMDb] Error para "${titulo}": {respuesta.status} ${errorText}`);
            return PORTADA_GENERICA;
        }

        const datos = await respuesta.json();
        console.log(`[TMDb] Resultados para "{titulo}": {datos.results ? datos.results.length : 0}`);

        if (!datos.results || datos.results.length === 0) {
            console.warn(`[TMDb] No se encontraron resultados para "${titulo}"`);
            return PORTADA_GENERICA;
        }

        const pelicula = datos.results[0];

        if (!pelicula.poster_path) {
            console.warn(`[TMDb] No hay poster para "${titulo}"`);
            return PORTADA_GENERICA;
        }

        return `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;
    } catch (error) {
        if (error.name === 'AbortError') {
            console.error(`[TMDb] Timeout al obtener "${titulo}"`);
        } else {
            console.error(`[TMDb] Error al obtener "${titulo}":`, error.message);
        }
        return PORTADA_GENERICA;
    } finally {
        clearTimeout(timeoutId);
    }
}

// Actualizar una película existente (PUT)
app.put("/api/peliculas/:id", async (req, res) => {

    const id = parseInt(req.params.id);

    const titulo = req.body.titulo?.trim();
    const director = req.body.director?.trim();

    // No permitir campos vacíos
    if (!titulo || !director) {
        return res.status(400).json({
            error: "El título y el director son obligatorios."
        });
    }

    const pelicula = peliculas.find(p => p.id === id);

    if (!pelicula) {
        return res.status(404).json({
            error: "Película no encontrada."
        });
    }

    // No permitir duplicados (excepto la propia película)
    const duplicada = peliculas.find(
        p =>
            p.id !== id &&
            p.titulo.toLowerCase() === titulo.toLowerCase()
    );

    if (duplicada) {
        return res.status(409).json({
            error: "Ya existe otra película con ese título."
        });
    }

    let nuevaPortada = pelicula.portada;

    if (pelicula.titulo !== titulo) {
        nuevaPortada = await obtenerPortada(titulo);
    }

    pelicula.titulo = titulo;
    pelicula.director = director;
    pelicula.portada = nuevaPortada;

    res.json(pelicula);
});

//===============================================
//4. NUESTRA BASE DE DATOS
//===============================================
let peliculas = [
    {id:1, titulo: "Matrix", director: "Lana Wachowski"},
    {id:2, titulo: "Interstellar", director: "Christopher Nolan"}
];

//================================================
//5. RUTAS DE LA API (CRUD)
//================================================
// Leer el catálogo completo (GET)
app.get("/api/peliculas", (req,res)=>{
    res.json(peliculas);
});

// Añadir una película nueva (POST)
app.post("/api/peliculas", async (req, res) => {
    const titulo = req.body.titulo?.trim();
    const director = req.body.director?.trim();

    // No permitir campos vacíos
    if (!titulo || !director) {
        return res.status(400).json({
            error: "El título y el director son obligatorios."
        });
    }

    // No permitir películas duplicadas
    const peliculaExistente = peliculas.find(
        p => p.titulo.toLowerCase() === titulo.toLowerCase()
    );

    if (peliculaExistente) {
        return res.status(409).json({
            error: "Esa película ya existe en el catálogo."
        });
    }

    const portada = await obtenerPortada(titulo);

    const nuevaPelicula = {
        id: peliculas.length > 0 ? peliculas[peliculas.length - 1].id + 1 : 1,
        titulo,
        director,
        portada
    };

    peliculas.push(nuevaPelicula);

    res.status(201).json(nuevaPelicula);
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






async function completarPortadasIniciales() {
    for (let pelicula of peliculas) {
        const portada = await obtenerPortada(pelicula.titulo);
        pelicula.portada = portada;
    }

    console.log("🎨 Portadas iniciales cargadas desde TMDb");
}

completarPortadasIniciales().then(() => {
    app.listen(3000, () => {
        console.log("🎬 Servidor de películas listo en el puerto 3000 (CORS Activado)");
    });
});