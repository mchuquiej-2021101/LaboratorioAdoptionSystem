'use strict'

import express  from "express"
import { registerAnimal, updateAnimal, deleteAnimal } from "./animal.controller.js"

const api = express.Router()


api.post('/registerAnimal', registerAnimal)
api.put('/updateAnimal/:id', updateAnimal)
api.delete('/deleteAnimal/:id', deleteAnimal)

export default api 
