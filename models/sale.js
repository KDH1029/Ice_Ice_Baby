const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  id:{
    type:String,
    required:true,
    trim:true
  },
  provider:{
    type:String,
    required:true,
    trim:true
  },
  list:[String],
  pay:Number,
},{timestamps:true});

const ItemModel = mongoose.model('items', ItemSchema);
module.exports = ItemModel;
