import React, { useState, useRef } from "react";
import "./TierList.scss";
import TierListItem from "./TierListItem/TierListItem";

export interface Tier
{
    name: string;
    color: string;
    pokemon: string[];
}

interface Props
{
    tiers: Tier[];
    onPokeMouseDown: (id: number, img: HTMLImageElement) => any;
    onMouseMove: (id: number, e: React.MouseEvent) => any;
    onMouseLeave: (id: number) => any;
    onAddTier: () => any;
    onEditTier: (id: number, tier: Tier) => any;
    onDeleteTier: (id: number) => any;
    onMoveTierUp: (id: number) => any;
    onMoveTierDown: (id: number) => any;
}

export default function TierList(props: Props)
{
    return (
        <div className="tierList">
            {props.tiers.map((tier, i) =>
            (
                <TierListItem
                    onPokeMouseDown={props.onPokeMouseDown}
                    onMouseMove={props.onMouseMove}
                    onMouseLeave={props.onMouseLeave}
                    onEditTier={props.onEditTier}
                    onDelete={props.onDeleteTier}
                    tier={tier}
                    key={i}
                    id={i}
                    onMoveUp={props.onMoveTierUp}
                    onMoveDown={props.onMoveTierDown}
                />
            ))}
            <button onClick={props.onAddTier}>+ Add Tier</button>
        </div>
    );
}