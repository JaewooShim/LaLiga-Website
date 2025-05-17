import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import PlayerTable from "../components/PlayerTable/PlayerTable";
const Position = () => {
  const [select, setSelect] = useState([]);
  const [players, setPlayers] = useState([]);
  const posList = ["FW", "MF", "DF", "GK"];

  const toggleOptions = (pos) => {
    setSelect((prev) =>
      prev.includes(pos) ? prev.filter((item) => item !== pos) : [...prev, pos]
    );
  };

  useEffect(() => {
    if (select.length === 0) {
      setPlayers([]);
      return;
    }
    const debounce = setTimeout(() => {
      const query = select.map((pos) => `pos=${pos}`).join("&");
      console.log(query);
      axios
        .get(`http://localhost:8080/api/players/pos?${query}`)
        .then((res) => setPlayers(res.data))
        .catch((err) => console.log(err));
    }, 300);
    return () => clearTimeout(debounce);
  }, [select]);

  return (
    <div className="flex flex-col items-center w-full px-4">
      <div className="flex flex-wrap justify-center gap-4 mb-8 w-full">
        {posList.map((pos) => (
          <button
          key={pos}
          className={`relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900
            ${select.includes(pos) ? "ring-4 ring-red-100 dark:ring-red-400" : ""}
            active:ring-4 active:ring-red-300`}
          onClick={() => toggleOptions(pos)}
        >
          <span className="relative px-6 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
            {pos}
          </span>
        </button>
        ))}
      </div>

      <div className="w-full">
        {players.length > 0 && <PlayerTable data={players} />}
      </div>
    </div>
  );
};

export default Position;
