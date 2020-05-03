import Pokedex from "./data/pokedex";
import TypeArray from "./data/typearray";

export const GenArray = [ "I", "II", "III", "IV", "V", "VI", "VII", "VIII" ];
export const GenCutoffs = [
    0,
    151,
    251,
    386,
    493,
    649,
    721,
    809,
    890
];

export interface PokedexData
{
    num: number;
    species: string;
    types: string[];
    baseStats: {
        hp: number;
        atk: number;
        def: number;
        spa: number;
        spd: number;
        spe: number;
    };
    abilities: {[index: string]: string}
    gender?: any;
    heightm: number;
    weightkg: number;
    color: string;
    evos?: string[]
    baseSpecies?: string;
    forme?: string;
    baseForme?: string;
    otherFormes?: string[];
    inheritsFrom?: string;
};

export interface PokeListOptions
{
    generations: boolean[];
    types: boolean[];
}

export const DefaultOptions: PokeListOptions = Object.seal({
    generations: GenArray.map(gen => true),
    types: TypeArray.map(type => true)
});

/**
 * 
 * @param num Poke num
 * @param gen 0-based gen
 */
function PokeBelongsToGen(num: number, gen: number)
{
    return num > GenCutoffs[gen] && num <= GenCutoffs[gen + 1];
}

function TestPoke(data: PokedexData, options?: PokeListOptions): boolean
{
    if (!options) return false;
    if (data.num < 0 || data.num > GenCutoffs[GenCutoffs.length - 1]) return false;
    
    // test gens //
    for (let i = 0; i < GenArray.length; i++)
    {
        if (!options.generations[i] && PokeBelongsToGen(data.num, i))
        {
            return false;
        }
    }

    // test types //
    const optionsTypes: string[] = TypeArray.filter((type, i) => options.types[i]);
    if (!data.types.some((type) =>
    {
        type = type.toLowerCase().split("").filter(c => "abcdefghijklmnopqrstuvwxyz0123456789".includes(c)).join("");
        return optionsTypes.includes(type);
    }))
    {
        return false;
    }
    
    return true;
}

export function GetPokeList(options?: PokeListOptions): string[]
{
    const ret: string[] = [];

    for (const pokemon in Pokedex)
    {
        if (pokemon === "missingno") continue;
        
        const data = (Pokedex as any)[pokemon] as PokedexData;
        const isBase = !data.baseSpecies && !data.baseForme;

        if (isBase && TestPoke(data, options))
        {
            ret.push(pokemon);
        }
    }

    return ret;
}

// export function FindPokemon(property: string, searchValue: any): PokedexData | null
// {
//     for (const pokemon in Pokedex)
//     {
//         const data = (Pokedex as any)[pokemon];
//         if (data[property] === searchValue)
//         {
//             return data as PokedexData;
//         }
//     }

//     return null;
// }

// export function PokemonFromNum(num: number): PokedexData | null
// {
//     return FindPokemon("num", num);
// }