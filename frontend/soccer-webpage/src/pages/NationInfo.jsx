import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const NationInfo = () => {
    const {nationCode} = useParams();
    const [players, setPlayers] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8080/api/players/nation?nation=${nationCode}`)
        .then((res) => setPlayers(res.data))
        .catch((err) => console.log(err));
    }, [])
  return (
    <div>
        {players.length > 0 && players.map((player) => (<li key={player.id}>{player.player_name}</li>))}
    </div>
  )
}

export default NationInfo
