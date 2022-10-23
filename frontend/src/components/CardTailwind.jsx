import React from "react";

const CardTailwind = ({ data }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {data.map((data) => {
        return (
          <div
            className="flex flex-col gap-4 px-24 py-4 items-center"
            key={data.id}
          >
            <img
              className="w-full object-cover"
              src={data.image}
              alt={data.name}
            />
            <p className="text-black font-sans">{data.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CardTailwind;
