
import express from 'express'
import cors from 'cors'
import routerApi from './routes/index.js'
import dotenv from 'dotenv'
import { connectMongoose } from './config/mongoDB.js'
import specs from "./swagger/swagger.js"

import path from 'path'
import { fileURLToPath } from 'url'
import { getAbsoluteFSPath } from 'swagger-ui-dist'

dotenv.config()
const app = express()
const PORT = process.env.PORT
connectMongoose()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors())
// Middleware
app.use(express.json())
app.use(express.static('public'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Servir Swagger UI desde node_modules
app.use('/swagger-ui', express.static(getAbsoluteFSPath()))

// Servir el JSON de Swagger
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(specs)
})

// Servir HTML personalizado + Swagger en la misma página
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

// Rutas de la API
routerApi(app)

app.listen(PORT, () => {
  console.log(`El servidor correrá en http://localhost:${PORT}`)
})

