const { Router } = require('express')
const { check } = require('express-validator')
const { carritoCrearPost, carritoProductosGet, carritoDelete, carritoProductosPost, carritoProductosDelete } = require('../controllers/carritosController')
const validarCampos = require('../middlewares/validarCampos')

const carritoApi = new Router()

carritoApi.post('/', carritoCrearPost)

carritoApi.delete('/:id', carritoDelete)

carritoApi.get('/:id/productos', carritoProductosGet)

carritoApi.post('/:id/productos', [
    check('id', 'El id del producto es obligatorio').not().isEmpty(),
    check('id', 'El id del producto debe ser numérico').isNumeric(),
    validarCampos
], carritoProductosPost)

carritoApi.delete('/:id/productos/:id_prod', carritoProductosDelete)

module.exports = carritoApi