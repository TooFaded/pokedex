import { useState } from "react";
import axios from "axios";

function AddPokemon() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a POST request to add a new Pokémon
    axios
      .post("/pokemon", { name, type })
      .then((response) => {
        setMessage(`Added ${response.data.name} to the Pokédex!`);
        setName("");
        setType("");
      })
      .catch((error) => {
        setMessage("Error adding Pokémon");
      });
  };

  return (
    <div className="text-white flex flex-col justify-center items-center space-y-6">
      <h2 className="mt-6">Add a New Pokémon</h2>
      <form className="text-black" onSubmit={handleSubmit}>
        <label className="mx-6">
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="mr-4">
          <input
            type="text"
            value={type}
            placeholder="Type"
            onChange={(e) => setType(e.target.value)}
          />
        </label>
        <button
          className="bg-pokemonRed hover:bg-red-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
          type="submit"
        >
          Add Pokémon
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default AddPokemon;
