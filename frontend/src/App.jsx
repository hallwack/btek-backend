import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import CardTailwind from "./components/CardTailwind";
import "./styles/App.css";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((response) => setData(response.data.results));
  }, []);

  return (
    <>
      <Card data={data} />
      <CardTailwind data={data} />
    </>
  );
};

export default App;
