import Pokedex from "./data/pokedex";
import { PokedexData, PokeListOptions, DefaultOptions } from "./PokeListFactory";
import { Tier } from "./Components/TierPage/TierList/TierList";

function getPokeNum(pokemon: string)
{
    const data = (Pokedex as any)[pokemon] as PokedexData;
    if (!data)
    {
        throw "bad pokemon name: " + pokemon;
    }

    return data.num;
}

// export function EncodePokemon(pokemon: string[])
// {
//     const charArray = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//     return pokemon.map((p) =>
//     {
//         const num = getPokeNum(p);
//         const first = ~~(num / charArray.length);
//         const second = num % charArray.length;

//         return charArray[first] + charArray[second];
//     });
// }

// export function EncodeTier(tier: Tier)
// {

// }

export function EncodePokeListOptions(options: PokeListOptions): string
{
    const ver = "001";
    const gens = options.generations.map(g => +g).join("");
    const types = options.types.map(t => +t).join("");
    return ver + gens + "2" + types;
}

export function DecodePokeListOptions(urlParam: string): PokeListOptions
{
    const version = urlParam.substr(0, 3);
    urlParam = urlParam.substr(3);
    
    if (version === "001")
    {
        return {
            generations: urlParam.substr(0, urlParam.indexOf("2")).split("").map(g => g === "1"),
            types: urlParam.substr(urlParam.indexOf("2") + 1).split("").map(t => t === "1")
        };
    }
    else
    {
        return DefaultOptions;
    }
}