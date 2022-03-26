const config = require('../../config')
const ContenedorFirebase = require('../../containers/ContenedorFirebase')

const productosFirebase = new ContenedorFirebase(config.firebase.collectionProductos)

module.exports = productosFirebase