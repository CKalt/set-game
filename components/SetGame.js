// components/SetGame.js

"use client";
import React, { useState, useEffect } from 'react';
import Card from './Card';

const shapes = ['Diamond', 'Squiggle', 'Oval'];
const colors = ['Red', 'Green', 'Purple'];
const numbers = [1, 2, 3];
const shadings = ['Solid', 'Striped', 'Open'];

const generateDeck = () => {
  const deck = [];
  shapes.forEach((shape) => {
    colors.forEach((color) => {
      numbers.forEach((number) => {
        shadings.forEach((shading) => {
          deck.push({ shape, color, number, shading });
        });
      });
    });
  });
  return deck;
};

const isSet = (cards) => {
  const features = ['shape', 'color', 'number', 'shading'];
  return features.every((feature) => {
    const values = cards.map((card) => card[feature]);
    const uniqueValues = new Set(values).size;
    return uniqueValues === 1 || uniqueValues === 3;
  });
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const SetGame = () => {
  const [deck, setDeck] = useState([]);
  const [cardsOnTable, setCardsOnTable] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const newDeck = generateDeck();
    shuffle(newDeck);
    setDeck(newDeck);
    setCardsOnTable(newDeck.slice(0, 12));
  }, []);

  const handleSelect = (card) => {
    let newSelectedCards = [...selectedCards];
    if (newSelectedCards.includes(card)) {
      newSelectedCards = newSelectedCards.filter((c) => c !== card);
    } else {
      newSelectedCards.push(card);
    }
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 3) {
      if (isSet(newSelectedCards)) {
        setMessage('You found a set!');
        // Remove the set from the table and add new cards from the deck
        const remainingDeck = deck.slice(cardsOnTable.length);
        const newCardsOnTable = cardsOnTable.map((c) =>
          newSelectedCards.includes(c) ? remainingDeck.shift() || null : c
        ).filter(c => c !== null);
        setCardsOnTable(newCardsOnTable);
      } else {
        setMessage('Not a set. Try again.');
      }
      setSelectedCards([]);
    } else {
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Set Game</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '650px' }}>
        {cardsOnTable.map((card, index) => (
          <Card
            key={index}
            card={card}
            onSelect={handleSelect}
            isSelected={selectedCards.includes(card)}
          />
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>{message}</div>
    </div>
  );
};

export default SetGame;
