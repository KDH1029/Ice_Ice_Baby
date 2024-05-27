const mongoose = require('mongoose');
const url = `mongodb+srv://KDH:4n3g7!WTY_zZVd-@cluster0.sthvvfu.mongodb.net/userDB?retryWrites=true&w=majority&appName=Cluster0`;
const UserModel = require('../models/user');

/**
 * Connect mongo db
 */
mongoose
  .connect(url)
  .then(()=>{
    console.log("connected");
  }).catch((err)=>{
    console.log("error: ",err);
  });

/**
 * Register data into mongo db.
 * @param {Object} obj object to create
 * @returns create result
 */
function create(obj){
  return new Promise((resolve,reject)=>{
    UserModel
      .create(obj)
      .then(data=>resolve(data))
      .catch(err=>reject(err));
  });
}

/**
 * Search data from mongo db.
 * @param {Object} query search condition
 * @returns search result
 */
function search(query){
  return new Promise((resolve,reject)=>{
    UserModel
      .findOne({id:query})
      .then(data=>resolve(data))
      .catch(err=>reject(err));
  });
}

/**
 * Update existing data that match the query to given object.
 * @param {String} id 
 * @param {Object} obj 
 * @returns update result
 */
function update(id,obj){
  return new Promise((resolve,reject)=>{
    UserModel
      .findOneAndUpdate({id:id},obj)
      .then(data=>resolve(data))
      .catch(err=>reject(err));
  });
}

/**
 * Delete object in mongo db
 * @param {Object} query search condition
 * @returns delete result
 */
function del(query){
  return new Promise((resolve,reject)=>{
    UserModel
      .deleteMany(query)
      .then(data=>resolve(data))
      .catch(err=>reject(err));
    });
}

module.exports = {create,search,update,del};
