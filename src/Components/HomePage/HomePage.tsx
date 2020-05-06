import React, { useState } from "react";
import "./HomePage.scss";
import { GetPokeList, GenArray, PokeListOptions, DefaultOptions } from "../../PokeListFactory";
import TypeArray from "../../data/typearray";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
import { EncodePokeListOptions } from "../../URLEncoderDecoder";
import useHistoryManager from "../../Hooks/useHistoryManager";

interface Props
{
}


export default function HomePage(props: Props)
{
    const [ pushUrl, setUrl ] = useHistoryManager();

    function doRedBlue()
    {
        pushUrl("/tierlist?options=" + EncodePokeListOptions({
            generations: GenArray.map((gen, i) => i === 0),
            types: TypeArray.map(t => true)
        }));
    }

    function doSwordShield()
    {
        pushUrl("/tierlist?options=" + EncodePokeListOptions({
            generations: GenArray.map((gen, i) => i === 7),
            types: TypeArray.map(t => true)
        }));
    }

    function doWaterTypes()
    {
        pushUrl("/tierlist?options=" + EncodePokeListOptions({
            generations: GenArray.map(gen => true),
            types: TypeArray.map((type, i) => type === "water")
        }));
    }

    function doCustom()
    {
        pushUrl("/tierlist?options=" + EncodePokeListOptions(DefaultOptions));
    }

    return (
        <div className="homePage">
            <h1>Rank Pok&eacute;mon!!!</h1>
            <div className="buttons">
                <button onClick={doRedBlue}>Red/Blue</button>
                <button onClick={doSwordShield}>Sword/Shield</button>
                <button onClick={doWaterTypes}>Water Types</button>
                <button onClick={doCustom}>Custom</button>
            </div>
            <div className="footer">
                &copy;2020 Mina Kemp
            </div>
        </div>
    );
}