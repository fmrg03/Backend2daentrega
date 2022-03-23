require('dotenv').config()
const carritos = process.env.DB === 'mongodb' ? require('../daos/carritos/CarritosDaosMongoDb') :
    require('../daos/carritos/CarritosDaosArchivo')

const productos = process.env.DB === 'mongodb' ? require('../daos/productos/ProductosDaosMongoDb') :
    require('../daos/productos/ProductosDaosArchivo')

const carritoCrearPost = async (req, res) => {
    const carrito = await carritos.guardar({ productosCarrito: [] })
    res.send(carrito)
}

const carritoProductosGet = async (req, res) => {
    let carrito = await carritos.listar(req.params.id)
    if (process.env.DB === 'mongodb') {
        carrito = carrito[0]
    }
    if (carrito == undefined || carrito.length == 0) {
        res.send({ error: `El carrito con id ${req.params.id}, no existe` })
    } else {
        if (carrito.productosCarrito == undefined || carrito.productosCarrito.length == 0) {
            res.send({ error: `No hay productos en el carrito con id: ${req.params.id}` })
        } else {
            res.send(carrito.productosCarrito)
        }
    }
}

const carritoDelete = async (req, res) => {
    if (await carritos.borrar(req.params.id) == false) {
        res.send({ error: `El carrito con id ${req.params.id}, no existe` })
    } else {
        res.send({ borrado: `El carrito con id ${req.params.id} fue borrado` })
    }
}

const carritoProductosPost = async (req, res) => {
    let carrito = await carritos.listar(req.params.id)
    if (process.env.DB === 'mongodb') {
        carrito = carrito[0]
    }
    if (carrito == undefined || carrito.length == 0) {
        res.send({ error: `El carrito con id ${req.params.id}, no existe` })
    } else {
        let producto = await productos.listar(req.body.id)
        if (process.env.DB === 'mongodb') {
            producto = producto[0]
        }
        if (producto == undefined || producto.length == 0) {
            res.send({ error: `El producto con id ${req.body.id}, no existe` })
        } else {
            carrito.productosCarrito.push(producto)
            await carritos.actualizar(carrito, req.params.id)
            res.send(carrito)
        }
    }
}

const carritoProductosDelete = async (req, res) => {
    let carrito = await carritos.listar(req.params.id)
    if (process.env.DB === 'mongodb') {
        carrito = carrito[0]
    }
    if (carrito == undefined || carrito.length == 0) {
        res.send({ error: `El carrito con id ${req.params.id}, no existe` })
    } else {
        const index = carrito.productosCarrito.findIndex(producto => producto.id == req.params.id_prod)
        if (index != -1) {
            carrito.productosCarrito.splice(index, 1)
            await carritos.actualizar(carrito, req.params.id)
            res.send({ borrado: `El producto con id ${req.params.id_prod} fue borrado del carrito con id ${req.params.id}` })
        } else {
            res.send({ error: `El producto con id ${req.params.id_prod}, no existe en el carrito con id ${req.params.id}` })
        }
    }
}

module.exports = {
    carritoCrearPost,
    carritoProductosGet,
    carritoDelete,
    carritoProductosPost,
    carritoProductosDelete
}