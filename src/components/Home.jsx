import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="text-white flex flex-col justify-center items-center h-screen space-y-6">
      <h1 className="text-6xl text-center sm:text-9xl mx-20 font-bold font-manrope">
        Welcome
        <br /> to <br /> My Pokédex!
      </h1>
      <Link className="underline" to="/pokemon">
        View All Pokémon
      </Link>
    </div>
  );
}

export default Home;
