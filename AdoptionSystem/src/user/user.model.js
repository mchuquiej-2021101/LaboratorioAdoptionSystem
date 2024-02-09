import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    }, 
    email: {
        type: String, 
        required: true
    },
    username: {
        type: String,
        unique: true, //Solo puede existir un registgro unico
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        minLenght: [8, 'Password must be 8 characters'],
        required: true
    },
    phone: {
        type: String, 
        minLenght: 8,
        maxLinght: 8,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        uppercase: true,
        enum: ['ADMIN', 'CLIENT'], //Solo los datos que esten en el arreglo son validos.
        required: true
    }
})

//Pre mongoose
export default mongoose.model('user', userSchema)