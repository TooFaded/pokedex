// pokemon.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const pokemonSchema = new Schema({
  name: String,
  type: String,
  spriteImg: String,
  description: String,
  isCreated: Boolean,
});

const Pokemon = model("Pokemon", pokemonSchema);

export default Pokemon;
