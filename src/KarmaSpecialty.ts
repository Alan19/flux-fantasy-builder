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

export function getMaxKarma(specialty: KarmaSpecialty, level: number) {
    let karmaPool = specialty === KarmaSpecialty.escapeArtist ? 25 : 20;
    if (level >= 2) {
        karmaPool += 5;
    }
    if (level >= 10) {
        karmaPool += 10;
    }
    return karmaPool;
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

export enum Affiliation {
    wolfgangAcademy = 'Wolfgang Academy',
    gears = 'Great Escape Artist Society',
    inkFightingElite = 'Ink Fighting Elite',
    nka = 'National Karmastry Authority',
    clockbotUnion = 'Clockbot Union',
    independent = 'Independent'
}

export function getDefenseModifier(affiliation: Affiliation, level: number) {
    let defenseModifier;
    switch (affiliation) {
        case Affiliation.independent:
        case Affiliation.wolfgangAcademy:
            defenseModifier = 1;
            break
        case Affiliation.gears:
        case Affiliation.nka:
            defenseModifier = 2;
            break
        case Affiliation.clockbotUnion:
        case Affiliation.inkFightingElite:
            defenseModifier = 3;
            break
    }
    if (level >= 7) {
        defenseModifier += 1;
    }
    return defenseModifier;
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

export function getMaxHP(effectiveTalents: TalentModifiers, level: number) {
    return 10 + (effectiveTalents.function ?? 0) + (level >= 3 ? 7 : 0);
}

export function getMovModifier(effectiveTalents: TalentModifiers, level: number) {
    return 1 + (effectiveTalents.agility ?? 0) + (level >= 8 ? 1 : 0);
}

