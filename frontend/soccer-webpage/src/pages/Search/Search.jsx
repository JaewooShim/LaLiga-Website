import React, { useEffect, useState } from "react";
import PlayerTable from "../../components/PlayerTable";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import "../Search/Search.css"

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
    <div className="input-wrapper">
      <FaSearch className="search-icon"/>
      <input
        type="text"
        placeholder="Search a player..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {players.length > 0 && <PlayerTable data={players} />}
    </div>
  );
};

export default Search;
