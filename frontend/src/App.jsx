import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles/App.css";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((response) => setData(response.data.results));
  }, []);

  return (
    <div className="wrapper">
      {data.map((data) => {
        return (
          <div className="box" key={data.id}>
            <img src={data.image} alt={data.name} />
            <p>{data.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default App;
