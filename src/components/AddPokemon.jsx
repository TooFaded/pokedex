import { useState } from "react";
import axios from "axios";
import pokeball from "../assets/pokeball.png";
import { MdDoneOutline } from "react-icons/md";

function AddPokemon({ updateAllPokemonList }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [spriteImg, setSpriteImg] = useState(pokeball);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a POST request to add a new Pokémon
    axios
      .post("/.netlify/functions/createPokemon/pokemon", {
        name,
        type,
        spriteImg,
      })
      .then((response) => {
        setMessage(`Added ${response.data.name} to the Pokédex!`);
        setName("");
        setType("");
        setSpriteImg(response.data.spriteImg || pokeball);
        updateAllPokemonList(response.data);
        setShowMessage(true);
        console.log(response.data);
        // Reset the message after a delay
        setTimeout(() => {
          setShowMessage(false);
        }, 3000); // Adjust the delay as needed (3000ms = 3 seconds)
      })
      .catch((error) => {
        setMessage("Error adding Pokémon");
      });
  };

  return (
    <div className="text-white flex flex-col justify-center items-center space-y-6">
      <h2 className="mt-6">Add a New Pokémon</h2>
      <form
        className="text-white flex flex-col justify-center items-center sm:inline space-x-4 space-y-4"
        onSubmit={handleSubmit}
      >
        <label className="ml-4">
          <input
            className="p-1 bg-gray-800 rounded-md"
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="mr-4">
          <input
            className="p-1 bg-gray-800 rounded-md"
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
      <p
        className={`bg-green-500 p-2 flex ${
          showMessage ? "opacity-100" : "opacity-0"
        } transition-opacity duration-400`}
      >
        {message}
        <MdDoneOutline className="ml-1" />
      </p>
    </div>
  );
}

export default AddPokemon;
