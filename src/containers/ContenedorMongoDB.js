const mongoose = require('mongoose')

class ContenedorMongoDb{

    constructor(url, db, collection){
        this.url = url
        this.db = db
        this.collection = collection
    }
    
}