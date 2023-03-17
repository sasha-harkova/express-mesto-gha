const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/card');

const urlPattern = /^https?:\/\/(www\.)?[a-zA-Z0-9-]*\.[a-zA-Z0-9]*\b([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)#?/;

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().uri().pattern(urlPattern),
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }).unknown(true),
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }).unknown(true),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }).unknown(true),
}), dislikeCard);

module.exports = router;
