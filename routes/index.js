const router = require('express').Router();
const routerForCreatingUserAndAuthorization = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const userRoutes = require('./userRoutes');
const cardRoutes = require('./cardRoutes');
const { createUser, login } = require('../controllers/user');

const urlPattern = /https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?/;

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

routerForCreatingUserAndAuthorization.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlPattern),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

routerForCreatingUserAndAuthorization.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
}), login);

router.use((req, res) => {
  res.status(404).send({ message: 'Страница по указанному маршруту не найдена' });
});

module.exports = { router, routerForCreatingUserAndAuthorization };
