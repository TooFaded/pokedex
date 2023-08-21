const { MongoClient, ObjectId } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGO_URI);

exports.handler = async (event) => {
  try {
    const id = event.path.split("/").pop(); // Extract the ID from the last segment

    await mongoClient.connect();
    const database = mongoClient.db("pokemon_database");
    const collection = database.collection("pokemons");

    const pokemon = await collection.findOne({ _id: new ObjectId(id) });

    if (!pokemon) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Pokemon not found" }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        },
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(pokemon),
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
