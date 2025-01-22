import {KarmaSpecialty} from "./KarmaSpecialty.tsx";
import {Study} from "./GetStudies.ts";

interface KarmaAttack {
    damage: number;
    cost?: number;
    range: string;
    effect?: string;
}

interface KarmaUtility {
    cost?: number;
    effect: string;
}

export interface SwapPower {
    name: string;
    damage: number;
    range: string;
    effect?: string;
}

export type KarmaPowerLoadout = {
    basicAttack: KarmaAttack;
    basicDefense: KarmaUtility;
    basicCombo: KarmaAttack;
    basicSignature: KarmaAttack;
    locomotion: KarmaUtility;
}

export type SwapPowerChoices = [SwapPower, SwapPower, SwapPower];

export function getKarmaPowerLoadout(specialty: KarmaSpecialty, study: Study): [SwapPowerChoices, KarmaPowerLoadout] {
    const loadouts: { [study in Study]: KarmaPowerLoadout } = {
        "Clockwork Karmastry": {
            basicAttack: {range: '1-2', damage: 4},
            basicDefense: {effect: "+1 to DEF"},
            basicCombo: {damage: 5, range: "2"},
            basicSignature: {damage: 7, range: "0-1"},
            locomotion: {effect: "+1 to MOV for that turn"}
        },
        "Creative Karmastry": {
            basicAttack: {damage: 4, range: "0-2"},
            basicDefense: {effect: "+3 to DEF"},
            basicCombo: {damage: 5, range: "1"},
            basicSignature: {damage: 6, range: "1-2"},
            locomotion: {effect: "+1 to MOV for that turn"},
        },
        "Karmastry-Assist": {
            basicAttack: {damage: 5, range: "1-2"},
            basicDefense: {effect: "+2 to DEF"},
            basicCombo: {damage: 5, range: "0-5"},
            basicSignature: {damage: 6, range: "0-1"},
            locomotion: {effect: "+1 to MOV for that turn"}
        },
        "Machine Karmastry": {
            basicAttack: {damage: 3, range: "3-4"},
            basicDefense: {effect: "+3 to DEF"},
            basicCombo: {damage: 3, range: "2-4"},
            locomotion: {effect: "+1 to MOV for that turn"},
            basicSignature: {damage: 4, range: "0-4"}
        },
        "Quantum Karmastry": {
            basicAttack: {damage: 5, range: "1"},
            basicDefense: {effect: "+1 to DEF"},
            basicCombo: {damage: 5, range: "2"},
            basicSignature: {damage: 7, range: "0"},
            locomotion: {effect: "+1 to MOV for that turn"},
        },
        "Bio Karmastry": {
            basicAttack: {damage: 3, range: "1-3"},
            basicCombo: {range: "1-2", damage: 4},
            basicDefense: {effect: "+4 to DEF"},
            basicSignature: {damage: 5, range: "0-3"},
            locomotion: {effect: "+1 to MOV for that turn"}
        },
        Animal: {
            basicAttack: {damage: 4, range: "2-4"},
            basicDefense: {effect: "+3 to DEF"},
            basicCombo: {damage: 4, range: "4"},
            basicSignature: {damage: 5, range: "1-5"},
            locomotion: {effect: "+1 to MOV for that turn"}
        },
        Body: {
            basicAttack: {damage: 4, range: "0-2"},
            basicDefense: {effect: "+4 to DEF"},
            basicCombo: {damage: 4, range: "0-3"},
            basicSignature: {damage: 6, range: "1-2"},
            locomotion: {effect: "+1 to MOV for that turn"}
        },
        Bodyguard: {
            basicAttack: {damage: 4, range: "0-1"},
            basicDefense: {effect: "+4 to DEF"},
            basicCombo: {damage: 4, range: "1-3"},
            basicSignature: {damage: 7, range: "0-4"},
            locomotion: {effect: "+1 to MOV for that turn"}
        },
        Decoy: {
            basicAttack: {damage: 3, range: "2-3"},
            basicDefense: {effect: "+4 to DEF"},
            basicCombo: {damage: 4, range: "0-2"},
            basicSignature: {damage: 5, range: "1-3"},
            locomotion: {effect: "+1 to MOV for that turn"}
        },
        Disrupter: {
            basicAttack: {damage: 5, range: "1-2"},
            basicDefense: {effect: "+2 to DEF"},
            basicCombo: {damage: 5, range: "1-4"},
            basicSignature: {damage: 6, range: "0-2"},
            locomotion: {effect: "+1 to MOV for that turn"}
        },
        Elemental: {
            basicAttack: {damage: 5, range: "0-1"},
            basicDefense: {effect: "+1 to DEF"},
            basicCombo: {damage: 5, range: "0-2"},
            basicSignature: {damage: 6, range: "1-4"},
            locomotion: {effect: "+1 to MOV for that turn"}
        },
        Experimental: {
            basicAttack: {damage: 4, range: "1-3"},
            basicDefense: {effect: "+1 to DEF"},
            basicCombo: {damage: 5, range: "0-1"},
            basicSignature: {damage: 8, range: "3-6"},
            locomotion: {effect: "+1 to MOV for that turn"}
        },
        Heavy: {
            basicAttack: {damage: 5, range: "0-1"},
            basicDefense: {effect: "+3 to DEF"},
            basicCombo: {damage: 5, range: "1-3"},
            basicSignature: {damage: 6, range: "2-4"},
            locomotion: {effect: "+1 to MOV for that turn"}
        },
        Medical: {
            basicAttack: {damage: 3, range: "0-2"},
            basicDefense: {effect: "+5 to DEF"},
            basicCombo: {damage: 4, range: "1-2"},
            basicSignature: {damage: 5, range: "2-3"},
            locomotion: {effect: "+1 to MOV for that turn"}
        },
        Melee: {
            basicAttack: {damage: 4, range: "0-1"},
            basicDefense: {effect: "+2 to DEF"},
            basicCombo: {damage: 5, range: "3"},
            basicSignature: {damage: 6, range: "2-3"},
            locomotion: {effect: "+1 to MOV for that turn"}
        },
        Operative: {
            basicAttack: {damage: 3, range: "0-5"},
            basicDefense: {effect: "+2 to DEF"},
            basicCombo: {damage: 5, range: "1-2"},
            basicSignature: {damage: 6, range: "4-5"},
            locomotion: {effect: "+1 to MOV for that turn"}
        },
        Projectile: {
            basicAttack: {damage: 3, range: "3-4"},
            basicDefense: {effect: "+3 to DEF"},
            basicCombo: {damage: 4, range: "4"},
            basicSignature: {damage: 6, range: "1-5"},
            locomotion: {effect: "+1 to MOV for that turn"}
        },
        Scout: {
            basicAttack: {damage: 4, range: "2-3"},
            basicDefense: {effect: "+2 to DEF"},
            basicCombo: {damage: 5, range: "1-2"},
            basicSignature: {damage: 4, range: "0-5"},
            locomotion: {effect: "+1 to MOV for that turn"}
        },
        Tinker: {
            basicAttack: {damage: 4, range: "0-4"},
            basicDefense: {effect: "+1 to DEF"},
            basicCombo: {damage: 7, range: "1-2"},
            basicSignature: {damage: 6, range: "3-5"},
            locomotion: {effect: "+1 to MOV for that turn"}
        }
    }

    const swapPowers: { [specialty in KarmaSpecialty]: SwapPowerChoices } = {
        [KarmaSpecialty.specialAgent]: [
            {name: "Baton", damage: 4, range: "1-2"},
            {name: "Self Defense", damage: 5, range: "0-1"},
            {name: "Taser", damage: 6, range: "0"}
        ],
        [KarmaSpecialty.clockbot]: [
            {name: "Pound", damage: 3, range: "1-2"},
            {name: "Metal Fist", damage: 4, range: "0-1"},
            {name: "Shoulder Check", damage: 5, range: "0"}
        ],
        [KarmaSpecialty.inkFighter]: [
            {name: "Hook", damage: 5, range: "1"},
            {name: "Round House", damage: 4, range: "3"},
            {name: "Upper Cut", damage: 6, range: "0"}
        ],
        [KarmaSpecialty.escapeArtist]: [
            {name: "Punch", damage: 3, range: "1"},
            {name: "Running Kick", damage: 2, range: "2"},
            {name: "Bite", damage: 4, range: "1"}
        ]
    }
    return [swapPowers[specialty], loadouts[study]];
}