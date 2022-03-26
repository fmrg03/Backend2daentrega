const mongoose = require('mongoose')

class ContenedorMongoDb {

    constructor(url, db, collection) {
        this.url = url
        this.db = db
        this.collection = collection

        this.connect()
    }

    async connect() {
        try {
            await mongoose.connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true })
            console.log(`Conectado a MongoDB: ${this.url}`)
        } catch (error) {
            throw new Error(`Error al conectar a MongoDB: ${error}`)
        }
    }

    date = () => {
        const hoy = new Date()
        const fecha = `${hoy.getDate()}/${hoy.getMonth() + 1}/${hoy.getFullYear()}`
        const hora = `${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`
        return `${fecha} - ${hora}`
    }

    async listar(id) {
        if (id != undefined) {
            let data = await this.collection.find({ id: id })
            return data
        } else {
            const data = await this.collection.find({})
            return data
        }
    }

    async guardar(obj) {
        const data = await this.listar()
        let idNuevo = 1
        if (data.length == 0) {
            idNuevo = 1
        }
        else {
            idNuevo = data[data.length - 1].id + 1
        }
        const ObjetoNuevo = { ...obj, timestamp: this.date(), id: idNuevo }
        const dataGuardada = await this.soloGuardar(ObjetoNuevo)
        return dataGuardada
    }

    async soloGuardar(data) {
        try {
            const DataSaveModel = new this.collection(data)
            const save = await DataSaveModel.save()
            return save
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async actualizar(elem, id) {
        let dataActualizar = await this.listar(id)
        if (!dataActualizar) {
            throw new Error(`Error al actualizar: no se encontró el id ${id}`)
        } else {
            dataActualizar = { ...dataActualizar, ...elem, id, timestamp: this.date() }
            try {
                await this.collection.findOneAndUpdate({ id: id }, dataActualizar)
                return dataActualizar
            } catch (error) {
                throw new Error(`Error al actualizar: ${error}`)
            }
        }
    }

    async borrar(id) {
        try {
            const existe = await this.listar(id)
            if (existe.length != 0) {
                await this.collection.findOneAndDelete({ id: id })
                return true
            } else {
                return false
            }
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async borrarAll() {
        try {
            await this.collection.deleteMany({})
            return true
        } catch (error) {
            throw new Error(`Error al borrar todos: ${error}`)
        }
    }
}

module.exports = ContenedorMongoDb