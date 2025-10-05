export interface PokemonData {
    name: string;
    id: number;
    sprites: {
        front_default: string;
    };
    types: PokemonType[];
}

export interface PokemonListItem {
    name: string;
    url: string;
}

export interface PokemonType {
    type: {
        name: string;
        url: string;
    };
}