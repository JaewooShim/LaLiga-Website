import axios from "axios";
import { Link } from "react-router-dom";

const Home = ({ teams }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-8">
      {teams.length > 0 &&
        teams.map((team) => (
          <div
            key={team.id}
            className="relative group w-40 h-40 mx-auto rounded-full overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 bg-white animate-floating"
          >
            <img
              src={`/teams/${team.team_name}.png`}
              alt={team.name}
              className="w-full h-full object-contain p-4"
            />
            <div className="absolute inset-0 bg-black/50 backdrop-blur flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
              <p className="text-white text-sm font-semibold mb-1 text-center px-2">
                {team.team_name}
              </p>
              <Link
                to={`/team/${team.team_name}`}
                className="text-blue-300 text-xs hover:underline"
              >
                Learn more →
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Home;
