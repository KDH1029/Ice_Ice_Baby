const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id:{
    type:String,
    required:true,
    unique:true,
    trim:true
  },
  pw:{
    type:String,
    required:true,
    trim:true
  },
  username:{
    type:String,
    required:true
  },
  history:[String],
  pay:Number,
  event:mongoose.Schema.Types.Mixed
},{timestamps:true});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;