'use strict'
import User from './user.model.js' //Unico que puede ir en mayuscula.
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'
import { hash } from 'bcrypt'

export const test = (req, res) => {
    return res.send('Hello World')
}

export const register = async (req, res) => { //solo para clientes
    try {
        // Capturar la informacion del cliente (body)
        let data = req.body;

        // Ecriptar la contrasena
        data.password = await encrypt(data.password)

        // Asignar el rol por defecto
        data.role = 'CLIENT' //Si viene con otro valor o no viene, lo asigna al cliente.

        // Crear una instancia del modelo (Schema)
        let user = new User(data)

        // Guardar la informacion
        await user.save()

        // Respuesta al usuario
        return res.send({ message: 'Registered Successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering user', err })
    }
}

export const login = async (req, res) => {
    try {
        //Capturar la informacion (body)
        let { username, password } = req.body
        //Validar que el usuario existe.
        let user = await User.findOne({ username: username }) //Username: 'jnoj'
        //Verificar que la contrasena exista.
        if (user && await checkPassword(password, user.password)) {
            let loggedUser = {
                username: user.username,
                name: user.name,
                role: user.role
            }
            //Responder (dar acceso). 
            return res.send({ message: `Welcome ${user.name}` })
        }
        return res.status(404).send({ message: 'Invalid credentials' })
    } catch (err) {
        console.error()
        return res.status(500).send({ message: 'Failed Login' })
    }
}

export const update = async (req, res) => {
    try {
        //Obtener el ID del usuario a actualizar.
        let { id } = req.params
        //Obtener datos que vamos a actualizar.
        let data = req.body
        //Validar si trae datos a actuaizar.
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({ message: 'Heve submitted some data that cannot be update or missing data ' })
        //Validar si tiene permisos (Tokenizacion)

        //Actualizar en la DB
        let updatedUser = await user.findOneUpdate(
            { _id: id }, //ObjetctId <-hexadecimal
            data, //Datos que va a actualizar
            { new: true } //Objeto de la Base de datos ya actulizado
        )
        //Validar si se actualizo.
        if (!updatedUser) return res.status(401).send({ message: 'User not found and not updated' })
        //Responder al usuario. 
        return res.send({ message: 'Update user', updateUser })
    } catch (err) {
        console.error(err)
        if (err.keyValue.username) return res.status(400).send({ message: `Username ${err.keyValue.username} is already token` })
        return res.status(500).send({ message: 'Error updating account' })
    }
}

export const deleteU = async (req, res) => {
    try {
        //obtener el ID
        let { id } = req.params
        //Vlidar si esta logeado y es le mismo por hoy no lo vemos
        // Elminar (DeleteOne / findOneAndDelete)
        let deletedUser = await User.findOneAndDelete({ _id: id })
        //Verificar que se elimino
        if (!deletedUser) return res.status(404).send({ message: 'Account not found and not deleted' })
        //Responder
        return res.send({ message: `Account with username ${deletedUser.username} deleted successfully` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting account' })
    }
}