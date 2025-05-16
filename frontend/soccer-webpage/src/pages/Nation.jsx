import React from "react";
import { Link } from "react-router-dom";
import Flag from "react-world-flags";

const Nation = ({ nations }) => {
  const set = new Set(["eng", "sct", "wls"]);

  return (
    <div>
      {nations.length > 0 &&
        nations.map((nation) => (
          <li key={nation.id}>
            {set.has(nation.nation) ? (
              <img src={`/countries/${nation.nation}.svg`} height="16" />
            ) : (
              <Flag code={nation.nation} height="16" />
            )}
            <Link to={`/nation/details/${nation.nation}`}>{nation.nation}</Link>
          </li>
        ))}
    </div>
  );
};

export default Nation;
