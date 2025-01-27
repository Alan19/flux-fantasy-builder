import {Affiliation} from "./CharacterSheet.tsx";

export enum KarmaSpecialty {escapeArtist = 'Escape Artist', inkFighter = 'Ink Fighter', specialAgent = 'Special Agent', clockbot = 'Clockbot'}

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

export function getMaxKarma(specialty: KarmaSpecialty, _level: number) {
    if (specialty === KarmaSpecialty.escapeArtist) {
        return 25
    } else {
        return 20;
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

interface TalentModifiers {
    aura: number;
    technique: number;
    stamina: number;
    function: number;
    willpower: number;
    agility: number;
}

type BoostedTalents = ("Aura" | "Technique" | "Agility" | "Stamina" | "Willpower" | "Function")[];

export function getEffectiveTalents(study: Study | undefined, aura: number, technique: number, stamina: number, functionStat: number, willpower: number, agility: number): [TalentModifiers, BoostedTalents] {
    const talents: TalentModifiers = {
        aura: aura,
        technique: technique,
        stamina: stamina,
        function: functionStat,
        willpower: willpower,
        agility: agility,
    }
    const boostedTalents: BoostedTalents = [];
    switch (study) {
        case EscapeArtistStudies.creativeKarmastry:
        case InkFighterStudies.projectile:
        case SpecialAgentStudies.tinker:
        case ClockbotStudies.experimental:
            talents.technique += 1;
            boostedTalents.push("Technique");
            break;
        case EscapeArtistStudies.clockworkKarmastry:
        case InkFighterStudies.animal:
        case SpecialAgentStudies.scout:
        case ClockbotStudies.heavy:
            talents.agility += 1;
            boostedTalents.push("Agility");
            break;
        case EscapeArtistStudies.bioKarmastry:
        case InkFighterStudies.body:
        case ClockbotStudies.medical:
            talents.function += 1;
            boostedTalents.push("Function");
            break;
        case EscapeArtistStudies.machineKarmastry:
        case SpecialAgentStudies.bodyguard:
        case ClockbotStudies.decoy:
            talents.stamina += 1;
            boostedTalents.push("Stamina");
            break;
        case EscapeArtistStudies.quantumKarmastry:
        case InkFighterStudies.elemental:
        case SpecialAgentStudies.disrupter:
        case ClockbotStudies.karmastryAssist:
            talents.willpower += 1;
            boostedTalents.push("Willpower");
            break;
        case InkFighterStudies.melee:
        case SpecialAgentStudies.operative:
            boostedTalents.push("Aura");
            talents.aura += 1;
    }
    return [talents, boostedTalents];
}