const config = require('../../config')
const ContenedorArchivo = require('../../containers/ContenedorArchivo')

const carritosApi = new ContenedorArchivo(config.fileSystem.path + 'dbCarritos.txt')

module.exports = carritosApi