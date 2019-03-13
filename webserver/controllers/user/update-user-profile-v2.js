'use strict';

const updateUserProfile = require('../../../domain/use-cases/users/update-user-profile');

async function updateUserProfileController(req, res, next) {
  const userDataProfile = { ...req.body };
  const { authorization } = req.headers;

  try {
    await updateUserProfile(userDataProfile, authorization);
    return res.status(204).send();
  } catch (e) {
    return next(e);
  }
}

module.exports = updateUserProfileController;
