import { useState, useEffect } from "react";
import AddPokemon from "./AddPokemon";
import axios from "axios";
import { FaTimesCircle } from "react-icons/fa";

function AllPokemon() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    // Fetch all Pokémon from the API
    axios.get("http://localhost:3001/pokemon").then((response) => {
      setPokemonList(response.data);
    });
  }, []);

  const updateAllPokemonList = (newPokemon) => {
    setPokemonList((prevList) => [
      ...prevList,
      { ...newPokemon, isCreated: true },
    ]);
  };

  const handleDeletePokemon = (pokemonId) => {
    const pokemonToDelete = pokemonList.find(
      (pokemon) => pokemon._id === pokemonId
    );

    if (pokemonToDelete && pokemonToDelete.isCreated) {
      axios
        .delete(`http://localhost:3001/pokemon/${pokemonId}`)
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

      <div className="flex items-center justify-center flex-wrap">
        {pokemonList.map((pokemon) => (
          <div
            key={pokemon._id}
            className="flex flex-col w-[18rem] items-center justify-center bg-slate-500 border-2 border-black p-6 m-4"
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
            <span className="bg-white text-black p-1 px-4 mt-3 rounded-sm">
              {pokemon.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllPokemon;
