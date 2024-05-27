const mongoose = require('mongoose');

const SalesSchema = new mongoose.Schema({
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

const SalesModel = mongoose.model('sales', SalesSchema);
module.exports = SalesModel;
