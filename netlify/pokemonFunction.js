const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Pokemon = require("./pokemon");

const app = express();

app.use(express.json());
app.use(cors());

// Get all Pokemon
app.get("/pokemon", async (req, res) => {
  const limit = 100;
  try {
    const pokemon = await Pokemon.find().limit(limit);
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Post a new pokemon
app.post("/pokemon", async (req, res) => {
  const { name, type, spriteImg, description } = req.body;

  try {
    const newPokemon = new Pokemon({
      name,
      type,
      spriteImg,
      description,
      isCreated: true,
    });
    await newPokemon.save();

    res.status(201).json(newPokemon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/pokemon/:id", async (req, res) => {
  const pokemonId = req.params.id;
  try {
    await Pokemon.findByIdAndDelete(pokemonId);
    res.json({ message: "Pokémon deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific Pokemon by id
app.get("/pokemon/:id", async (req, res) => {
  const pokemonId = req.params.id;

  try {
    const pokemon = await Pokemon.findById(pokemonId);
    if (!pokemon) {
      return res.status(404).json({ error: "Pokemon not found" });
    }

    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

exports.handler = async (event, context) => {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    // Create the database connection
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Your function logic here

    // Close the database connection
    mongoose.connection.close();

    return {
      statusCode: 200,
      body: JSON.stringify("Function executed successfully"),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
