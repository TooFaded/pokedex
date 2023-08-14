import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-pokemonRed p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">
          My Pokédex
        </Link>
        <div className="space-x-4">
          <Link to="/pokemon" className="text-white">
            All Pokémon
          </Link>
          <Link to="/add" className="text-white">
            Add Pokémon
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
