import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to My Pokédex!</h1>
      <Link to="/pokemon">View All Pokémon</Link>
    </div>
  );
}

export default Home;
