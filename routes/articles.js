const router = require('express').Router();

const { createArticle, deleteArticleById, getArticlesByOwner } = require('../controllers/articles');

// todo validation
router.get('/', getArticlesByOwner);

router.post('/', createArticle);

router.delete('/:articleId', deleteArticleById);

module.exports = router;
