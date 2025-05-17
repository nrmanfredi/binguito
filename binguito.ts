// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// src/App.jsx
import React, { useState } from 'react';
import songs from './songs';

const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);
const getBingoGrid = (songs) => {
  const selected = shuffle(songs).slice(0, 25);
  return Array.from({ length: 5 }, (_, i) => selected.slice(i * 5, i * 5 + 5));
};

const App = () => {
  const [grid, setGrid] = useState(getBingoGrid(songs));
  const [marked, setMarked] = useState(new Set());

  const toggleCell = (song) => {
    const newSet = new Set(marked);
    newSet.has(song) ? newSet.delete(song) : newSet.add(song);
    setMarked(newSet);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">🎵 Bingo Musical</h1>
      <div className="grid grid-cols-5 gap-2">
        {grid.flat().map((song, idx) => (
          <div
            key={idx}
            onClick={() => toggleCell(song)}
            className={`p-2 text-sm rounded-xl cursor-pointer text-center transition-all duration-200
              ${marked.has(song) ? 'bg-green-500 text-black' : 'bg-gray-800 hover:bg-gray-700'}`}
          >
            {song}
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          setGrid(getBingoGrid(songs));
          setMarked(new Set());
        }}
        className="mt-6 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-xl text-white"
      >
        🔄 Nueva Tarjeta
      </button>
    </div>
  );
};

export default App;

// src/songs.js
const songs = [
  "Mi Persona Favorita",
  "Rayando el Sol",
  "Oye Cómo Va",
  "Colgando en tus manos",
  "La Bicicleta",
  "Livin' la Vida Loca",
  "Bailando",
  "Corazón Espinado",
  "Color Esperanza",
  "Eres",
  "Limón y Sal",
  "Andar Conmigo",
  "Lento",
  "Me Gustas Tú",
  "La Camisa Negra",
  "Obsesión",
  "Devuélveme a Mi Chica",
  "La Flaca",
  "A Dios le Pido",
  "Me Enamora",
  "Cuando Me Enamoro",
  "Tabaco y Chanel",
  "Universos Paralelos",
  "Llorar",
  "Nada Valgo Sin Tu Amor"
];

export default songs;

// src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: system-ui, sans-serif;
}
