const config = require('../../config')
const ContenedorMongoDb = require('../../containers/ContenedorMongoDb')
const carrito = require('../../../models/carrito')

const carritosMongoDb = new ContenedorMongoDb(config.mongoDb.cnxStr, config.mongoDb.db, carrito)

module.exports = carritosMongoDb