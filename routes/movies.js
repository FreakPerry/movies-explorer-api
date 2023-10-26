const router = require('express').Router();
const { getMovies, createMovie } = require('../controllers/movies');
const { movieValidator } = require('../utils/validators/movieValidator');

router.get('/', getMovies);
router.post('/', movieValidator, createMovie);

module.exports = router;
