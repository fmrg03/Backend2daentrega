const { Router } = require('express')
const { check } = require('express-validator')
const { productosGet, productosPost, productosPut, productosDelete } = require('../controllers/productosController')
const validarCampos = require('../middlewares/validarCampos')

const productos = new Router()

productos.get('/:id?', productosGet)

productos.post('/', [
    check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
    check('nombre', 'El Nombre debe ser String').isString(),
    check('precio', 'El Precio es obligatorio').not().isEmpty(),
    check('precio', 'El Precio debe ser numérico').isNumeric(),
    check('descripcion', 'La Descripcion es obligatoria').not().isEmpty(),
    check('descripcion', 'La Descripcion debe ser String').isString(),
    check('stock', 'El Stock es obligatorio').not().isEmpty(),
    check('stock', 'El Stock debe ser numérico').isNumeric(),
    check('imagen', 'La Imagen es obligatoria').not().isEmpty(),
    check('imagen', 'La Imagen es obligatoria').isString(),
    validarCampos
], productosPost)

productos.put('/:id', productosPut)

productos.delete('/:id', productosDelete)

module.exports = productos