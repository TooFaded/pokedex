const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const pokemonSchema = new Schema({
  name: String,
  type: String,
  spriteImg: String,
  description: String,
  isCreated: Boolean,
});

const Pokemon = model("Pokemon", pokemonSchema);

module.exports = Pokemon;
