import mongoose from 'mongoose'
import 'dotenv/config'

const MDB_USER = process.env.MDB_USER
const MDB_USER_PASSWORD = process.env.MDB_USER_PASSWORD
const MDB_SERVER = process.env.MDB_SERVER

const uri = `mongodb+srv://${MDB_USER}:${MDB_USER_PASSWORD}@${MDB_SERVER}/?retryWrites=true&w=majority&appName=Cluster0`

export const connectMongoose = async () => {
    try {
        await mongoose.connect(uri, { dbName: 'final_prueba' })
        console.log('✅ Conectado a MongoDB con Mongoose')
    } catch (error) {
        console.error('❌ Error de conexión:', error)
    }
}
