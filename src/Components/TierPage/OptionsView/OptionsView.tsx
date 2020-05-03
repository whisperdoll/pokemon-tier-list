import React, { useState, useEffect } from "react";
import { PokeListOptions, GenArray } from "../../../PokeListFactory";
import TypeArray from "../../../data/typearray";

interface Props
{
    options: PokeListOptions;
    onUpdateOptions: (options: PokeListOptions) => any;
}

export default function OptionsView(props: Props)
{
    const [ options, setOptions ] = useState(props.options);

    useEffect(() =>
    {
        setOptions(props.options);
    }, [ props.options ]);

    function toggleGen(index: number)
    {
        const newTypes = options.generations.slice();
        newTypes[index] = !newTypes[index];

        const newOptions = {
            ...options,
            generations: newTypes
        } as PokeListOptions;

        setOptions(newOptions);
    }

    function toggleType(index: number)
    {
        const newTypes = options.types.slice();
        newTypes[index] = !newTypes[index];

        const newOptions = {
            ...options,
            types: newTypes
        } as PokeListOptions;

        setOptions(newOptions);
    }

    function handleSave()
    {
        props.onUpdateOptions(options);
    }

    return (
        <div className="optionsView">
            <h1 className="header">Options</h1>
            {
                GenArray.map((gen, i) => (
                    <label key={gen}>
                        <input
                            type="checkbox"
                            checked={options.generations[i]}
                            onChange={() => toggleGen(i)}
                        />
                        {"Gen " + gen}
                    </label>
                ))
            }
            {
                TypeArray.map((type, i) => (
                    <label key={type}>
                        <input
                            type="checkbox"
                            checked={options.types[i]}
                            onChange={() => toggleType(i)}
                        />
                        {type[0].toUpperCase() + type.substr(1) + " types"}
                    </label>
                ))
            }
            <button
                className="save"
                onClick={handleSave}
            >
                OK
            </button>
        </div>
    );
}