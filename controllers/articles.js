const Article = require('../models/article');
const CustomError = require('../errors/customError');

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;
  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.send({
      data: {
        keyword: article.keyword,
        title: article.title,
        text: article.text,
        date: article.date,
        source: article.source,
        link: article.link,
        image: article.image,
      },
    }))
    .catch(next);
};
module.exports.deleteArticleById = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .then((article) => {
      if (article) {
        if (article.owner.toString() === req.user._id) {
          Article.findByIdAndRemove(req.params.articleId)
            .then((deletedArticle) => {
              res.send({ data: deletedArticle });
            })
            .catch(next);
        } else {
          throw new CustomError('Нет прав для удаления этой статьи', 401);
        }
      } else {
        throw new CustomError('Статья не найдена', 404);
      }
    })
    .catch(next);
};
module.exports.getArticlesByOwner = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((article) => res.send({ data: article }))
    .catch(next);
};
