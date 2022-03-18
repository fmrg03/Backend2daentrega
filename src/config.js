const config = {
    PORT: process.env.PORT || 8080,
    mongoRemote: {
        client: 'mongodb',
        cnxStr: 'mongodb+srv://froilanramos:fjmca.03@coderapi.9pvj0.mongodb.net/CoderAPI?retryWrites=true&w=majority'
    },
    fileSystem: {
        path: './src/outputs/'
    }
}

module.exports = config