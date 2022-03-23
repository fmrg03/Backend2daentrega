const mongoose = require('mongoose')

const productoCollection = 'productos'

const ProductoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    descripcion: { type: String, required: true },
    imagen: { type: String, required: true },
    stock: { type: Number, required: true },
    id: { type: Number, required: true },
    timestamp: { type: String, required: true }
})



module.exports = mongoose.model(productoCollection, ProductoSchema)