const mongoose = require("mongoose")

const Schema = mongoose.Schema

const itemsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Item", itemsSchema)