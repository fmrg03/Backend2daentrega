const config = require('../../config')
const ContenedorArchivo = require('../../containers/ContenedorArchivo')

const productosApi = new ContenedorArchivo(config.fileSystem.path + 'dbProductos.txt')

module.exports = productosApi