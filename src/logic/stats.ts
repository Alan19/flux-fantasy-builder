import {Affiliation, ClockbotStudies, EscapeArtistStudies, InkFighterStudies, KarmaSpecialty, type KarmaStudy, SpecialAgentStudies} from "./save-data.ts";

export function getAdvantages(study: KarmaStudy, level: number) {
    const advantages  = ["+5 to Karma Pool", "+10 HP Boost", "Extra Skill Tree Point", "+1 to any Talent", "10% Discount in all Shops", "+1 to DEF", "+1 to DEF", "All one-time items can be used twice", "+10 to Karma Pool"]

    const specialty = getKarmaSpecialty(study);
    switch (specialty) {
        case KarmaSpecialty.ESCAPE_ARTIST:
            return ["Escape Artists can replenish 10 KP when completely depleted in battle", ...advantages].slice(0, level)
        case KarmaSpecialty.CLOCKBOT:
            return ["Can absorb 50% of payback and karma-weapon attacks without taking damage, halving all potential damage", ...advantages].slice(0, level)
        case KarmaSpecialty.INK_FIGHTER:
            return ["Can trade Movement for an extra action in combat", ...advantages].slice(0, level)
        case KarmaSpecialty.SPECIAL_AGENT:
            return ["Receive 10% of their current merit balance as a government-approved bonus and an extra Med+ Kit after each checkpoint", ...advantages].slice(0, level)
    }
}

export function getKarmaSpecialty(study: KarmaStudy) {
    const study1 = study as never;
    if (Object.values(EscapeArtistStudies).includes(study1)) {
        return KarmaSpecialty.ESCAPE_ARTIST;
    }
    else if (Object.values(ClockbotStudies).includes(study1)) {
        return KarmaSpecialty.CLOCKBOT;
    }
    else if (Object.values(InkFighterStudies).includes(study1)) {
        return KarmaSpecialty.INK_FIGHTER;
    }
    else if (Object.values(SpecialAgentStudies).includes(study1)) {
        return KarmaSpecialty.SPECIAL_AGENT;
    }
    throw new Error("Invalid Karma Study!")
}

export function getDefenseModifier(affiliation: Affiliation, level: number) {
    let defenseModifier;
    switch (affiliation) {
        case Affiliation.INDEPENDENT:
        case Affiliation.ACADEMIA:
            defenseModifier = 1;
            break
        case Affiliation.GEARS:
        case Affiliation.NKA:
        case Affiliation.FOREIGN_VISITOR:
            defenseModifier = 2;
            break
        case Affiliation.CLOCKBOT_UNION:
        case Affiliation.INK_FIGHTING_ELITE:
            defenseModifier = 3;
            break
    }
    if (level >= 7) {
        defenseModifier += 1;
    }
    if (level >= 8) {
        defenseModifier += 1;
    }
    // TODO Add later
    // if (skills.includes(VitalitySkills.defenseEnhance)) {
    //     defenseModifier += 2;
    // }
    // if (skills.includes(VitalitySkills.vitalityEnhance) && vitalityOption === 'DEF') {
    //     defenseModifier += 2;
    // }
    return defenseModifier;
}

export function getMaxHP(functionStat: number, level: number) {
    let totalHP = 10;
    totalHP += (functionStat)
    if (level >= 3) {
        totalHP += 7;
    }
    return totalHP;
}

export function getMovModifier(effectiveTalents: number) {
    let totalMOV = 1;
    totalMOV += effectiveTalents;
    // TODO Add back later
    // if (skills.includes(VitalitySkills.movementEnhance)) {
    //     totalMOV += 1;
    // }
    // if (skills.includes(VitalitySkills.vitalityEnhance) && vitalityOption === 'MOV') {
    //     totalMOV += 2;
    // }
    return totalMOV;
}

export function getMedKitPercent(study: KarmaStudy) {
    let healingPercentage;
    const karmaSpecialty = getKarmaSpecialty(study);
    switch (karmaSpecialty) {
        case KarmaSpecialty.ESCAPE_ARTIST:
        case KarmaSpecialty.CLOCKBOT:
            healingPercentage = 25
            break;
        case KarmaSpecialty.INK_FIGHTER:
            healingPercentage = 50
            break;
        case KarmaSpecialty.SPECIAL_AGENT:
            healingPercentage = 100
            break;
    }
    // if (skills.includes(VitalitySkills.medKit1)) {
    //     healingPercentage += 25;
    // }
    // if (skills.includes(VitalitySkills.medKit2)) {
    //     healingPercentage += 25;
    // }
    return Math.min(healingPercentage, 100);
}

export function getMaxKarma(study: KarmaStudy, level: number) {
    let karmaPool = getKarmaSpecialty(study) === "Escape Artist" ? 25 : 20;
    if (level >= 2) {
        karmaPool += 5;
    }
    if (level >= 10) {
        karmaPool += 10;
    }
    // if (skills.includes(KarmaSkills.karmaPool1)) {
    //     karmaPool += 15;
    // }
    // if (skills.includes(KarmaSkills.karmaPool2)) {
    //     karmaPool += 25;
    // }
    // if (skills.includes(KarmaSkills.karmaPool3)) {
    //     karmaPool += 35;
    // }
    // if (skills.includes(KarmaSkills.karmaPool4)) {
    //     karmaPool += 50;
    // }
    return karmaPool;
}
