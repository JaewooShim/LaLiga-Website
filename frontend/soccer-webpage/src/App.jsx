import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search/Search";
import Nation from "./pages/Nation";
import Position from "./pages/Position";
import Navbar from "./components/Navbar";
import axios from "axios";
import TeamInfo from "./pages/TeamInfo";
import NationInfo from "./pages/NationInfo";
import PositionInfo from "./pages/PositionInfo";

function App() {
  const [nations, SetNations] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    console.log("hi");
    axios
      .get("http://localhost:8080/api/tabs/nations")
      .then((res) => SetNations(res.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8080/api/tabs/teams")
      .then((res) => setTeams(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="pt-40 bg-gray-700 min-h-screen">
        <div className="container mx-auto flex flex-wrap justify-center">
          <Routes>
            <Route path="/" element={<Home teams={teams}/>} />
            <Route path="/search" Component={Search} />
            <Route path="/nation" element={<Nation nations={nations} />} />
            <Route path="/position" Component={Position} />
            <Route path="/team/:teamName" Component={TeamInfo} />
            <Route path="/nation/details/:nationCode" Component={NationInfo} />
            <Route path="/position/details/:posCode" Component={PositionInfo} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
