require('dotenv').config()
const productos = process.env.DB === 'mongodb' ? require('../daos/productos/ProductosDaosMongoDb') :
    process.env.DB === 'firebase' ? require('../daos/productos/ProductosDaosFirebase') :
        require('../daos/productos/ProductosDaosArchivo')

const administrador = true

const productosGet = async (req, res) => {
    const productosLista = await productos.listar(req.params.id)
    if (productosLista == undefined || productosLista.length == 0) {
        res.send({ error: 'No hay productos' })
    } else {
        res.send(productosLista)
    }
}

const productosPost = async (req, res) => {
    if (administrador) {
        let producto = req.body
        producto = await productos.guardar(req.body)
        res.json(producto)
    } else {
        res.send({ error: -1, descripcion: `Ruta '${req.url}', método '${req.method}' no autorizada` })
    }
}

const productosPut = async (req, res) => {
    if (administrador) {
        const existe = await productos.listar(req.params.id)
        if (Object.keys(existe).length == 7 || existe.length == 1) {
            if (Object.keys(req.body).length != 0) {
                const productoActualizado = await productos.actualizar(req.body, req.params.id)
                res.send(productoActualizado)
            } else { res.send({ error: 'Debe agregar por lo menos un campo a modificar en el producto' }) }
        } else {
            res.send({ error: `El producto con id ${req.params.id}, no existe` })
        }
    } else {
        res.send({ error: -1, descripcion: `Ruta '${req.url}', método '${req.method}' no autorizada` })
    }
}

const productosDelete = async (req, res) => {
    if (administrador) {
        const productoBorrado = await productos.borrar(req.params.id)
        if (productoBorrado == false) {
            res.send({ error: `El producto con id ${req.params.id}, no existe` })
        } else {
            res.send({ borrado: `El producto con id ${req.params.id} fue borrado` })
        }
    } else {
        res.send({ error: -1, descripcion: `Ruta '${req.url}', método '${req.method}' no autorizada` })
    }
}

module.exports = {
    productosGet,
    productosPost,
    productosPut,
    productosDelete
}