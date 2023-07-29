const Item = require("../models/itemsModel")
const mongoose = require("mongoose")

const getItems = async(req, res) => {
    const items = await Item.find({}).sort({createdAt: -1})
    res.status(200).json(items)
}

const getItem = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such item'})
    }

    const item = await Item.findById(id)

    if (!item) {
        return res.status(404).json({error: 'No such item'})
    }
    
    res.status(200).json(item)
}

const createItem = async (req, res) => {
    const {title, price} = req.body
  
    let emptyFields = []
  
    if(!title) {
      emptyFields.push('title')
    }
    if(!price) {
      emptyFields.push('price')
    }
    if(emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }
  
    // add doc to db
    try {
      const user_id = req.user._id
      console.log(user_id)
      const item = await Item.create({title, price, user_id})
      res.status(200).json(item)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}

const deleteItem = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such item'})
    }
  
    const item = await Item.findOneAndDelete({_id: id})
  
    if (!item) {
      return res.status(400).json({error: 'No such item'})
    }
  
    res.status(200).json(item)
}
  
  // update a workout
const updateItem = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such item'})
    }
  
    const item = await Item.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!item) {
      return res.status(400).json({error: 'No such item'})
    }
  
    res.status(200).json(item)
}

module.exports = {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
}