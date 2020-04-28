const Article = require('../models/article');

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;
  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.send({ data: article }))
    .catch(next);
};
module.exports.deleteArticleById = (req, res, next) => {
  Article.findById(req.params.articleId)
    .then((article) => {
      if (article) {
        if (article.owner.toString() === req.user._id) {
          Article.findByIdAndRemove(req.params.articleId)
            .then((deletedArticle) => {
              res.send({ data: deletedArticle });
            })
            .catch(next);
        } else {
          throw new Error('no rights to delete');
        }
      } else {
        throw new Error('article not found');
      }
    })
    .catch(next);
};
module.exports.getArticlesByOwner = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((article) => res.send({ data: article }))
    .catch(next);
};
