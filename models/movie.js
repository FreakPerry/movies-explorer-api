const { default: mongoose } = require('mongoose');
const validator = require('validator');

const movieSchema = mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validation: {
        validator: (value) => validator.isURL(value),
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validation: {
        validator: (value) => validator.isURL(value),
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validation: {
        validator: (value) => validator.isURL(value),
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      validation: {
        validator: (value) => validator.isURL(value),
      },
    },
    movieId: {
      type: String,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
