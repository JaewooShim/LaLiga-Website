import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlayerTable from "../components/PlayerTable/PlayerTable";

const NationInfo = () => {
  const { nationCode } = useParams();
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/players/nation?nation=${nationCode}`)
      .then((res) => setPlayers(res.data))
      .catch((err) => console.log(err));
  }, []);
  return <div>{players.length > 0 && <PlayerTable data={players} />}</div>;
};

export default NationInfo;
