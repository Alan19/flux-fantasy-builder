export type KarmaLoadout = {
    specialty: "Escape Artist";
    study: "Creative Karmastry" | "Clockwork Karmastry" | "Bio Karmastry" | "Machine Karmastry" | "Quantum Karmastry"
} | {
    specialty: "Special Agent";
    study: "Scout" | "Disrupter" | "Bodyguard" | "Operative" | "Tinker";
}

export type playerStats = {
    playerName: string;
    characterName: string;
    karmaChoice: KarmaLoadout;
    age: number | string;
    gender: string;
    height: string;
    weight: string;
    level: number;
    baseTalent: {
        aura: number;
        technique: number;
        stamina: number;
        function: number;
        willpower: number;
        agility: number;
    };
    merits: number;
    medKits: number;
    medKitPercent: number;
    swapPowers: {
        name: string;
        damage: number;
        range: number;
    }[]
}