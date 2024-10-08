// components/Card.js

"use client";
import React from 'react';

const Card = ({ card, onSelect, isSelected }) => {
  const handleClick = () => {
    onSelect(card);
  };

  const borderStyle = isSelected ? '2px solid blue' : '1px solid black';

  // Map color names to actual colors
  const colorMap = {
    Red: '#FF0000',
    Green: '#008000',
    Purple: '#800080',
  };

  // Map shading to fill properties
  const getFill = (shading, color) => {
    switch (shading) {
      case 'Solid':
        return color;
      case 'Striped':
        return `url(#striped-${color})`;
      case 'Open':
        return 'none';
      default:
        return 'none';
    }
  };

  // Render shape based on the card's shape
  const renderShape = (shape, color, shading, index) => {
    const fill = getFill(shading, color);
    const stroke = color;

    switch (shape) {
      case 'Diamond':
        return (
          <polygon
            key={index}
            points="50,15 90,50 50,85 10,50"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
          />
        );
      case 'Squiggle':
        return (
          <path
            key={index}
            d="M20,50 C20,20 80,80 80,50 C80,20 20,80 20,50 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
          />
        );
      case 'Oval':
        return (
          <ellipse
            key={index}
            cx="50"
            cy="50"
            rx="30"
            ry="20"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
          />
        );
      default:
        return null;
    }
  };

  // Generate the patterns for striped shading
  const renderDefs = (color) => (
    <defs>
      <pattern
        id={`striped-${color}`}
        patternUnits="userSpaceOnUse"
        width="4"
        height="4"
      >
        <path d="M0,0 L0,4" stroke={color} strokeWidth="2" />
      </pattern>
    </defs>
  );

  return (
    <div
      onClick={handleClick}
      style={{
        border: borderStyle,
        padding: '10px',
        margin: '5px',
        cursor: 'pointer',
        width: '120px',
        textAlign: 'center',
      }}
    >
      <svg width="100" height="100">
        {renderDefs(colorMap[card.color])}
        {[...Array(card.number)].map((_, index) =>
          renderShape(card.shape, colorMap[card.color], card.shading, index)
        )}
      </svg>
    </div>
  );
};

export default Card;
