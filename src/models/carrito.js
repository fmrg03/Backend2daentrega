const mongoose = require('mongoose')

const carritoCollection = 'carritos'

const CarritoSchema = new mongoose.Schema({
    productosCarrito: { type: Array, required: true },
    id: { type: Number, required: true },
    timestamp: { type: String, required: true }
})

module.exports = mongoose.model(carritoCollection, CarritoSchema)