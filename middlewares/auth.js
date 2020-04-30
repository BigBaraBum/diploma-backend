require('dotenv').config();
const jwt = require('jsonwebtoken');
const CustomError = require('../errors/customError');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-secret');
  } catch (err) {
    next(new CustomError('Необходима авторизация', '401'));
  }
  req.user = payload;
  next();
};
