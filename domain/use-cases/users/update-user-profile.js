'use strict';

const Joi = require('joi');
const jwt = require('jsonwebtoken');
const createAuthenticationError = require('../errors/authentication-error');
const userRepository = require('../../repositories/user-repository');

async function validate(payload) {
  const schema = {
    fullName: Joi.string().min(3).max(128).required(),
    preferences: Joi.object().keys({
      isPublicProfile: Joi.bool().required(),
      linkedIn: Joi.string().allow(null),
      twitter: Joi.string().allow(null),
      github: Joi.string().uri().allow(null),
      description: Joi.string().allow(null),
    }),
  };

  return Joi.validate(payload, schema);
}

async function checkAuthorization(authorization) {
  if (!authorization) {
    throw createAuthenticationError('authorization was not provided');
  }

  // .startsWith('JWT ');
  const [prefix, token] = authorization.split(' ');
  if (prefix !== 'JWT') {
    throw createAuthenticationError();
  }

  if (!token) {
    throw createAuthenticationError();
  }

  try {
    const decoded = jwt.verify(token, process.env.AUTH_JWT_SECRET);

    if (!decoded) {
      throw createAuthenticationError();
    }

    return {
      uuid: decoded.uuid,
      role: decoded.role,
    };
  } catch (e) {
    throw createAuthenticationError();
  }
}

async function updateUserProfile(userData, authorization) {
  /**
   * Check authorization header to get uuid
   */
  const { uuid } = await checkAuthorization(authorization);

  /**
   * validate data
   */
  await validate(userData);

  try {
    await userRepository.updateUserProfile(uuid, userData);
  } catch (err) {
    throw err;
  }
}

module.exports = updateUserProfile;
