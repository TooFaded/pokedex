import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import AllPokemon from "./components/AllPokemon";
import AddPokemon from "./components/AddPokemon";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/pokemon" element={<AllPokemon />} />
            <Route path="/add" element={<AddPokemon />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
