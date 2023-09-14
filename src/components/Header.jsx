import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-pokemonRed p-6 font-manrope">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white flex font-bold text-xl">
          My Pokédex
        </Link>
        <div className="space-x-4">
          <Link to="/pokemon" className="text-white">
            All Pokémon
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
