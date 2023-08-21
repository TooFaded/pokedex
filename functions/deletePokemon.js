const { MongoClient, ObjectId } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGO_URI);

exports.handler = async (event) => {
  try {
    const id = event.path.split("/").pop();

    await mongoClient.connect();
    const database = mongoClient.db("pokemon_database");
    const collection = database.collection("pokemons");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Pokémon deleted successfully" }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        },
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Pokémon not found" }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        },
      };
    }
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
