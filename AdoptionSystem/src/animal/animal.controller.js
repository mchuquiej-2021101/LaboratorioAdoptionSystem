'use strict'

import Animal from './animal.model.js'
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'
import { hash } from 'bcrypt'

export const registerAnimal = async (req, res) => {
    try{
        let data = req.body
        data.password = await encrypt(data.password)
        let animal = new Animal(data)
        await animal.save()
        return res.send({message: 'Registrado Satisfactoriamente'})
    } catch(err) {
        console.error(err)
        return res.status(500).send({message: 'Error al registrar al animal', err})
    }
}

export const updateAnimal = async(req, res) => {
    try{
        let { id } = req.params
        let data = req.body
        let updateAnimal = checkUpdate(data, id)
        if (!updateAnimal) return res.status(400).send({message: 'Algunos datos no se pueden actualizar'})
        
        let updatedAnimal = await animal.findOneUpdate(
            {_id: id},
            data,
            { new: true}
        )
        if (!updateAnimal) return res.status(401).send({message: 'Animal no encontrado'})
        return res.send({message: 'Animal Actualizado', updateAnimal})
    } catch(err){
        console.error(err)
        if(err.keyValue.animalName) return res.status(400).send({message: `El nombre del animal ${err.keyValue.animalName} is already`})
        return res.status(500).send({message: 'Error al actualizar'})
    }
}

export const deleteAnimal = async (req, res) => {
    try {
        let { id } = req.params
        let deleteAnimal = await Animal.findOneDelete({_id: id})
        if (!deleteAnimal) return res.status(404).send({message: 'No encontrado'})
        return res.send({message: `Eliminado ${deleteAnimal.animalName} correctamente`})
    } catch(err){
        console.error(err)
        return res.status(500).send({message: 'Erro al eliminar'})
    }
}