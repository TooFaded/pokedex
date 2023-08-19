const mongoose = require("mongoose");
const Pokemon = require("./pokemon");

exports.handler = async (event, context) => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    console.log(MONGO_URI);

    // Establish the database connection
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const path = event.path;
    const httpMethod = event.httpMethod;
    const body = JSON.parse(event.body);

    if (httpMethod === "GET" && path === "/pokemon") {
      const limit = 20;
      try {
        const pokemon = await Pokemon.find().limit(limit);
        return {
          statusCode: 200,
          body: JSON.stringify(pokemon),
        };
      } catch (error) {
        return {
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
        await newPokemon.save();

        return {
          statusCode: 201,
          body: JSON.stringify(newPokemon),
        };
      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: error.message }),
        };
      }
    } else if (httpMethod === "DELETE" && path.startsWith("/pokemon/")) {
      const pokemonId = path.split("/")[2];
      try {
        await Pokemon.findByIdAndDelete(pokemonId);
        return {
          statusCode: 200,
          body: JSON.stringify({ message: "Pokémon deleted successfully" }),
        };
      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: error.message }),
        };
      }
    } else if (httpMethod === "GET" && path.startsWith("/pokemon/")) {
      const pokemonId = path.split("/")[2];

      try {
        const pokemon = await Pokemon.findById(pokemonId);
        if (!pokemon) {
          return {
            statusCode: 404,
            body: JSON.stringify({ error: "Pokemon not found" }),
          };
        }

        return {
          statusCode: 200,
          body: JSON.stringify(pokemon),
        };
      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: error.message }),
        };
      }
    }

    // Close the database connection
    mongoose.connection.close();

    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Route not found" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
