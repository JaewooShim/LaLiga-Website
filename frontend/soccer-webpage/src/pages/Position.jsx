import React from "react";
import { Link, useParams } from "react-router-dom";

const Position = () => {
  const posList = ["FW", "MF", "DF", "GK"];
  return (
    <div>
      <h1>Position</h1>
      <ul>
        {posList.map((pos) => (
          <li>
            <Link to={`/position/details/${pos}`}>{pos}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Position;
