const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
  name: String,
  type: String,
  spriteImg: String,
  description: String,
  isCreated: Boolean,
});

const Pokemon = mongoose.model("Pokemon", pokemonSchema);

module.exports = Pokemon;
