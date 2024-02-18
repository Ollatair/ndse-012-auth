const { Schema, model } = require('mongoose');

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    authors: {
      type: String,
      default: null,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    fileCover: {
      type: String,
      default: null,
    },
    fileName: {
      type: String,
      default: null,
    },
    fileBook: {
      type: String,
      default: null,
    },
  },
  { versionKey: false },
);

module.exports = model('Book', bookSchema);
