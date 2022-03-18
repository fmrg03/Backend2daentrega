require('dotenv').config()

const config = {
    PORT: process.env.PORT || 8080,
    mongoDb: {
        client: 'mongodb',
        cnxStr: process.env.MONGODB_CONN,
        db: 'CoderAPI',
        collectionProductos: 'productos',
        collectionCarritos: 'carritos'

    },
    fileSystem: {
        path: './src/outputs/'
    }
}

module.exports = config