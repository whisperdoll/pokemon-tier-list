import React, { useState, useEffect, useRef } from "react";
import "./TierPage.scss";
import TierList, { Tier } from "./TierList/TierList";
import TierInventory from "./TierInventory/TierInventory";
import { PokeListOptions, DefaultOptions, GetPokeList } from "../../PokeListFactory";
import OptionsView from "./OptionsView/OptionsView";
import { useHistory, useLocation } from "react-router-dom";
import { EncodePokeListOptions, DecodePokeListOptions } from "../../URLEncoderDecoder";
import useQuery from "../../Hooks/useQuery";

interface Props
{
    pokemon: string[];
    tiers: Tier[];
    title: string;
    onUpdateTiers: (tiers: Tier[]) => any;
    onUpdateTitle: (title: string) => any;
    onUpdatePokemon: (pokemon: string[]) => any;
}

export default function TierPage(props: Props)
{
    const [ inventory, setInventory ] = useState([] as string[]);
    const [ dragTarget, setDragTarget ] = useState(-1);
    const [ dragSource, setDragSource ] = useState(-1);
    const [ options, setOptions ] = useState<PokeListOptions>(DefaultOptions);
    const [ showingOptions, setShowingOptions ] = useState(true);

    const history = useHistory();
    const query = useQuery();

    const isMouseDown = useRef(false);
    const movingImg = useRef<HTMLImageElement | null>(null);

    function handleMouseDown(id: number, img: HTMLImageElement)
    {
        setDragSource(id);
        isMouseDown.current = true;
        movingImg.current = img;
    }

    function handleTierItemMouseMove(id: number, e: React.MouseEvent)
    {
        setDragTarget(id);
    }

    function handleTierItemMouseLeave(id: number)
    {
        if (dragTarget === id)
        {
            setDragTarget(-1);
        }
    }

    function handleAddTier()
    {
        const newTier = {
            name: "?",
            color: "#FFFF00",
            pokemon: []
        } as Tier;

        props.onUpdateTiers(props.tiers.concat([ newTier ]));
    }

    function handleDeleteTier(id: number)
    {
        const t = props.tiers.slice();
        const pokemon = t.splice(id, 1)[0].pokemon;
        props.onUpdateTiers(t);
        setInventory(inventory.concat(pokemon));
    }

    function handleEditTitle()
    {
        const _title = prompt("Enter title:");

        if (_title !== null)
        {
            props.onUpdateTitle(_title);
        }
    }

    function handleEditTier(id: number, tier: Tier)
    {
        const t = props.tiers.slice();
        t[id] = tier;
        props.onUpdateTiers(t);
    }

    // onmount //
    useEffect(() =>
    {
        document.onmousemove = (e) =>
        {
            if (movingImg.current && isMouseDown.current)
            {
                movingImg.current.style.position = "fixed";
                movingImg.current.style.left = (e.clientX - 48) + "px";
                movingImg.current.style.top = (e.clientY - 48) + "px";
                movingImg.current.style.pointerEvents = "none";
            }
        };

        document.onmouseup = (e) =>
        {
            if (movingImg.current)
            {
                movingImg.current.style.position = "";
                movingImg.current.style.left = "";
                movingImg.current.style.top = "";
                movingImg.current.style.pointerEvents = "";

                if (dragSource !== dragTarget)
                {
                    const ps = (dragSource === -1 ? inventory : props.tiers[dragSource].pokemon).slice();
                    const pt = (dragTarget === -1 ? inventory : props.tiers[dragTarget].pokemon).slice();

                    pt.push(ps.splice(ps.indexOf(movingImg.current.dataset.pokemon!), 1)[0]);

                    let t = props.tiers.slice();

                    if (dragSource === -1)
                    {
                        setInventory(ps);
                    }
                    else
                    {
                        t[dragSource] = {
                            ...t[dragSource],
                            pokemon: ps
                        };
                    }

                    if (dragTarget === -1)
                    {
                        setInventory(pt);
                    }
                    else
                    {
                        t[dragTarget] = {
                            ...t[dragTarget],
                            pokemon: pt
                        };
                    }

                    props.onUpdateTiers(t);
                }
            }

            isMouseDown.current = false;
            movingImg.current = null;
        };
    }, [dragTarget, dragSource]);
    
    useEffect(() =>
    {
        props.onUpdateTiers(props.tiers.map(tier => ({
            ...tier,
            pokemon: []
        })));
        props.onUpdatePokemon(GetPokeList(options));
    }, [ options ]);

    useEffect(() =>
    {
        setInventory(props.pokemon);
    }, [props.pokemon]);

    useEffect(() =>
    {
        setOptions(DecodePokeListOptions(query.get("options") || "000"));
        return history.listen((location, action) =>
        {
            setOptions(DecodePokeListOptions(new URLSearchParams(location.search).get("options") || "000"));
        });
    }, []);

    function handleSave()
    {
        history.push("/share");
    }

    function handleUpdateOptions(options: PokeListOptions)
    {
        history.replace("/tierlist?options=" + EncodePokeListOptions(options));
    }

    return (
        <div className="tierPage">
            <div className="tierPageGroup">
                <div className="header">
                    <h1>{props.title}</h1>
                    <button className="edit" onClick={handleEditTitle}>🖉</button>
                    <button className="save" onClick={handleSave}>Save and Share</button>
                    <button className="toggleOptions" onClick={() => setShowingOptions(!showingOptions)}>
                        {showingOptions ? "Hide Options" : "Show Options"}
                    </button>
                </div>
                <TierList
                    onPokeMouseDown={handleMouseDown}
                    onMouseMove={handleTierItemMouseMove}
                    onMouseLeave={handleTierItemMouseLeave}
                    onEditTier={handleEditTier}
                    onAddTier={handleAddTier}
                    onDeleteTier={handleDeleteTier}
                    tiers={props.tiers}
                />
                <TierInventory
                    pokemon={inventory}
                    onMouseDown={handleMouseDown}
                    id={-1}
                />
            </div>
            {showingOptions &&
                <OptionsView
                    onUpdateOptions={handleUpdateOptions}
                    options={options}
                />
            }
        </div>
    )
}