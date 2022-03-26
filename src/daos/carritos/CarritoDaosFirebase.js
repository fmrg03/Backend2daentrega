const config = require('../../config')
const ContenedorFirebase = require('../../containers/ContenedorFirebase')

const carritosFirebase = new ContenedorFirebase(config.firebase.collectionCarritos)

module.exports = carritosFirebase