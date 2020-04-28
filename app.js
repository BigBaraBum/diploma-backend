const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const users = require('./routes/users');
const articles = require('./routes/articles');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/newsexplorerdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
app.use(requestLogger);

// todo validation
app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/users', users);
app.use('/articles', articles);

app.use(errorLogger);

app.listen(PORT, () => {

});
