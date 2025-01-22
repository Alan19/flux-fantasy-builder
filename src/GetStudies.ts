import {KarmaSpecialty} from "./KarmaSpecialty.tsx";
import {Affiliation} from "./CharacterSheet.tsx";

export enum EscapeArtistStudies {creativeKarmastry = 'Creative Karmastry', clockworkKarmastry = 'Clockwork Karmastry', bioKarmastry = 'Bio Karmastry', machineKarmastry = 'Machine Karmastry', quantumKarmastry = 'Quantum Karmastry'}
export enum InkFighterStudies {melee = 'Melee', projectile = 'Projectile', animal = 'Animal', body = 'Body', elemental = 'Elemental'}
export enum SpecialAgentStudies {scout = 'Scout', disrupter = 'Disrupter', bodyguard = 'Bodyguard', operative = 'Operative', tinker = 'Tinker'}
export enum ClockbotStudies {decoy = 'Decoy', karmastryAssist = 'Karmastry-Assist', medical = 'Medical', heavy = 'Heavy', experimental = 'Experimental'}

export type Study = EscapeArtistStudies | InkFighterStudies | SpecialAgentStudies | ClockbotStudies;

export function getStudies(karmaSpecialty: KarmaSpecialty | undefined) {
    switch (karmaSpecialty) {
        case KarmaSpecialty.clockbot:
            return ClockbotStudies;
        case KarmaSpecialty.escapeArtist:
            return EscapeArtistStudies;
        case KarmaSpecialty.inkFighter:
            return InkFighterStudies;
        case KarmaSpecialty.specialAgent:
            return SpecialAgentStudies;
        default:
            return [];
    }
}

export function getHealingPercent(karmaSpecialty: KarmaSpecialty) {
    switch (karmaSpecialty) {
        case KarmaSpecialty.escapeArtist:
        case KarmaSpecialty.clockbot:
            return 25
        case KarmaSpecialty.inkFighter:
            return 50
        case KarmaSpecialty.specialAgent:
            return 100
    }
}

export function getDefenseModifier(affiliation: Affiliation) {
    switch (affiliation) {
        case Affiliation.independent:
        case Affiliation.wolfgangAcademy:
            return 1
        case Affiliation.gears:
        case Affiliation.nka:
            return 2
        case Affiliation.clockbotUnion:
            return 3
    }
}