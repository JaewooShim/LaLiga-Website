import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
    console.log(select)
  }, [select])
  return (
    <div className="flex flex gap2">
      {posList.map((pos) => (
        <button
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
          onClick={() => toggleOptions(pos)}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
            {pos}
          </span>
        </button>
      ))}
    </div>
  );
};

export default Position;
