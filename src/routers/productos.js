const { Router } = require('express')
const { productosGet, productosPost, productosPut, productosDelete } = require('../controllers/productosController')

const productos = new Router()

productos.get('/:id?', productosGet)

productos.post('/', productosPost)

productos.put('/:id', productosPut)

productos.delete('/:id', productosDelete)

module.exports = productos