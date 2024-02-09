// Configuracion de Express

// Importaciones
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
import userRoutes from '../src/user/user.routes.js'

//Configuraciones 
const app = express() //Crearcion del servidor. 
config()
const port = process.env.PORT || 3200

// Configurar el servidor de Express.
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors()) //Aceptar o denegar las solicitudes de diferentes origenes (Local o remoto) / Politicas de acceso.
app.use(helmet()) //Aplica capa de seguridad.
app.use(morgan('dev')) //Crea logs de solicitudes al servidor HTTP

//Declaracion de rutas.
app.use(userRoutes)


//Levantar el servidor.
export const initServer = ()=> {
    app.listen(port)
    console.log(`Server HTTP is runnig in port ${port}`)
}








