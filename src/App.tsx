import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import HomePage from './Components/HomePage/HomePage';
import pokedex from "./data/pokedex";
import { PokeListOptions, GetPokeList, DefaultOptions } from './PokeListFactory';
import TierPage from "./Components/TierPage/TierPage";
import { Tier } from './Components/TierPage/TierList/TierList';
import SharePage from './Components/SharePage/SharePage';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function App() {
    const [ pokemon, setPokemon ] = useState([] as string[]);
    const [ title, setTitle ] = useState("TITLE");
    const [ tiers, setTiers ] = useState<Tier[]>([]);
    
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/tierlist">
                        <TierPage
                            pokemon={pokemon}
                            tiers={tiers}
                            title={title}
                            onUpdateTiers={setTiers}
                            onUpdateTitle={setTitle}
                            onUpdatePokemon={setPokemon}
                        />
                    </Route>
                    <Route path="/share">
                        <SharePage
                            tiers={tiers}
                            title={title}
                        />
                    </Route>
                    <Route path="/">
                        <HomePage
                        />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
