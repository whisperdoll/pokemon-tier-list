import React, { useState, useEffect, useRef } from "react";
import "./SharePage.scss";
import { Tier } from "../TierPage/TierList/TierList";
import { Canvas } from "../../utils/canvas";
import Point from "../../utils/point";
import Rectangle from "../../utils/rectangle";
import Pokedex from "../../data/pokedex";
import { PokedexData } from "../../PokeListFactory";

interface Props
{
    title: string;
    tiers: Tier[];
}

export default function SharePage(props: Props)
{
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const saveRef = useRef<HTMLAnchorElement | null>(null);
    
    useEffect(() =>
    {
        if (props.tiers.length === 0)
        {
            return;
        }

        function getPokeNum(pokemon: string)
        {
            const data = (Pokedex as any)[pokemon] as PokedexData;
            if (!data)
            {
                throw "bad pokemon name: " + pokemon;
            }
    
            return data.num;
        }

        if (canvasRef.current)
        {
            const borderHeight = 1;
            const tierHeight = 96;
            const pokemonPerRow = 9;
            const width = tierHeight * (pokemonPerRow + 1);
            const borderColor = "#555";
            const xPadding = 24;
            const yPadding = 16;

            const tierHeights = props.tiers.map(tier => Math.max(1, Math.ceil(tier.pokemon.length / pokemonPerRow)) * tierHeight);

            // cuz im evil .. //
            const refCanvas = new Canvas({
                canvasElement: canvasRef.current
            });
            
            const canvas = new Canvas({
                size: new Point(width, tierHeights.reduce((l, r) => l + r))
            });
    
            let runningY = 0;

            const drawOnActualCanvas = () =>
            {
                refCanvas.resize(new Point(width + xPadding * 2, canvas.height + yPadding * 2 + 64), false);
                refCanvas.clear();
                refCanvas.fill("#223");
                refCanvas.fillText(
                    props.title,
                    new Point(refCanvas.width / 2, yPadding + 12),
                    "#fafafa",
                    "top",
                    "center",
                    "bold 32px " + getComputedStyle(document.body).fontFamily
                );
                refCanvas.drawRect(
                    new Rectangle(new Point(xPadding - 2, yPadding + 64 - 2), canvas.size.plus(new Point(3, 2))),
                    borderColor,
                    3,
                    true
                );
                refCanvas.drawImage(canvas, new Point(xPadding, yPadding + 64));
                refCanvas.drawRect(new Rectangle(new Point(1, 1), refCanvas.size.minus(3)), borderColor, 3, true);
            };

            let pokeCounter = 0;
            const pokeGoal = props.tiers.map(t => t.pokemon.length).reduce((l, r) => l + r);

            canvas.fill("#181824");

            props.tiers.forEach((tier, i) =>
            {
                canvas.fillRect(new Rectangle(new Point(0, runningY), new Point(tierHeight, tierHeights[i])), tier.color);
                canvas.fillText(
                    tier.name,
                    new Point(tierHeight / 2, runningY + tierHeights[i] / 2 + 4),
                    "#111",
                    "middle",
                    "center",
                    "bold 48px " + getComputedStyle(document.body).fontFamily
                );

                tier.pokemon.forEach((p, j) =>
                {
                    const _runningY = runningY;
                    const img = new Image();
                    img.onload = () =>
                    {
                        canvas.drawImage(img, new Rectangle(
                            new Point(tierHeight + tierHeight * (j % pokemonPerRow), _runningY + tierHeight * ~~(j / pokemonPerRow)),
                            new Point(tierHeight, tierHeight)
                        ));

                        pokeCounter++;
                        if (pokeCounter === pokeGoal)
                        {
                            drawOnActualCanvas();
                        }
                    };
                    img.src = require("../../sprites/" + getPokeNum(p).toString().padStart(4, "0") + ".png");
                    console.log(img);
                });
                
                runningY += tierHeights[i];
                canvas.drawLine(new Point(0, runningY - 0.5), new Point(width, runningY - 0.5), borderColor, 1);
            });
        }
    }, [ props.title, props.tiers ]);

    useEffect(() =>
    {
        (window as any).twttr.widgets.load();
    }, []);

    function handleSave()
    {
        saveRef.current!.href = canvasRef.current!.toDataURL();
    }

    return (
        <div className="sharePage">
            {
                props.tiers.length > 0 ? (<React.Fragment>
                    <div>
                        <canvas ref={canvasRef} ></canvas>
                    </div>
                    <div className="saveAndShareGroup">
                        <a
                            onClick={handleSave}
                            ref={saveRef}
                            download={props.title + ".png"}
                        >
                            Save as PNG
                        </a>
                        <div className="shareGroup">
                            <span>Share: </span>
                            <a
                                href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                                className="twitter-share-button"
                                data-text="I made a Tier List using Pokemon Tier List Maker! Check it out:"
                                data-show-count="false"
                            >
                                Tweet
                            </a>
                        </div>
                    </div>
                </React.Fragment>) : (<React.Fragment>
                    <div>
                        Nothing to share...
                    </div>
                </React.Fragment>)
            }
        </div>
    );
}