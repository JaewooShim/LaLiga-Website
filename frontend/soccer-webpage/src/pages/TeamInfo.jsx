import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const TeamInfo = () => {
    const { teamName } = useParams();
    const [players, setPlayers] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/api/players/team?team=${teamName}`)
        .then((res) => setPlayers(res.data))
        .catch((err) => console.log(err));
    }, [])
  return (
    <div>
      {players.length > 0 && players.map((player) => (<li key={player.id}>{player.player_name}</li>))}
    </div>
  )
}

export default TeamInfo
