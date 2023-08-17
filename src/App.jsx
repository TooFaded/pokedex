import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import AllPokemon from "./components/AllPokemon";
import PokemonDetails from "./components/PokemonDetails";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/pokemon" element={<AllPokemon />} />
            <Route path="/pokemon/:pokemonId" element={<PokemonDetails />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
