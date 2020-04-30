const { celebrate, Joi } = require('celebrate');

const createArticleValidator = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().regex(/https?:\/\/(www\.)?(([a-z]+\.[a-z]+)|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(:\d{2,5})?([/a-z0-9]+#?)?/, 'link'),
    image: Joi.string().required().regex(/https?:\/\/(www\.)?(([a-z]+\.[a-z]+)|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(:\d{2,5})?([/a-z0-9]+#?)?/, 'image-link'),
  }),
});
const articleIdValidator = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/, 'objectId'),
  }),
});
const signinValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
  }),
});
const signupValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
  }),
});
module.exports = {
  createArticleValidator,
  articleIdValidator,
  signinValidator,
  signupValidator,
};
