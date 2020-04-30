module.exports.errorHandler = (err, req, res, next) => {
  if (err.code === 11000 && err.name === 'MongoError') {
    res.status(400).send({ message: `Имейл ${err.keyValue.email} уже зарегистрирован` });
  } else {
    res.status(err.statusCode).send({ message: err.message });
  }
  next();
};
