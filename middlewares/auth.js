const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const error401Message = 'Необходима авторизация';

function handleAuthError(res) {
  res.status(401).send(error401Message);
}

function checkAuth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
}

module.exports = checkAuth;
