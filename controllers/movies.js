const { default: mongoose } = require('mongoose');
const movieModel = require('../models/movie');
const { OK, FORBIDDEN, BAD_REQUEST, NOT_FOUND, CREATED } = require('../utils/constants');
const CastomError = require('../utils/errors/CastomError');

const getMovies = async (req, res, next) => {
  try {
    const movies = await movieModel.find({ owner: req.user._id });
    res.status(OK).send(movies);
  } catch (e) {
    next(e);
  }
};

const createMovie = async (req, res, next) => {
  try {
    req.body.owner = req.user._id;
    const movie = await movieModel.create(req.body);
    res.status(CREATED).send(movie);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      next(new CastomError(e.message, BAD_REQUEST));
    } else {
      next(e);
    }
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const { user } = req;
    const movie = await movieModel.findById(movieId).orFail();
    if (movie.owner.toString() !== user._id) {
      throw new CastomError("You can't delete other people's movies", FORBIDDEN);
    }
    await movieModel.deleteOne(movie);
    res.status(OK).send({ message: 'movie was deleted' });
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      next(new CastomError(e.message, BAD_REQUEST));
    } else if (e instanceof mongoose.Error.DocumentNotFoundError) {
      next(new CastomError('Movie not found', NOT_FOUND));
    } else {
      next(e);
    }
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
