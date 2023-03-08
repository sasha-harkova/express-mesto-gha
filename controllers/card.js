const Card = require('../models/cardSchema');

const error400Message = 'Переданы некорректные данные';
const error404Message = 'Карточка с указанным _id не найдена.';
const error500Message = 'На сервере произошла ошибка';

function getCards(req, res) {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => res.status(500).send({ message: error500Message }));
}

function createCard(req, res) {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).send({ message: error400Message });
      }
      return res.status(500).send({ message: error500Message });
    });
}

function deleteCard(req, res) {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card === null) {
        return res.status(404).send({ message: error404Message });
      }
      return res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).send({ message: error400Message });
      }
      return res.status(500).send({ message: error500Message });
    });
}

function likeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        return res.status(404).send({ message: error404Message });
      }
      return res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).send({ message: error400Message });
      }
      return res.status(500).send({ message: error500Message });
    });
}

function dislikeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        return res.status(404).send({ message: error404Message });
      }
      return res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).send({ message: error400Message });
      }
      return res.status(500).send({ message: error500Message });
    });
}

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};

// "_id": "64088a02c7da6336ad30381f"
