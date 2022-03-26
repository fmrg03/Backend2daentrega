const firebase = require('firebase-admin')
const serviceAccount = require('../../DB/Firebase/ecommerce-2b4c1-firebase-adminsdk-deda6-4d40f458f0.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
})

class ContenedorFirebase {
  constructor(collection) {
    this.collection = collection
    this.db = firebase.firestore()

    this.connect()
  }

  async connect() {
    try {
      await firebase.firestore()
      console.log('Conectado a Firebase')
    } catch (error) {
      throw new Error(`Error al conectar a Firebase: ${error}`)
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
      const doc = this.db.collection(this.collection).doc(`${id}`)
      const data = await doc.get()
      if (!data.data()) {
        return undefined
      } else {
        const dataGuardada = { id: data.id, ...data.data() }
        return dataGuardada
      }
    } else {
      const datos = await this.db.collection(this.collection).get()
      let docs = datos.docs
      if (docs != undefined) {
        const listaDatos = docs.map(doc => ({
          id: doc.id,
          nombre: doc.data().nombre,
          precio: doc.data().precio,
          descripcion: doc.data().descripcion,
          timestamp: doc.data().timestamp,
          stock: doc.data().stock,
          imagen: doc.data().imagen
        }))
        return listaDatos
      } else {
        return docs
      }
    }

  }

  async guardar(obj) {
    const data = await this.listar()
    let idNuevo = 1
    if (data.length == 0) {
      idNuevo = 1
    }
    else {
      idNuevo = parseInt(data[data.length - 1].id) + 1
    }
    const ObjetoNuevo = { ...obj, timestamp: this.date() }
    await this.soloGuardar(ObjetoNuevo, idNuevo)
    return { id: idNuevo, ...ObjetoNuevo }
  }

  async soloGuardar(data, id) {
    try {
      const doc = this.db.collection(this.collection).doc(`${id}`)
      const save = await doc.create(data)
      return save
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`)
    }
  }

  async actualizar(elem, id) {
    id = parseInt(id)
    let dataActualizar = await this.listar(id)
    // console.log(dataActualizar)
    if (!dataActualizar) {
      throw new Error(`Error al actualizar: no se encontró el id ${id}`)
    } else {
      dataActualizar = { ...dataActualizar, ...elem, id, timestamp: this.date() }
      try {
        const doc = this.db.collection(this.collection).doc(`${id}`)
        // console.log(doc)
        await doc.update(dataActualizar)
        return dataActualizar
      } catch (error) {
        throw new Error(`Error al actualizar: ${error}`)
      }
    }
  }

  async borrar(id) {
    try {
      const existe = await this.listar(id)
      if (existe) {
        const doc = this.db.collection(this.collection).doc(`${id}`)
        await doc.delete()
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
      const datos = await this.db.collection(this.collection).get()
      datos.docs.delete()
      return true
    } catch (error) {
      throw new Error(`Error al borrar todos: ${error}`)
    }
  }
}

module.exports = ContenedorFirebase