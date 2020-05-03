import React from "react";
import "./TierInventory.scss";
import PokeImage from "../../PokeImage/PokeImage";

interface Props
{
    id: number;
    pokemon: string[];
    onMouseDown: (id: number, img: HTMLImageElement) => any;
    onMouseMove?: (id: number, e: React.MouseEvent) => any;
    onMouseLeave?: (id: number) => any;
}

export default function TierInventory(props: Props)
{
    function handleMouseMove(e: React.MouseEvent)
    {
        if (props.onMouseMove)
        {
            props.onMouseMove(props.id, e);
        }
    }

    return (
        <div className="tierInventory"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => props.onMouseLeave && props.onMouseLeave(props.id)}
        >
            {props.pokemon.map(p => (
                <PokeImage
                    pokemon={p}
                    onMouseDown={(img) => props.onMouseDown(props.id, img)}
                    key={p}
                />
            ))}
        </div>
    );
}
