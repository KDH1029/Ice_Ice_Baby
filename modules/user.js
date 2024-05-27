const mongoose = require('mongoose');
const url = `mongodb+srv://KDH:4n3g7!WTY_zZVd-@cluster0.sthvvfu.mongodb.net/userDB?retryWrites=true&w=majority&appName=Cluster0`;
const UserModel = require('../models/user');

/**
 * Connect mongo db
 */
mongoose
  .connect(url)
  .then(() => {
    console.log("connected");
  }).catch((err) => {
    console.log("error: ", err);
  });

/**
 * Register data into mongo db.
 * @param {Object} obj object to create
 * @returns create result
 */
function create(obj) {
  return new Promise((resolve, reject) => {
    UserModel
      .create(obj)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}

/**
 * Search data from mongo db.
 * @param {Object} query search condition
 * @returns search result
 */
function search(id, pw) {
  return new Promise((resolve, reject) => {
    UserModel
      .findOne({ id: id })
      .then(data => {
        if (data != null)
          if (data.pw == pw)
            resolve(data);
          else
            reject({ error: "Authentication failed." });
        else
          reject({ error: "user not found." });
      })
      .catch(err => reject(err));
  });
}

/**
 * Update existing data that match the query to given object.
 * @param {String} id 
 * @param {Object} obj 
 * @returns update result
 */
function update(id, pw, obj) {
  return new Promise((resolve, reject) => {
    search(id, pw)
      .then(data => {
        UserModel
          .findOneAndUpdate({ id: id }, obj)
          .then(data => resolve(data))
          .catch(err => reject(err));
      })
      .catch(err => resolve(err));
  });
}

/**
 * Delete object in mongo db
 * @param {Object} query search condition
 * @returns delete result
 */
function del(id, pw) {
  return new Promise((resolve, reject) => {
    search(id, pw)
      .then(data => {
        UserModel
          .deleteOne({ id: id })
          .then(data => resolve(data))
          .catch(err => reject(err));
      })
      .catch(err => resolve(err));
  });
}

module.exports = { create, search, update, del };
