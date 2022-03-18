const express = require('express')
const carritoApi = require('./routers/carrito')
const productosApi = require('./routers/productos')
const config = require('./config')


let idProducto = 1
let idCarrito = 9500
let administrador = true

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/productos', productosApi)
app.use('/api/carrito', carritoApi)
app.use((req, res) => {
    res.status(500).send({ error: -2, descripcion: `ruta '${req.url}', método '${req.method}' no implementada` })
})

const server = app.listen(config.PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${config.PORT}`)
})

server.on('error', (err) => console.log(`Error en el Servidor: ${err}`))