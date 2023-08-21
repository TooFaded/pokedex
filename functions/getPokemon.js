const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGO_URI);

exports.handler = async (event) => {
  try {
    await mongoClient.connect();
    const database = mongoClient.db("pokemon_database");
    const collection = database.collection("pokemons");
    const results = await collection.find({}).limit(50).toArray();
    return {
      statusCode: 200,
      body: JSON.stringify(results),
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
