import React, { useEffect, useState } from "react";
import PlayerTable from "../../components/PlayerTable/PlayerTable";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import "../Search/Search.css";

const Search = () => {
  const [search, setSearch] = useState("");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (search.length === 0) {
      console.log("hi empty");
      setPlayers([]);
    } else {
      axios
        .get(`http://localhost:8080/api/players/name?name=${search}`)
        .then((res) => {
          setPlayers(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [search]);

  return (
    <div className="flex flex-col items-center space-y-6 w-full px-4">
      <div className="w-full max-w-2xl">
        <div className="flex items-center w-full px-4 py-2 rounded-lg shadow-md bg-white">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search a player..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-full outline-none"
          />
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        {players.length > 0 && <PlayerTable data={players} />}
      </div>
    </div>
  );
};

export default Search;
