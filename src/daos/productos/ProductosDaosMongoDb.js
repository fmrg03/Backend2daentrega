const config = require('../../config')
const ContenedorMongoDb = require('../../containers/ContenedorMongoDb')
const producto = require('../../models/producto')

const productosMongo = new ContenedorMongoDb(config.mongoDb.cnxStr, config.mongoDb.db, producto)

module.exports = productosMongo