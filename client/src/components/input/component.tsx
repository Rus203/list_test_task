// import { useState } from "react";

import "./styles.scss";

type IProp = { handleSearch: (phrase: string ) => void };

export const Input = ({ handleSearch }: IProp) => {
  const handleChange = (input: string) => {
      handleSearch(input);

  };

  return (
    <div className="container">
      <input
        className="input"
        type="text"
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
