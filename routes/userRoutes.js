const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserById, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/user');

router.get('/', getUsers);

router.get('/me', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }).unknown(true),
}), getCurrentUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }).unknown(true),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri(),
  }),
}), updateAvatar);

module.exports = router;
