import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

function PokemonDetails() {
  const { pokemonId } = useParams(); // Get the Pokémon ID from the URL params
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/pokemon/${pokemonId}`)
      .then((response) => {
        // Check if the description is available, otherwise set a default
        const defaultDescription =
          "A mysterious Pokémon with unknown abilities.";
        const pokemonData = response.data;
        console.log(pokemonData);
        if (!pokemonData.description) {
          pokemonData.description = defaultDescription;
        }
        setPokemonDetails(pokemonData);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon details:", error);
      });
  }, [pokemonId]);

  return (
    <div className="flex flex-col h-screen justify-center items-center text-white">
      <Link to="/pokemon">
        <IoMdArrowRoundBack className="sm:text-6xl text-3xl bg-pokemonRed hover:bg-red-800 sm:absolute relative top-40 left-90 rounded-full cursor-pointer" />
      </Link>

      {pokemonDetails && (
        <div className="bg-slate-400 p-6 rounded-lg shadow-xl border-2 border-black">
          <h3 className="text-5xl bg-pokemonRed text-center mx-16 p-4 rounded-full border-2 border-black">
            {pokemonDetails.name.toUpperCase()}
          </h3>
          <img
            className="w-[32rem]"
            src={pokemonDetails.spriteImg}
            alt={pokemonDetails.name}
          />
          <p className="bg-green-400 p-2  text-black text-center mx-40">
            Type: {pokemonDetails.type}
          </p>
        </div>
      )}
      {pokemonDetails && (
        <p className=" bg-gray-900 p-2 flex justify-center items-center text-xl mt-10 mx-8">
          {pokemonDetails.description}
        </p>
      )}
    </div>
  );
}

export default PokemonDetails;
