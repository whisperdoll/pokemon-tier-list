import React, { useState } from "react";
import "./TierListItem.scss";
import { Tier } from "../TierList";
import TierInventory from "../../TierInventory/TierInventory";

interface Props
{
    id: number;
    tier: Tier;
    onPokeMouseDown: (id: number, img: HTMLImageElement) => any;
    onMouseMove: (id: number, e: React.MouseEvent) => any;
    onMouseLeave: (id: number) => any;
    onEditTier: (id: number, tier: Tier) => any;
    onDelete: (id: number) => any;
}

export default function TierListItem(props: Props)
{
    const [ showingInfo, setShowingInfo ] = useState(false);

    function handleEdit()
    {
        setShowingInfo(true);
    }

    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>)
    {
        props.onEditTier(props.id, {
            ...props.tier,
            name: e.target.value
        });
    }

    function handleColorChange(e: React.ChangeEvent<HTMLInputElement>)
    {
        props.onEditTier(props.id, {
            ...props.tier,
            color: e.target.value
        });
    }

    return (
        <div className="tierListItem">
            <div
                className="info"
                style={{
                    display: showingInfo ? "" : "none"
                }}
            >
                <div>
                    <span>Name:</span>
                    <input
                        type="text"
                        onChange={handleNameChange}
                        value={props.tier.name}
                    />
                </div>
                <div>
                    <span>Color:</span>
                    <input
                        type="text"
                        onChange={handleColorChange}
                        value={props.tier.color}
                    />
                </div>
                <button onClick={() => setShowingInfo(false)}>OK</button>
            </div>
            <div
                className="name"
                style={{
                    backgroundColor: props.tier.color
                }}
            >
                {props.tier.name}
                <button className="edit" onClick={handleEdit}>🖉</button>
                <button className="delete" onClick={() => props.onDelete(props.id)}>🗑</button>
            </div>
            <TierInventory
                onMouseDown={props.onPokeMouseDown}
                onMouseMove={props.onMouseMove}
                onMouseLeave={props.onMouseLeave}
                id={props.id}
                pokemon={props.tier.pokemon}
            />
        </div>
    );
}