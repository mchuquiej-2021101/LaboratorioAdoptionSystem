// Toda la configuracion de conexion  a MongoDB

'use strict'

import mongoose from "mongoose"
import { disconnect } from "mongoose"

export const connect = async () => {
    try {
        mongoose.connection.on('error', () => {
            console.log('MongDB | could not be connect to mongoDB')
            mongoose.disconnect()
        })

        mongoose.connection.on('connecting', () => console.log('MongoDB | Try connecting'))
        mongoose.connection.on('connected', () => console.log('MongoDB | connected to MongDB'))
        mongoose.connection.on('open', () => console.log('MongoDB | connected to database'))
        mongoose.connection.on('disconnected', () => console.log('MongoDB | disconnected'))
        mongoose.connection.on('reconnected', () => console.log('MongoDB | reconnected to MongoDB'))

        return await mongoose.connect('mongodb://127.0.0.1:27017/AdoptionSystem')
    } catch (err) {
        console.error('No sirve su conexion a la Base de Datos', err)
    }
}






















