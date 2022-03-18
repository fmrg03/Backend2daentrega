const { Router } = require('express')
const { carritoCrearPost, carritoProductosGet, carritoDelete, carritoProductosPost, carritoProductosDelete } = require('../controllers/carritosController')

const carritoApi = new Router()

carritoApi.post('/', carritoCrearPost)

carritoApi.delete('/:id', carritoDelete)

carritoApi.get('/:id/productos', carritoProductosGet)

carritoApi.post('/:id/productos', carritoProductosPost)

carritoApi.delete('/:id/productos/:id_prod', carritoProductosDelete)

module.exports = carritoApi