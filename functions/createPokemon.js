const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGO_URI);

exports.handler = async (event) => {
  try {
    await mongoClient.connect();
    const database = mongoClient.db("pokemon_database");
    const collection = database.collection("pokemons");

    const { name, type, spriteImg, description } = JSON.parse(event.body); // Parse the request body

    const newPokemon = {
      name,
      type,
      spriteImg,
      description,
      isCreated: true,
    };

    const result = await collection.insertOne(newPokemon); // Insert the new Pokémon

    return {
      statusCode: 201,
      body: JSON.stringify(newPokemon), // Return the inserted document with name
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
    };
  } finally {
    await mongoClient.close();
  }
};
