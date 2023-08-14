import { useState, useEffect } from "react";
import axios from "axios";

function AllPokemon() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    // Fetch all Pokémon from the API
    axios.get("http://localhost:3001/pokemon").then((response) => {
      setPokemonList(response.data);
    });
  }, []);

  return (
    <div>
      <h2>All Pokémon</h2>
      <ul>
        {pokemonList.map((pokemon) => (
          <li key={pokemon._id}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default AllPokemon;
