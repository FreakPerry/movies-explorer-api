const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { movieValidator } = require('../utils/validators/movieValidator');

router.get('/', getMovies);
router.post('/', movieValidator, createMovie);
router.delete('/:movieId', deleteMovie);

module.exports = router;
