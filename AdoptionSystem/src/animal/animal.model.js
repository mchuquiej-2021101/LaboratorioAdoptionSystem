import mongoose from "mongoose";

const animalSchema = mongoose.Schema({
    animalName: {
        type: String,
        require: true
    },

    animalBreed: {
        type: String,
        require: true
    },

    animalAge: {
        type: String,
        require: true
    },

    animalGenus: {
        type: String,
        require: true
    }
})

export default mongoose.model('aminal', animalSchema)

