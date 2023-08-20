import { useState, useEffect } from "react";
import AddPokemon from "./AddPokemon";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

function AllPokemon() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // Fetch all Pokémon from the API
    axios
      .get("/.netlify/functions/pokemonFunction/pokemon")
      .then((response) => {
        setPokemonList(response.data);
      });
  }, []);

  const updateAllPokemonList = (newPokemon) => {
    setPokemonList((prevList) => [
      ...prevList,
      { ...newPokemon, isCreated: true },
    ]);
  };

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDeletePokemon = (pokemonId) => {
    const pokemonToDelete = pokemonList.find(
      (pokemon) => pokemon._id === pokemonId
    );

    if (pokemonToDelete && pokemonToDelete.isCreated) {
      axios
        .delete(`/.netlify/functions/pokemonFunction/pokemon/${pokemonId}`)
        .then((response) => {
          // Filter out the deleted Pokémon from the list
          setPokemonList((prevList) =>
            prevList.filter((pokemon) => pokemon._id !== pokemonId)
          );
        })
        .catch((error) => {
          console.error("Error deleting Pokémon:", error);
        });
    }
  };

  return (
    <div className="text-white p-4">
      <AddPokemon updateAllPokemonList={updateAllPokemonList} />
      <h2 className="text-center text-5xl mt-10 mb-10">All Pokémon</h2>
      <div className="flex justify-center items-center">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="bg-gray-800 text-white rounded-md p-2 mb-4"
        />
      </div>

      <div className="flex items-center justify-center flex-wrap">
        {filteredPokemonList.map((pokemon) => (
          <div
            key={pokemon._id}
            className="flex flex-col w-[18rem] items-center justify-center bg-slate-500 border-2 border-black p-6 m-4 hover:animate-bounce"
          >
            {pokemon.isCreated && (
              <FaTimesCircle
                className="text-red-400 text-lg ml-[15rem] mt-[-0.5rem] cursor-pointer"
                title="Remove Pokémon"
                onClick={() => handleDeletePokemon(pokemon._id)}
              />
            )}
            <img
              src={pokemon.spriteImg}
              alt={pokemon.name}
              className="w-20 h-20"
            />
            <span className="p-2">{pokemon.name.toUpperCase()}</span>

            <Link className="mt-4" to={`/pokemon/${pokemon._id}`}>
              <button className="bg-pokemonRed hover:bg-red-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">
                Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllPokemon;
