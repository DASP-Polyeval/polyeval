import React, { useState } from "react";
import "./Rating.css";

const Rating = ({ totalStars = 5, onRatingSubmit }) => {
  const [hovered, setHovered] = useState(0); // Tracks the star hovered over
  const [selected, setSelected] = useState(0); // Tracks the user's selected rating

  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(0);
  };

  const handleClick = (index) => {
    setSelected(index);
    if (onRatingSubmit) {
      onRatingSubmit(index); // Send the rating back to the parent component
    }
  };

  return (
    <div className="rating-container">
      {Array.from({ length: totalStars }, (_, index) => (
        <span
          key={index}
          className={`star ${hovered > index || selected > index ? "filled" : ""}`}
          onMouseEnter={() => handleMouseEnter(index + 1)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index + 1)}
        >
          ★
        </span>
      ))}
      {/* <p> {selected}</p> */}
    </div>
  );
};

export default Rating;
