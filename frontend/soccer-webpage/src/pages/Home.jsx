import axios from "axios";
import { Link } from "react-router-dom";

const Home = ({ teams }) => {
  return (
    <div>
      {teams.length > 0 &&
        teams.map((team) => (
          <li key={team.id}>
            <img
              src={`/teams/${team.team_name}.png`}
              alt=""
              className="img-fluid"
              style={{
                width: "64px",
                height: "64px",
                objectFit: "contain",
                padding: "4px",
              }}
            />
            <Link to={`/team/${team.team_name}`}>{team.team_name}</Link>
          </li>
        ))}
    </div>
  );
};

export default Home;
