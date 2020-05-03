import React, { useState, useEffect, useRef } from "react";
import Pokedex from "../../data/pokedex";
import { PokedexData } from "../../PokeListFactory";

interface Props
{
    pokemon: string;
    onMouseDown?: (img: HTMLImageElement) => any;
}

export default function PokeImage(props: Props)
{
    const [ num, setNum ] = useState(getPokeNum());
    const img = useRef<HTMLImageElement | null>(null);

    function getPokeNum()
    {
        const data = (Pokedex as any)[props.pokemon] as PokedexData;
        if (!data)
        {
            throw "bad pokemon name: " + props.pokemon;
        }

        return data.num;
    }

    function handleMouseDown(e: React.MouseEvent)
    {
        e.preventDefault();
        props.onMouseDown && props.onMouseDown(img.current!);
    }

    useEffect(() =>
    {
        setNum(getPokeNum());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ props.pokemon ]);

    return (
        <img
            src={require("../../sprites/" + num.toString().padStart(4, "0") + ".png")}
            onMouseDown={handleMouseDown}
            ref={img}
            data-pokemon={props.pokemon}
        />
    )
}