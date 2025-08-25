import {useLocalStorage} from "usehooks-ts";
import {TalentModifiers} from "../utils/types/KarmaSpecialty.ts";
import {createToggleFunction} from "../utils/utils.ts";

export type SkillName = VitalitySkills | KarmaSkills | TalentSkills | PersonalitySkills;
export type SkillTreeNode = {
    description: string,
    prerequisites?: (SkillName)[],
    links?: SkillName[],
    level?: number,
    options?: string[]
}

export enum VitalitySkills {
    health1 = 'Health 1',
    health2 = 'Health 2',
    health3 = 'Health 3',
    health4 = 'Health 4',
    movementEnhance = 'MOV Enhance',
    medKit1 = 'Med+ Kit 1',
    medKit2 = 'Med+ Kit 2',
    vitalityEnhance = 'Vitality Enhance',
    copycat = 'Copycat',
    defenseEnhance = 'DEF Enhance',
}

export enum KarmaSkills {
    karmaPool1 = 'Karma Pool 1',
    karmaPool2 = 'Karma Pool 2',
    karmaPool3 = 'Karma Pool 3',
    karmaPool4 = 'Karma Pool 4',
    tier2BasicAttacks = 'Tier 2 Basic Attack',
    advancedAttacks = 'Advanced Attack',
    advancedAttacks2 = 'Advanced Attacks (Tier 2)',
    resistPayback = 'Resist Payback',
    resistPayback2 = 'Resist Payback 2',
    karmaSurge = 'Karma Surge',
    range = 'Range'
}

export enum TalentSkills {
    talent1 = 'Talent 1',
    talent2 = 'Talent 2',
    talent3 = 'Talent 3',
    talent4 = 'Talent 4',
    tradingCards = 'Trading Cards',
    tradingCards2 = 'Trading Cards 2',
    reroll1 = 'Reroll 1',
    reroll2 = 'Reroll 2',
    destinySaves = 'Destiny Saves',
    share = 'Share',
    multiStudy = 'Multi-Study',
}

export enum PersonalitySkills {
    perception1 = 'Perception 1',
    perception2 = 'Perception 2',
    combo1 = 'Combo 1',
    combo2 = 'Combo 2',
    combo3 = 'Combo 3',
    merits1 = 'Merits',
    merits2 = 'Merits 2',
    affiliation = 'Affiliation',
    traits = 'Traits',
    karmaAlignment = 'Karma Alignment',
    negativeForce = 'Negative Force',
    positiveForce = 'Positive Force',
}

export const vitalitySkillTree: { [skill in VitalitySkills]: SkillTreeNode } = {
    [VitalitySkills.health1]: {
        description: "Increase HP Cap by 5",
    },
    [VitalitySkills.health2]: {
        description: "Increase HP Cap by 7",
        links: [VitalitySkills.health1]
    },
    [VitalitySkills.health3]: {
        description: "Increase HP Cap by 10",
        links: [VitalitySkills.health2]
    },
    [VitalitySkills.health4]: {
        description: "Increase HP Cap by 12",
        links: [VitalitySkills.health3]
    },
    [VitalitySkills.movementEnhance]: {
        description: "Increase MOV +1"
    },
    [VitalitySkills.defenseEnhance]: {
        description: "Increase DEF +2",
        links: [VitalitySkills.movementEnhance]
    },
    [VitalitySkills.vitalityEnhance]: {
        description: "Increase either MOV or DEF by +2",
        links: [VitalitySkills.defenseEnhance]
    },
    [VitalitySkills.medKit1]: {
        description: "Increase Med+ Kit capacity by 25% (Caps at Full HP recovery)",
        links: [VitalitySkills.health2]
    },
    [VitalitySkills.medKit2]: {
        description: "Increase Med+ Kit capacity by 25% (Caps at Full HP recovery)",
        links: [VitalitySkills.medKit1]
    },
    [VitalitySkills.copycat]: {
        description: "In combat, copy another Player's HP, MOV, or DEF for the rest of the Combat Encounter.",
        prerequisites: [VitalitySkills.health3, VitalitySkills.vitalityEnhance]
    },
}

export const karmaSkillTree: { [skill in KarmaSkills]: SkillTreeNode } = {
    [KarmaSkills.karmaPool1]: {
        description: "Increase Karma Pool cap by 15"
    },
    [KarmaSkills.karmaPool2]: {
        description: "Increase Karma Pool cap by 25",
        links: [KarmaSkills.karmaPool1]
    },
    [KarmaSkills.karmaPool3]: {
        description: "Increase Karma Pool cap by 35",
        links: [KarmaSkills.advancedAttacks]
    },
    [KarmaSkills.karmaPool4]: {
        description: "Increase Karma Pool cap by 50",
        links: [KarmaSkills.range]
    },
    [KarmaSkills.tier2BasicAttacks]: {
        description: "Advance to Tier 2 Basic attacks",
        links: [KarmaSkills.karmaPool2]
    },
    [KarmaSkills.resistPayback]: {
        description: "Automatically resist 25% of payback",
        links: [KarmaSkills.tier2BasicAttacks]
    },
    [KarmaSkills.resistPayback2]: {
        description: "Automatically resist 50% of payback",
        links: [KarmaSkills.advancedAttacks2]
    },
    [KarmaSkills.advancedAttacks]: {
        description: "You can now perform Advanced Karmastry Attacks",
        links: [KarmaSkills.resistPayback]
    },
    [KarmaSkills.advancedAttacks2]: {
        description: "Can now perform Tier 2 Advanced Karmastry Attacks",
        links: [KarmaSkills.karmaPool3]
    },
    [KarmaSkills.karmaSurge]: {
        description: "Produce a more powerful Karma Surge for 35 damage at the same Karma cost",
        prerequisites: [TalentSkills.destinySaves, KarmaSkills.advancedAttacks]
    },
    [KarmaSkills.range]: {
        description: "Increase the range of all attacks by 3.",
        links: [KarmaSkills.resistPayback2]
    }
}

export const talentsSkillTree: { [skill in TalentSkills]: SkillTreeNode } = {
    [TalentSkills.reroll1]: {
        description: "Re-roll any roll twice per Checkpoint",
    },
    [TalentSkills.reroll2]: {
        description: "Re-roll any roll four times per Checkpoint",
        links: [TalentSkills.reroll1],
    },
    [TalentSkills.talent1]: {
        description: "Add +1 to Aura or Stamina",
    },
    [TalentSkills.talent2]: {
        description: "Add +1 to Agility or Function",
        links: [TalentSkills.talent1],
    },
    [TalentSkills.talent3]: {
        description: "Add +1 to Willpower to Technique",
        links: [TalentSkills.talent2],
    },
    [TalentSkills.talent4]: {
        description: "Add +1 to any Talent",
        links: [TalentSkills.talent3],
    },
    [TalentSkills.tradingCards]: {
        description: "Gain an extra use from a trading card",
    },
    [TalentSkills.tradingCards2]: {
        description: "Gain a 6th card from a trading card pack",
        links: [TalentSkills.tradingCards],
    },
    [TalentSkills.destinySaves]: {
        description: "Gain one extra Destiny Save",
        prerequisites: [TalentSkills.reroll2, TalentSkills.talent4],
    },
    [TalentSkills.share]: {
        description: "Share your Basic Action roll with two other Players",
        links: [TalentSkills.destinySaves],
    },
    [TalentSkills.multiStudy]: {
        description: "Gain the advantage of one other specialty",
        prerequisites: [TalentSkills.destinySaves, KarmaSkills.advancedAttacks]
    }
}

export const personalitySkillTree: { [skill in PersonalitySkills]: SkillTreeNode } = {
    [PersonalitySkills.perception1]: {
        description: "When rolling for Perception, get a re-roll if the initial roll was below 5",
    },
    [PersonalitySkills.perception2]: {
        description: "Once per session, pass a Perception Threshold automatically without rolling",
        links: [PersonalitySkills.perception1],
    },
    [PersonalitySkills.merits1]: {
        description: "Gain +10 merits each time you gain merits."
    },
    [PersonalitySkills.merits2]: {
        description: "Sell items for 10% more.",
        links: [PersonalitySkills.merits1]
    },
    [PersonalitySkills.combo1]: {
        description: "Perform 3 Combos per combat.",
        links: [PersonalitySkills.perception1],
    },
    [PersonalitySkills.combo2]: {
        description: "Combos take 10 less KP to perform",
        links: [PersonalitySkills.combo1],
    },
    [PersonalitySkills.combo3]: {
        description: "Perform 4 Combos per combat for 5 less KP.",
        links: [PersonalitySkills.combo2],
    },
    [PersonalitySkills.karmaAlignment]: {
        description: "Gain the ability to trade KAPS between positive and negative once per session.",
        links: [PersonalitySkills.perception1],
    },
    [PersonalitySkills.positiveForce]: {
        description: "When gaining positive KAPs, gain double.",
        links: [PersonalitySkills.karmaAlignment]
    },
    [PersonalitySkills.negativeForce]: {
        description: "When gaining negative KAPs, gain double.",
        links: [PersonalitySkills.karmaAlignment]
    },
    [PersonalitySkills.affiliation]: {
        description: "Gain the trait and flaw of another affiliation.",
        links: [PersonalitySkills.perception2],
    },
    [PersonalitySkills.traits]: {
        description: "Gain a basic trait with no flaw.",
        links: [PersonalitySkills.affiliation],
    }
}

export function useSkillTree() {
    const [skills, setSkills] = useLocalStorage<SkillName[]>("skill-selection", [])
    const [vitalityOptions, setVitalityOptions] = useLocalStorage<"MOV" | "DEF" | undefined>("vitality-options", undefined)
    const [talent1Options, setTalent1Options] = useLocalStorage<keyof TalentModifiers | undefined>("talent-1-options", undefined)
    const [talent2Options, setTalent2Options] = useLocalStorage<keyof TalentModifiers | undefined>("talent-2-options", undefined)
    const [talent3Options, setTalent3Options] = useLocalStorage<keyof TalentModifiers | undefined>("talent-3-options", undefined)
    const [talent4Options, setTalent4Options] = useLocalStorage<keyof TalentModifiers | undefined>("talent-4-options", undefined)
    const [level5Talent, setLevel5Talent] = useLocalStorage<keyof TalentModifiers | undefined>("level-5-talent", undefined)
    const [talentedTalent, setTalentedTalent] = useLocalStorage<keyof TalentModifiers | undefined>("talented-talent", undefined)

    const toggleSkill = createToggleFunction(setSkills);

    return {
        skills, setSkills, toggleSkill,
        vitalityOptions, setVitalityOptions,
        talent1Options, setTalent1Options,
        talent2Options, setTalent2Options,
        talent3Options, setTalent3Options,
        talent4Options, setTalent4Options,
        level5Talent, setLevel5Talent,
        talentedTalent, setTalentedTalent
    }
}