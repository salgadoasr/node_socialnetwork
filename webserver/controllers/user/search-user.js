'use strict';

const Joi = require('joi');

const PostModel = require('../../../models/user-model');

async function validateSchema(query) {
  return Joi.validate(query, Joi.string().min(3).max(128).required());
}

async function searchUser(req, res, next) {
  const { key } = req.query;

  try {
    await validateSchema(key);
  } catch (e) {
    return res.status(400).send(e.message);
  }

  console.log(key);
  return res.status(200).send(key);
}

module.exports = searchUser;
