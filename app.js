require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const { signinValidator, signupValidator } = require('./middlewares/validation');
const users = require('./routes/users');
const articles = require('./routes/articles');
const { errorHandler } = require('./middlewares/errorHandler');

const { NODE_ENV, MONGO_ADR, PORT = 3000 } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? MONGO_ADR : 'mongodb://localhost:27017/newsexplorerdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
app.use(requestLogger);

app.post('/signin', signinValidator, login);
app.post('/signup', signupValidator, createUser);

app.use(auth);

app.use('/users', users);
app.use('/articles', articles);

app.use('/:any', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {

});
