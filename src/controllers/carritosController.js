const carritos = process.env.DB === 'mongo' ? require('../daos/carritos/CarritosDaosMongoDb') :
    require('../daos/carritos/CarritosDaosArchivo')

const productos = process.env.DB === 'mongo' ? require('../daos/productos/ProductosDaosMongoDb') :
    require('../daos/productos/ProductosDaosArchivo')

const carritoCrearPost = async (req, res) => {
    res.send(await carritos.guardar({ productos: [] }))
}

const carritoProductosGet = async (req, res) => {
    const carrito = await carritos.listar(req.params.id)
    if (carrito == undefined) {
        res.send({ error: `El carrito con id ${req.params.id}, no existe` })
    } else {
        if ((carrito.productos.length != 0) || (carrito.productos.length == undefined)) {
            res.send(carrito.productos)
        } else {
            res.send({ error: `No hay productos en el carrito con id: ${req.params.id}` })
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
    const carrito = await carritos.listar(req.params.id)
    if (carrito == undefined) {
        res.send({ error: `El carrito con id ${req.params.id}, no existe` })
    } else {
        const producto = await productos.listar(req.body.id)
        if (producto == undefined) {
            res.send({ error: `El producto con id ${req.body.id}, no existe` })
        } else {
            carrito.productos.push(producto)
            await carritos.actualizar(carrito, req.params.id)
            res.send(carrito)
        }
    }
}

const carritoProductosDelete = async (req, res) => {
    const carrito = await carritos.listar(req.params.id)
    if (carrito == undefined) {
        res.send({ error: `El carrito con id ${req.params.id}, no existe` })
    } else {
        const index = carrito.productos.findIndex(producto => producto.id == req.params.id_prod)
        if (index != -1) {
            carrito.productos.splice(index, 1)
            await carritos.actualizar(carrito, req.params.id)
            res.send({borrado: `El producto con id ${req.params.id_prod} fue borrado del carrito con id ${req.params.id}`})
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