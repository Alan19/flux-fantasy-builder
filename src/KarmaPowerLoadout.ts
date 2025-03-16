import {KarmaSpecialty, Study} from "./KarmaSpecialty.ts";
import {PowerTier} from "./UsePowerLoadoutSettings.ts";

interface KarmaAttack {
    damage: [number, number, number, number];
    range: [string, string, string, string];
}

interface KarmaUtility {
    effect: [number, number, number, number];
}

export interface SwapPower {
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

export type SwapPowerChoices = { basic: [SwapPower, SwapPower, SwapPower], advanced: [SwapPower, SwapPower, SwapPower], effect?: string };

export type SpecialtyCosts = {
    attackAndDefense: [number, number, number, number];
    combo: [number, number, number, number]
    signature: [number, number, number, number]
};

export const locomotionCosts = [3, 5, 7, 9];
export const locomotionRanges: [number, number, number, number] = [1, 2, 3, 4];

export function getKarmaPowerLoadout(specialty: KarmaSpecialty, study: Study): [SwapPowerChoices, KarmaPowerLoadout] {
    const costs: {
        [specialty in KarmaSpecialty]: {
            attackAndDefense: [number, number, number, number];
            combo: [number, number, number, number]
            signature: [number, number, number, number]
        }
    } = {
        "Escape Artist": {
            attackAndDefense: [5, 7, 15, 30],
            combo: [7, 14, 19, 38],
            signature: [10, 20, 25, 50],
        },
        "Ink Fighter": {
            attackAndDefense: [5, 7, 10, 15],
            combo: [7, 9, 12, 17],
            signature: [10, 13, 16, 21],
        },
        "Special Agent": {
            attackAndDefense: [5, 8, 12, 17],
            combo: [7, 10, 14, 19],
            signature: [10, 14, 18, 22],
        },
        Clockbot: {
            attackAndDefense: [5, 9, 14, 22],
            combo: [7, 11, 17, 25],
            signature: [10, 15, 22, 30],
        }
    }
    const creativeKarmastryEffects: [string?, string?, string?, string?] = [undefined, undefined, "Add +2 to quick action rolls. This ability can stack. Resets when you are attacked.", "Add +5 to quick action rolls. This ability can stack. Resets when you are attacked."]
    const clockworkKarmastryEffects: [string?, string?, string?, string?] = [undefined, undefined, "After each attack, increase its range by 1. Resets after being hit.", "After each attack, increase its range by 2. Resets after being hit."]
    const bioKarmastryEffects: [string?, string?, string?, string?] = [undefined, undefined, "Each attack heal yourself or a teammate for 5 HP (up to cap).", "Each attack heal yourself or a teammate for 8 HP (up to cap)."]
    const machineKarmastryEffects: [string?, string?, string?, string?] = [undefined, undefined, "After each attack, transfer 10 PBP to a nearby Clockbot or 5 to any nearby machine if none are present.", "After each attack, transfer 20 PBP to a nearby Clockbot or 10 to any nearby machine if none are present."]
    const quantumKarmastryEffects: [string?, string?, string?, string?] = [undefined, undefined, "After each attack, transport to the square next to an ally.", "After each attack, transport to the square next to an ally or enemy."]
    const meleeInkFighterEffects: [string?, string?, string?, string?] = ["", "", "Keep your weapon summoned for 1 turn, and attack without using KP.", "Keep your weapon summoned for 2 turns, and attack without using KP."]
    const animalInkFighterEffects: [string?, string?, string?, string?] = ["", "", "Keep your power summoned for 1 turn, and attack without using KP.", "Keep your power summoned for 2 turns, and attack without using KP."]
    const projectileInkFighterEffects: [string?, string?, string?, string?] = ["", "", "Your attack also hits a second enemy for 1/2 damage.", "Your attack also hits two enemies for 1/2 damage."]
    const bodyInkFighterEffects: [string?, string?, string?, string?] = ["", "Each attack heals 3 HP (up to cap).", "Add +2 to your health. This ability can stack. Resets after battle.", "Add +4 to your health. This ability can stack. Resets after battle."]
    const elementalInkFighterEffects: [string?, string?, string?, string?] = ["", "", "Gain +2 KP per attack (up to cap). Stacks but resets when hit.", "Gain +4 KP per attack (up to cap). Stacks but resets when hit."]
    const specialAgentEffects: [string?, string?, string?, string?] = ["", "", "+1 to all attacks per attack made. Stacks each time and resets after battle.", "+2 to all attacks per attack made. Stacks each time and resets after battle."]

    const loadouts: { [study in Study]: KarmaPowerLoadout } = {
        "Creative Karmastry": {
            attack: {damage: [4, 8, 14, 28], range: ["0-2", "0-2", "0-3", "0-3"]},
            defense: {effect: [3, 4, 5, 6]},
            combo: {damage: [5, 10, 16, 32], range: ["1", "1", "1-2", "1-2"]},
            signature: {damage: [6, 12, 18, 36], range: ["1-2", "1-2", "0-2", "0-3"]},
            costs: costs["Escape Artist"],
            effects: creativeKarmastryEffects
        },
        "Clockwork Karmastry": {
            attack: {range: ['1-2', '1-2', '1-3', '1-3'], damage: [4, 8, 14, 28]},
            defense: {effect: [1, 2, 3, 4]},
            combo: {damage: [5, 10, 16, 32], range: ["2", "2", "1-2", "1-2"]},
            signature: {damage: [7, 14, 20, 40], range: ["0-1", "0-1", "0-1", "0-1"]},
            effects: clockworkKarmastryEffects,
            costs: costs["Escape Artist"]
        },
        "Bio Karmastry": {
            attack: {damage: [3, 6, 12, 24], range: ["1-3", "1-3", "1-4", "1-4"]},
            defense: {effect: [4, 5, 6, 7]},
            combo: {damage: [4, 8, 14, 32], range: ["1-2", "1-2", "1-3", "1-3"]},
            signature: {damage: [5, 10, 16, 38], range: ["0-3", "0-3", "0-4", "0-5"]},
            effects: bioKarmastryEffects,
            costs: costs["Escape Artist"]
        },
        "Machine Karmastry": {
            attack: {damage: [3, 6, 12, 24], range: ["3-4", "3-4", "2-4", "2-4"]},
            defense: {effect: [3, 4, 5, 6]},
            combo: {damage: [3, 6, 12, 24], range: ["2-4", "2-4", "1-4", "1-4"]},
            signature: {damage: [4, 8, 16, 32], range: ["0-4", "0-4", "0-5", "0-5"]},
            costs: costs["Escape Artist"],
            effects: machineKarmastryEffects
        },
        "Quantum Karmastry": {
            attack: {damage: [5, 10, 16, 32], range: ["1", "1", "1-2", "1-2"]},
            defense: {effect: [1, 2, 3, 4]},
            combo: {damage: [5, 10, 16, 32], range: ["2", "2", "1-2", "1-2"]},
            signature: {damage: [7, 14, 20, 40], range: ["0", "0", "0-1", "0-1"]},
            costs: costs["Escape Artist"],
            effects: quantumKarmastryEffects
        },
        Melee: {
            attack: {damage: [4, 8, 13, 19], range: ["0-1", "0-2", "0-3", "0-4"]},
            defense: {effect: [2, 3, 4, 5]},
            combo: {damage: [5, 9, 14, 20], range: ["3", "2-3", "0-3", "0-4"]},
            signature: {damage: [6, 10, 15, 21], range: ["2-3", "1-3", "1-4", "1-5"]},
            costs: costs["Ink Fighter"],
            effects: meleeInkFighterEffects
        },
        Projectile: {
            attack: {damage: [3, 7, 12, 18], range: ["3-4", "3-5", "2-5", "2-6"]},
            defense: {effect: [3, 4, 5, 6]},
            combo: {damage: [4, 8, 13, 19], range: ["4", "3-4", "3-5", "3-6"]},
            signature: {damage: [6, 10, 15, 21], range: ["1-5", "1-6", "1-7", "1-8"]},
            costs: costs["Ink Fighter"],
            effects: projectileInkFighterEffects
        },
        Animal: {
            attack: {damage: [4, 8, 13, 19], range: ["2-4", "1-4", "0-4", "0-5"]},
            defense: {effect: [3, 4, 5, 6]},
            combo: {damage: [4, 8, 13, 19], range: ["4", "3-4", "3-5", "2-5"]},
            signature: {damage: [5, 9, 14, 20], range: ["1-5", "1-6", "0-6", "0-7"]},
            costs: costs["Ink Fighter"],
            effects: animalInkFighterEffects
        },
        Body: {
            attack: {damage: [4, 8, 13, 19], range: ["0-2", "0-3", "0-4", "0-5"]},
            defense: {effect: [4, 5, 6, 7]},
            combo: {damage: [4, 8, 13, 19], range: ["0-3", "0-4", "3-5", "2-5"]},
            signature: {damage: [6, 10, 15, 21], range: ["1-2", "1-2", "1-3", "1-3"]},
            costs: costs["Ink Fighter"],
            effects: bodyInkFighterEffects
        },
        Elemental: {
            attack: {damage: [5, 9, 15, 15], range: ["0-1", "0-2", "0-3", "0-4"]},
            defense: {effect: [1, 2, 3, 4]},
            combo: {damage: [5, 9, 15, 15], range: ["0-2", "0-3", "0-4", "0-5"]},
            signature: {damage: [6, 10, 16, 16], range: ["1-4", "1-5", "1-6", "0-6"]},
            costs: costs["Ink Fighter"],
            effects: elementalInkFighterEffects
        },
        Scout: {
            attack: {damage: [4, 7, 11, 16], range: ["2-3", "1-3", "0-3", "0-4"]},
            defense: {effect: [2, 3, 4, 5]},
            combo: {damage: [5, 8, 12, 17], range: ["1-2", "1-3", "1-4", "1-5"]},
            signature: {damage: [4, 7, 11, 16], range: ["0-5", "0-6", "0-7", "0-8"]},
            costs: costs["Special Agent"],
            effects: specialAgentEffects
        },
        Disrupter: {
            attack: {damage: [5, 8, 12, 17], range: ["1-2", "1-3", "1-4", "1-5"]},
            defense: {effect: [2, 3, 4, 5]},
            combo: {damage: [5, 8, 12, 17], range: ["1-4", "0-4", "0-5", "0-6"]},
            signature: {damage: [6, 9, 11, 16], range: ["0-2", "0-3", "0-4", "0-5"]},
            costs: costs["Special Agent"],
            effects: specialAgentEffects
        },
        Bodyguard: {
            attack: {damage: [4, 7, 11, 16], range: ["0-1", "0-2", "0-3", "0-4"]},
            defense: {effect: [4, 5, 6, 7]},
            combo: {damage: [4, 7, 11, 16], range: ["1-3", "1-4", "0-4", "0-5"]},
            signature: {damage: [7, 10, 14, 19], range: ["0-4", "0-5", "0-6", "0-7"]},
            costs: costs["Special Agent"],
            effects: specialAgentEffects

        },
        Operative: {
            attack: {damage: [3, 8, 12, 17], range: ["0-5", "0-6", "0-7", "0-8"]},
            defense: {effect: [2, 3, 4, 5]},
            combo: {damage: [5, 8, 12, 17], range: ["1-2", "1-4", "1-4", "1-5"]},
            signature: {damage: [6, 9, 13, 18], range: ["4-5", "3-5", "3-6", "2-6"]},
            costs: costs["Special Agent"],
            effects: specialAgentEffects
        },
        Tinker: {
            attack: {damage: [4, 7, 12, 17], range: ["0-4", "0-5", "0-6", "0-7"]},
            defense: {effect: [1, 2, 3, 4]},
            combo: {damage: [7, 10, 14, 19], range: ["1-2", "1-3", "1-4", "1-5"]},
            signature: {damage: [6, 9, 13, 18], range: ["3-5", "2-5", "2-6", "1-6"]},
            costs: costs["Special Agent"],
            effects: specialAgentEffects

        },
        Decoy: {
            attack: {damage: [3, 7, 14, 21], range: ["2-3", "2-3", "1-3", "1-3"]},
            defense: {effect: [4, 5, 6, 7]},
            combo: {damage: [4, 8, 16, 23], range: ["0-2", "0-2", "0-3", "0-3"]},
            signature: {damage: [5, 9, 18, 25], range: ["1-3", "1-3", "1-4", "1-4"]},
            costs: costs.Clockbot,
            effects: ["", "", "Create a decoy bot that absorbs 50% of the next incoming damage.", "Create a decoy bot that absorbs 50% of the next incoming damage."]
        },
        "Karmastry-Assist": {
            attack: {damage: [5, 9, 18, 25], range: ["1-2", "1-2", "1-3", "1-3"]},
            defense: {effect: [2, 3, 4, 5]},
            combo: {damage: [5, 8, 16, 23], range: ["0-5", "0-5", "0-6", "0-6"]},
            signature: {damage: [6, 10, 20, 27], range: ["0-1", "0-1", "0-2", "0-2"]},
            costs: costs.Clockbot,
            effects: ["", "", "Reduce KP cost by 1 per attack. Resets at the end of battle.", "Reduce KP cost by 2 per attack. Resets at the end of battle."]
        },
        Medical: {
            attack: {damage: [3, 7, 14, 21], range: ["0-2", "0-2", "0-3", "0-3"]},
            defense: {effect: [5, 6, 7, 8]},
            combo: {damage: [4, 8, 16, 23], range: ["1-2", "1-2", "1-3", "1-3"]},
            signature: {damage: [5, 9, 18, 25], range: ["2-3", "2-3", "1-3", "1-3"]},
            costs: costs.Clockbot,
            effects: bioKarmastryEffects
        },
        Heavy: {
            attack: {damage: [5, 9, 18, 25], range: ["0-1", "0-1", "0-2", "0-2"]},
            defense: {effect: [3, 4, 5, 6]},
            combo: {damage: [5, 9, 18, 25], range: ["1-3", "1-3", "1-4", "1-4"]},
            signature: {damage: [6, 10, 20, 27], range: ["2-4", "2-4", "1-4", "1-4"]},
            costs: costs.Clockbot,
            effects: [undefined, undefined, "Gain +1 DEF for every attack. Stacks until you're hit, then resets.", "Gain +2 DEF for every attack. Stacks until you're hit, then resets."]
        },
        Experimental: {
            attack: {damage: [4, 8, 16, 23], range: ["1-3", "1-3", "1-4", "1-4"]},
            defense: {effect: [1, 2, 3, 4]},
            combo: {damage: [5, 9, 18, 25], range: ["0-1", "0-1", "0-2", "0-2"]},
            signature: {damage: [8, 12, 24, 31], range: ["3-6", "3-6", "2-6", "2-6"]},
            costs: costs.Clockbot,
            effects: ["", "", "Each attack reduces a selected enemy's damage by 1. Stacks until you're hit, then resets.", "Each attack reduces a selected enemy's damage by 2. Stacks until you're hit, then resets."]
        }
    }

    const swapPowers: { [specialty in KarmaSpecialty]: SwapPowerChoices } = {
        [KarmaSpecialty.specialAgent]: {
            basic: [
                {name: "Baton", damage: 4, range: "1-2"},
                {name: "Net Trap", damage: 5, range: "0-1"},
                {name: "Taser", damage: 6, range: "0"}
            ],
            advanced: [
                {name: "Mini Grenade", damage: 8, range: "0-2"},
                {name: "Self Defense", damage: 10, range: "0-1"},
                {name: "Poison Dart", damage: 12, range: "1-3"}
            ],
            effect: "Reduces the Perception Threshold of enemy target by 2."
        },
        [KarmaSpecialty.inkFighter]: {
            basic: [
                {name: "Jab", damage: 5, range: "1"},
                {name: "Round House", damage: 4, range: "3"},
                {name: "Upper Cut", damage: 6, range: "0"}
            ],
            advanced: [
                {name: "Hook", damage: 12, range: "1-2"},
                {name: "Palm Strike", damage: 14, range: "1-3"},
                {name: "Grapple", damage: 15, range: "0"}
            ]
        },
        [KarmaSpecialty.clockbot]: {
            basic: [
                {name: "Pound", damage: 3, range: "1-2"},
                {name: "Metal Fist", damage: 4, range: "0-1"},
                {name: "Shoulder Check", damage: 5, range: "0"}
            ],
            advanced: [
                {name: "Block", damage: 11, range: "0-2"},
                {name: "Windmill Arms", damage: 10, range: "0-3"},
                {name: "Body Slam", damage: 12, range: "0-1"}
            ],
            effect: "+2 damage to humans."
        },
        [KarmaSpecialty.escapeArtist]: {
            basic: [
                {name: "Punch", damage: 3, range: "1"},
                {name: "Running Kick", damage: 2, range: "2"},
                {name: "Bite", damage: 4, range: "0"}
            ],
            advanced: [
                {name: "Torus Smash", damage: 7, range: "0-4"},
                {name: "Backhand", damage: 9, range: "1-2"},
                {name: "Stomp", damage: 10, range: "0-1"}
            ],
            effect: "+5 KP restored"
        }
    }
    return [swapPowers[specialty], loadouts[study]];
}

export function getTierName(powerTier: PowerTier) {
    switch (powerTier) {
        case PowerTier.basic:
            return "Basic"
        case PowerTier.basic2:
            return "Basic Tier 2"
        case PowerTier.advanced:
            return "Advanced"
        case PowerTier.advanced2:
            return "Advanced Tier 2"

    }
}