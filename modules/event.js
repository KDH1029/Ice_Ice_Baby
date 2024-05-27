const UserModel = require('../models/user');

/**
 * Sort by payment
 * @param {Number} top number of users to find
 * @returns top ranked user
 */
function rank(top){
  return new Promise((resolve,reject)=>{
    UserModel
      .find().sort({"pay":-1}).limit(top)
      .then(data=>resolve(data))
      .catch(err=>reject(err));
  });
}
function bingo(){
  
}

module.exports = {rank};