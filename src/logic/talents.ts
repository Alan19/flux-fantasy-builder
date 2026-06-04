import {ClockbotStudies, EscapeArtistStudies, InkFighterStudies, type KarmaStudy, type SaveData, SpecialAgentStudies} from "./save-data.ts";
import {db} from "./data-store.ts";

interface TalentModifiers {
    aura: number,
    stamina: number,
    agility: number,
    technique: number,
    willpower: number,
    function: number
}

export function getBaseTalentModifiersWithStudyBonus(talentModifiers: TalentModifiers, study: KarmaStudy) {
    const baseTalents: Record<keyof TalentModifiers, number> = {
        aura: talentModifiers.aura,
        technique: talentModifiers.technique,
        stamina: talentModifiers.stamina,
        function: talentModifiers.function,
        willpower: talentModifiers.willpower,
        agility: talentModifiers.agility,
    };
    baseTalents[getBoostedTalent(study)] += 1;
    return baseTalents;
}

export function getEffectiveTalents(talentModifiers: Record<keyof TalentModifiers, number>, study: KarmaStudy, level: number, saveData: SaveData): Record<keyof TalentModifiers, number> {
    const talents: TalentModifiers = getBaseTalentModifiersWithStudyBonus(talentModifiers, study)
    // TODO Re-add with skills
    // if (skills.unlockedSkills.includes(TalentSkills.talent1) && skills.talent1) {
    //     talents[skills.talent1] += 1;
    // }
    // if (skills.unlockedSkills.includes(TalentSkills.talent2) && skills.talent2) {
    //     talents[skills.talent2] += 1;
    // }
    // if (skills.unlockedSkills.includes(TalentSkills.talent3) && skills.talent3) {
    //     talents[skills.talent3] += 1;
    // }
    // if (skills.unlockedSkills.includes(TalentSkills.talent4) && skills.talent4) {
    //     talents[skills.talent4] += 1;
    // }
    // if (level >= 5 && skills.level5TalentBoost) {
    //     talents[skills.level5TalentBoost] += 1;
    // }
    // if (talented && skills.talentedBoost) {
    //     talents[skills.talentedBoost] += 1;
    // }
    talents.aura += saveData.bonusAura;
    talents.agility += saveData.bonusAgility;
    talents.function += saveData.bonusFunction;
    talents.stamina += saveData.bonusStamina;
    talents.willpower += saveData.bonusWillpower;
    talents.technique += saveData.bonusTechnique;
    console.log(talentModifiers)
    return talents;
}

export function getBoostedTalent(study: KarmaStudy): keyof TalentModifiers{
    switch (study) {
        case EscapeArtistStudies.CREATIVE:
        case InkFighterStudies.PROJECTILE:
        case SpecialAgentStudies.TINKER:
        case ClockbotStudies.EXPERIMENTAL:
            return "technique";
        case EscapeArtistStudies.CLOCKWORK:
        case InkFighterStudies.ANIMAL:
        case SpecialAgentStudies.SCOUT:
        case ClockbotStudies.HEAVY:
            return "agility";
        case EscapeArtistStudies.BIO:
        case InkFighterStudies.BODY:
        case ClockbotStudies.MEDICAL:
            return "function"
        case EscapeArtistStudies.MACHINE:
        case SpecialAgentStudies.BODYGUARD:
        case ClockbotStudies.DECOY:
            return "stamina";
        case EscapeArtistStudies.QUANTUM:
        case InkFighterStudies.ELEMENTAL:
        case SpecialAgentStudies.DISRUPTER:
        case ClockbotStudies.KARMASTY_ASSIST:
            return "willpower"
        case InkFighterStudies.MELEE:
        case SpecialAgentStudies.OPERATIVE:
            return "aura"
    }
}
