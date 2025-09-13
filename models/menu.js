const mongoose = require('mongoose');


const menuSchema = new mongoose.Schema({
  dish_name:{
    type: String,
    required: true
  },
  dish_price:{
    type: Number,
    required: true
  },
  dish_description:{
    type: String,
    required: true
  },
  dish_category:{
    type: String,
    enum: ['starter', 'main course', 'dessert'],
    required: true
  },
  dish_taste:{
    type: String,
    enum: ['spicy', 'sweet', 'savory', 'bitter', 'sour'],
    required: true
  }

});

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;

    
