import {KarmaSkills, SkillName, TalentSkills, VitalitySkills} from "./UseSkillTree.ts";
import {Traits} from "./Traits.ts";

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

export function getMaxKarma(specialty: KarmaSpecialty, level: number, skills: SkillName[]) {
    let karmaPool = specialty === KarmaSpecialty.escapeArtist ? 25 : 20;
    if (level >= 2) {
        karmaPool += 5;
    }
    if (level >= 10) {
        karmaPool += 10;
    }
    if (skills.includes(KarmaSkills.karmaPool1)) {
        karmaPool += 15;
    }
    if (skills.includes(KarmaSkills.karmaPool2)) {
        karmaPool += 25;
    }
    if (skills.includes(KarmaSkills.karmaPool3)) {
        karmaPool += 35;
    }
    if (skills.includes(KarmaSkills.karmaPool4)) {
        karmaPool += 50;
    }
    return karmaPool;
}

export function getHealingPercent(karmaSpecialty: KarmaSpecialty, skills: SkillName[]) {
    let healingPercentage;
    switch (karmaSpecialty) {
        case KarmaSpecialty.escapeArtist:
        case KarmaSpecialty.clockbot:
            healingPercentage = 25
            break;
        case KarmaSpecialty.inkFighter:
            healingPercentage = 50
            break;
        case KarmaSpecialty.specialAgent:
            healingPercentage = 100
            break;
    }
    if (skills.includes(VitalitySkills.medKit1)) {
        healingPercentage += 25;
    }
    if (skills.includes(VitalitySkills.medKit2)) {
        healingPercentage += 25;
    }
    return Math.min(healingPercentage, 100);
}

export function getBoostedTalent(study: Study): Talent {
    switch (study) {
        case EscapeArtistStudies.creativeKarmastry:
        case InkFighterStudies.projectile:
        case SpecialAgentStudies.tinker:
        case ClockbotStudies.experimental:
            return "Technique";
        case EscapeArtistStudies.clockworkKarmastry:
        case InkFighterStudies.animal:
        case SpecialAgentStudies.scout:
        case ClockbotStudies.heavy:
            return "Agility";
        case EscapeArtistStudies.bioKarmastry:
        case InkFighterStudies.body:
        case ClockbotStudies.medical:
            return "Function"
        case EscapeArtistStudies.machineKarmastry:
        case SpecialAgentStudies.bodyguard:
        case ClockbotStudies.decoy:
            return "Stamina";
        case EscapeArtistStudies.quantumKarmastry:
        case InkFighterStudies.elemental:
        case SpecialAgentStudies.disrupter:
        case ClockbotStudies.karmastryAssist:
            return "Willpower"
        case InkFighterStudies.melee:
        case SpecialAgentStudies.operative:
            return "Aura"
    }
}

export enum Affiliation {
    academia = 'Academia',
    gears = 'Great Escape Artist Society',
    inkFightingElite = 'Ink Fighting Elite',
    nka = 'National Karmastry Authority',
    clockbotUnion = 'Clockbot Union',
    independent = 'Independent',
    foreignVisitor = 'Foreign Visitor',
}

export function getDefenseModifier(affiliation: Affiliation, level: number, skills: SkillName[], vitalityOption: "DEF" | "MOV" | undefined) {
    let defenseModifier;
    switch (affiliation) {
        case Affiliation.independent:
        case Affiliation.academia:
            defenseModifier = 1;
            break
        case Affiliation.gears:
        case Affiliation.nka:
        case Affiliation.foreignVisitor:
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
    if (level >= 8) {
        defenseModifier += 1;
    }
    if (skills.includes(VitalitySkills.defenseEnhance)) {
        defenseModifier += 2;
    }
    if (skills.includes(VitalitySkills.vitalityEnhance) && vitalityOption === 'DEF') {
        defenseModifier += 2;
    }
    return defenseModifier;
}

export interface TalentModifiers {
    aura: number;
    technique: number;
    stamina: number;
    function: number;
    willpower: number;
    agility: number;
}

export type Talent = "Aura" | "Technique" | "Agility" | "Stamina" | "Willpower" | "Function";

// TODO Lower the number of parameters
export function getEffectiveTalents(study: Study | undefined,
                                    aura: number,
                                    technique: number,
                                    stamina: number,
                                    functionStat: number,
                                    willpower: number,
                                    agility: number,
                                    talent1Options: keyof TalentModifiers | undefined,
                                    talent2Options: keyof TalentModifiers | undefined,
                                    talent3Options: keyof TalentModifiers | undefined,
                                    talent4Options: keyof TalentModifiers | undefined,
                                    level5Talent: keyof TalentModifiers | undefined,
                                    talentedTalent: keyof TalentModifiers | undefined,
                                    skills: SkillName[],
                                    level: number,
                                    traits: Traits[]): [TalentModifiers] {
    const talents: TalentModifiers = {
        aura: aura,
        technique: technique,
        stamina: stamina,
        function: functionStat,
        willpower: willpower,
        agility: agility,
    }
    if (study) {
        talents[getBoostedTalent(study).toLowerCase() as keyof TalentModifiers] += 1;
    }
    if (skills.includes(TalentSkills.talent1) && talent1Options) {
        talents[talent1Options] += 1;
    }
    if (skills.includes(TalentSkills.talent2) && talent2Options) {
        talents[talent2Options] += 1;
    }
    if (skills.includes(TalentSkills.talent3) && talent3Options) {
        talents[talent3Options] += 1;
    }
    if (skills.includes(TalentSkills.talent4) && talent4Options) {
        talents[talent4Options] += 1;
    }
    if (level >= 5 && level5Talent) {
        talents[level5Talent] += 1;
    }
    if (traits.includes("Talented") && talentedTalent) {
        talents[talentedTalent] += 1;
    }
    return [talents];
}

export function getMaxHP(effectiveTalents: TalentModifiers, level: number, skills: SkillName[]) {
    let totalHP = 10;
    totalHP += (effectiveTalents.function ?? 0)
    if (level >= 3) {
        totalHP += 7;
    }
    if (skills.includes(VitalitySkills.health1)) {
        totalHP += 5;
    }
    if (skills.includes(VitalitySkills.health2)) {
        totalHP += 7;
    }
    if (skills.includes(VitalitySkills.health3)) {
        totalHP += 10;
    }
    if (skills.includes(VitalitySkills.health4)) {
        totalHP += 12;
    }
    return totalHP;
}

export function getMovModifier(effectiveTalents: TalentModifiers, skills: SkillName[], vitalityOption: "DEF" | "MOV" | undefined) {
    let totalMOV = 1;
    totalMOV += (effectiveTalents.agility ?? 0);
    if (skills.includes(VitalitySkills.movementEnhance)) {
        totalMOV += 1;
    }
    if (skills.includes(VitalitySkills.vitalityEnhance) && vitalityOption === 'MOV') {
        totalMOV += 2;
    }
    return totalMOV;
}

