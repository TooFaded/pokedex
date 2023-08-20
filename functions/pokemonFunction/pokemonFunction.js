// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const Pokemon = require("./pokemon"); // Import the Pokemon model

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();

const handler = async (event) => {
  try {
    const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
    const collection = database.collection(process.env.MONGODB_COLLECTION);
    const path = event.path;
    const httpMethod = event.httpMethod;
    const body = JSON.parse(event.body);

    let response;

    if (httpMethod === "GET" && path === "/pokemon") {
      const limit = 20;
      try {
        const pokemon = await Pokemon.find().limit(limit); // Use the Pokemon model
        response = {
          statusCode: 200,
          body: JSON.stringify(pokemon),
        };
      } catch (error) {
        response = {
          statusCode: 500,
          body: JSON.stringify({ error: error.message }),
        };
      }
    } else if (httpMethod === "POST" && path === "/pokemon") {
      const { name, type, spriteImg, description } = body;

      try {
        const newPokemon = new Pokemon({
          name,
          type,
          spriteImg,
          description,
          isCreated: true,
        });
        await newPokemon.save(); // Use the Pokemon model
        response = {
          statusCode: 201,
          body: JSON.stringify(newPokemon),
        };
      } catch (error) {
        response = {
          statusCode: 500,
          body: JSON.stringify({ error: error.message }),
        };
      }
    } else if (httpMethod === "DELETE" && path.startsWith("/pokemon/")) {
      const pokemonId = path.split("/")[2];
      try {
        await Pokemon.findByIdAndDelete(pokemonId); // Use the Pokemon model
        response = {
          statusCode: 200,
          body: JSON.stringify({ message: "Pokémon deleted successfully" }),
        };
      } catch (error) {
        response = {
          statusCode: 500,
          body: JSON.stringify({ error: error.message }),
        };
      }
    } else if (httpMethod === "GET" && path.startsWith("/pokemon/")) {
      const pokemonId = path.split("/")[2];

      try {
        const pokemon = await Pokemon.findById(pokemonId); // Use the Pokemon model
        if (!pokemon) {
          response = {
            statusCode: 404,
            body: JSON.stringify({ error: "Pokemon not found" }),
          };
        } else {
          response = {
            statusCode: 200,
            body: JSON.stringify(pokemon),
          };
        }
      } catch (error) {
        response = {
          statusCode: 500,
          body: JSON.stringify({ error: error.message }),
        };
      }
    } else {
      response = {
        statusCode: 404,
        body: JSON.stringify({ error: "Route not found" }),
      };
    }

    // Close the database connection
    await clientPromise.close();

    return {
      ...response,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:8888", // Allow requests from your local environment
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:8888", // Allow requests from your local environment
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};

module.exports = { handler };
