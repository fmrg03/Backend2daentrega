const config = require('../../config')
const ContenedorMongoDb = require('../../containers/ContenedorMongoDb')

const productosMongo = new ContenedorMongoDb(config.mongoDb.url, config.mongoDb.db, config.mongoDb.collection)