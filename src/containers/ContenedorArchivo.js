const { promises: fs } = require('fs')

class ContenedorArchivo {

    constructor(ruta) {
        this.ruta = ruta
    }

    date = () => {
        const hoy = new Date()
        const fecha = `${hoy.getDate()}/${hoy.getMonth() + 1}/${hoy.getFullYear()}`
        const hora = `${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`
        return `${fecha} - ${hora}`
    }

    async listar(id) {
        let data = await fs.readFile(this.ruta, { encoding: 'utf-8', flag: 'as+' })
        if (data == "") {
            data = []
        } else {
            data = JSON.parse(data)
        }
        if (id != undefined) {
            const dataBuscada = data.find(obj => obj.id == id)
            return dataBuscada
        } else { return data }
    }

    async guardar(obj) {
        const data = await this.listar()
        let idNuevo
        if (data.length == 0) {
            idNuevo = 1
        } else {
            idNuevo = data[data.length - 1].id + 1
        }
        const ObjetoNuevo = { ...obj, timestamp: this.date(), id: idNuevo }
        data.push(ObjetoNuevo)
        await this.soloGuardar(data)
        return ObjetoNuevo
    }

    async soloGuardar(data) {
        try {
            await fs.writeFile(this.ruta, JSON.stringify(data, null, 2))
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async actualizar(elem, id) {
        let dataActualizar = await this.listar(id)
        let dataCompleta = await this.listar()
        dataCompleta = dataCompleta.filter(obj => obj.id != id)
        if (!dataActualizar) {
            throw new Error(`Error al actualizar: no se encontró el id ${id}`)
        } else {
            id = parseInt(id)
            dataActualizar = { ...dataActualizar, ...elem, id, timestamp: this.date() }
            dataCompleta.push(dataActualizar)
            try {
                await fs.writeFile(this.ruta, JSON.stringify(dataCompleta, null, 2))
                return dataActualizar
            } catch (error) {
                throw new Error(`Error al actualizar: ${error}`)
            }
        }
    }

    async borrar(id) {
        let data = await this.listar()
        if (data.findIndex(obj => obj.id == id) == -1) {
            return false
        } else {
            data = data.filter(objs => objs.id != id)
            await this.soloGuardar(data)
        }
    }

    async borrarAll() {
        try {
            await fs.writeFile(this.ruta, JSON.stringify([], null, 2))
        } catch (error) {
            throw new Error(`Error al borrar todo: ${error}`)
        }
    }
}

module.exports = ContenedorArchivo