const User = require('../models/userSchema');

const error400Message = 'Переданы некорректные данные';
const error404Message = 'Пользователь по указанному _id не найден.';
const error500Message = 'На сервере произошла ошибка';

function getUsers(req, res) {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => res.status(500).send({ message: error500Message }));
}

function getUserById(req, res) {
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) {
        return res.status(404).send({ message: error404Message });
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).send({ message: error400Message });
      }
      return res.status(500).send({ message: error500Message });
    });
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).send({ message: error400Message });
      } return res.status(500).send({ message: error500Message });
    });
}

function updateProfile(req, res) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => {
      if (user === null) {
        return res.status(404).send({ message: error404Message });
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).send({ message: error400Message });
      }
      return res.status(500).send({ message: error500Message });
    });
}

function updateAvatar(req, res) {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => {
      if (user === null) {
        return res.status(404).send({ message: error404Message });
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).send({ message: error400Message });
      }
      return res.status(500).send({ message: error500Message });
    });
}

module.exports = {
  getUsers, getUserById, createUser, updateProfile, updateAvatar,
};

// {
//   "name": "Тестовый пользователь",
//   "about": "Информация о себе",
//   "avatar": "https://www.synapse-studio.ru/sites/default/files/styles/article_full/public/article/2020/frame_%284%29_0.png.webp?itok=2utYxGjp",
//    "_id": "6408825d8e92c091f58b67f4",
// }
