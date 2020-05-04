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

    useEffect(() =>
    {
        const storedStateString = localStorage.getItem("state");

        if (storedStateString)
        {
            const storedState = JSON.parse(storedStateString) as {
                pokemon: string[],
                title: string,
                tiers: Tier[]
            };

            console.log("retrieving tiers", storedState.tiers);

            setPokemon(storedState.pokemon);
            setTitle(storedState.title);
            setTiers(storedState.tiers);
        }
        else
        {
            setTiers([
                {
                    color: "#FF5555",
                    name: "S",
                    pokemon: []
                },
                {
                    color: "#FF8055",
                    name: "A",
                    pokemon: []
                },
                {
                    color: "#FFFF55",
                    name: "B",
                    pokemon: []
                },
                {
                    color: "#55FF55",
                    name: "C",
                    pokemon: []
                },
                {
                    color: "#5555FF",
                    name: "D",
                    pokemon: []
                },
                {
                    color: "#FF55FF",
                    name: "F",
                    pokemon: []
                }
            ])
        }
    }, []);

    useEffect(() =>
    {
        const state = {
            pokemon,
            title,
            tiers
        };

        console.log("storing tiers", tiers);

        localStorage.setItem("state", JSON.stringify(state));
    }, [ pokemon, title, tiers ]);
    
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
