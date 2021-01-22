const router = require('express').Router();

const { createArticle, deleteArticleById, getArticlesByOwner } = require('../controllers/articles');
const { createArticleValidator, articleIdValidator } = require('../middlewares/validation');

router.get('/', getArticlesByOwner);

router.post('/', createArticleValidator, createArticle);

router.delete('/:articleId', articleIdValidator, deleteArticleById);

module.exports = router;
