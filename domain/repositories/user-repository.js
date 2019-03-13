'use strict';

const dot = require('dot-object');
const UserModel = require('../../models/user-model');

/**
 * @param {String} uuid
 * @param {Object} userData data to be updated
 * @return {Object} null if everything is ok
 */
async function updateUserProfile(uuid, userData) {
  const userDataProfileMongoose = dot.dot(userData);
  const data = await UserModel.updateOne({ uuid }, userDataProfileMongoose);
  console.log('mongoose data', data);

  return null;
}

module.exports = {
  updateUserProfile,
};
