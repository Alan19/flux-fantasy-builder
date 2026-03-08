interface KarmaAttack {
    damage: [number, number, number, number];
    range: [string, string, string, string];
}

interface KarmaUtility {
    effect: [number, number, number, number];
}

export interface SwapPowerData {
    effect?: string;
    name: string;
    damage: number;
    range: string;
}

export type KarmaPowerSet = {
    attack: KarmaAttack;
    defense: KarmaUtility;
    combo: KarmaAttack;
    signature: KarmaAttack;
}

export interface KarmaPowerLoadout extends KarmaPowerSet {
    costs: SpecialtyCosts;
    effects: [string?, string?, string?, string?];
}

export type SwapPowerOptions = { setup: [SwapPowerData, SwapPowerData, SwapPowerData], advanced: [SwapPowerData, SwapPowerData, SwapPowerData] };

export type SpecialtyCosts = {
    attackAndDefense: [number, number, number, number];
    combo: [number, number, number, number]
    signature: [number, number, number, number]
};

export const locomotionCosts: [number, number, number, number] = [3, 5, 7, 9];
export const locomotionRanges: [number, number, number, number] = [1, 2, 3, 4];

