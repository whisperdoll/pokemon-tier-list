import React from 'react';
import logo from './logo.svg';
import './App.scss';
import HomePage from './Components/HomePage/HomePage';
import pokedex from "./data/pokedex";

function App() {
    return (
        <div className="App">
            <HomePage />
        </div>
    );
}

export default App;
