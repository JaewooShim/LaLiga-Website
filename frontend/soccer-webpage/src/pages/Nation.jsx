import React from "react";
import { Link } from "react-router-dom";
import Flag from "react-world-flags";
import CountryName from "../components/CountryName";

const Nation = ({ nations }) => {
  const set = new Set(["eng", "sct", "wls"]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-8">
      {nations.length > 0 &&
        nations.map((nation) => (
          <div key={nation.id}
          className="relative group w-40 h-40 mx-auto rounded-full overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 bg-white animate-floating"
          >
            {set.has(nation.nation) ? (
              <img src={`/countries/${nation.nation}.svg`} className="w-full h-full object-contain p-4" />
            ) : (
              <Flag code={nation.nation} className="w-full h-full object-contain p-4" />
            )}
            <div className="absolute inset-0 bg-black/50 backdrop-blur flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
              <p className="text-white text-sm font-semibold mb-1 text-center px-2">
              {CountryName(nation.nation)}
              </p>
              <Link
                to={`/nation/details/${nation.nation}`}
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

export default Nation;
