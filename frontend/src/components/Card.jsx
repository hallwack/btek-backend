import React from "react";
import "../styles/App.css";

const Card = ({ data }) => {
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

export default Card;
