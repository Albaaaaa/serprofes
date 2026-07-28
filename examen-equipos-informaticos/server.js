//=========================================
// Añadir un equipo nuevo (POST)
//=========================================
app.post("/api/equipos", async (req, res) => {
    const { titulo, director } = req.body;

    if (!titulo || !director) {
        return res.status(400).json({
            error: "Faltan datos obligatorios"
        });
    }

    const portada = await obtenerPortada(titulo);

    const nuevoEquipo = {
        id: equipos.length > 0 ? equipos[equipos.length - 1].id + 1 : 1,
        titulo,
        director,
        portada
    };

    equipos.push(nuevoEquipo);

    res.status(201).json(nuevoEquipo);
});


//=========================================
// Actualizar un equipo existente (PUT)
//=========================================
app.put("/api/equipos/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, director } = req.body;

    if (!titulo || !director) {
        return res.status(400).json({
            error: "Faltan datos obligatorios"
        });
    }

    const equipo = equipos.find(e => e.id === id);

    if (!equipo) {
        return res.status(404).json({
            error: "Equipo no encontrado"
        });
    }

    const portada = await obtenerPortada(titulo);

    equipo.titulo = titulo;
    equipo.director = director;
    equipo.portada = portada;

    res.json(equipo);
});


//=========================================
// Eliminar un equipo (DELETE)
//=========================================
app.delete("/api/equipos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = equipos.findIndex(e => e.id === id);

    if (index !== -1) {
        equipos.splice(index, 1);

        res.json({
            mensaje: "Equipo eliminado del catálogo"
        });
    } else {
        res.status(404).json({
            error: "Equipo no encontrado"
        });
    }
});