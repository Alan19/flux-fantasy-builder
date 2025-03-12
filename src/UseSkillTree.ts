import {useLocalStorage} from "usehooks-ts";

export type SkillName = VitalitySkills | KarmaSkills | TalentSkills | PersonalitySkills;
export type SkillTreeNode = {
    description: string,
    prerequisites?: (SkillName)[],
    links?: SkillName[],
    level?: number,
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

enum KarmaSkills {
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
}

enum TalentSkills {
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

enum PersonalitySkills {
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
        description: "Increase HP +5",
    },
    [VitalitySkills.health2]: {
        description: "Increase HP +7",
        links: [VitalitySkills.health1]
    },
    [VitalitySkills.health3]: {
        description: "Increase HP +10",
        prerequisites: [VitalitySkills.health2],
        links: [VitalitySkills.copycat, VitalitySkills.medKit1],
        level: 4
    },
    [VitalitySkills.health4]: {
        description: "Increase HP +12",
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
        description: "Increase either MOV or DEF by +3",
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
        description: "Gain 10 Karma Pool"
    },
    [KarmaSkills.karmaPool2]: {
        description: "Gain 15 Karma Pool",
        links: [KarmaSkills.karmaPool1]
    },
    [KarmaSkills.karmaPool3]: {
        description: "Gain 30 Karma Pool",
        links: [KarmaSkills.advancedAttacks]
    },
    [KarmaSkills.karmaPool4]: {
        description: "Gain 30 Karma Pool",
        links: [KarmaSkills.resistPayback2]
    },
    [KarmaSkills.tier2BasicAttacks]: {
        description: "Can now perform Tier 2 Basic Attacks",
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
        description: "Can now perform Advanced Attacks",
        links: [KarmaSkills.resistPayback]
    },
    [KarmaSkills.advancedAttacks2]: {
        description: "Can now perform Tier 2 Advanced Attacks",
        links: [KarmaSkills.karmaPool3]
    },
    [KarmaSkills.karmaSurge]: {
        description: "Produce a more powerful Karma Surge for 35 damage at the same Karma cost",
        links: [TalentSkills.destinySaves, KarmaSkills.advancedAttacks]
    }
}

export const talentsSkillTree: { [skill in TalentSkills]: SkillTreeNode } = {
    [TalentSkills.reroll1]: {
        description: "Re-roll any roll twice per Checkpoint",
    },
    [TalentSkills.reroll2]: {
        description: "Re-roll any roll three times per Checkpoint",
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
        links: [TalentSkills.reroll2, TalentSkills.talent4],
    },
    [TalentSkills.share]: {
        description: "Share your Basic Action roll with two other Players",
        links: [TalentSkills.destinySaves],
    },
    [TalentSkills.multiStudy]: {
        description: "Gain the advantage of one other specialty",
        links: [TalentSkills.share],
        level: 8
    }
}

export const personalitySkillTree: { [skill in PersonalitySkills]: SkillTreeNode } = {
    [PersonalitySkills.perception1]: {
        description: "When rolling for Perception of an enemy or NPC, get a re-roll if the initial roll was below 5",
    },
    [PersonalitySkills.perception2]: {
        description: "Once per Checkpoint, pass a Perception Threshold automatically without rolling",
        links: [PersonalitySkills.perception1],
    },
    [PersonalitySkills.merits1]: {
        description: "Gain +5 merits each time you receive some"
    },
    [PersonalitySkills.merits2]: {
        description: "Sell items for 10% more",
        links: [PersonalitySkills.merits1]
    },
    [PersonalitySkills.combo1]: {
        description: "Perform 3 Combos per combat",
        links: [PersonalitySkills.perception1],
    },
    [PersonalitySkills.combo2]: {
        description: "Combos take 10 less Karma to perform",
        links: [PersonalitySkills.combo1],
    },
    [PersonalitySkills.combo3]: {
        description: "Advanced Attacks perform Combos in 1 turn and for 5 less karma",
        prerequisites: [PersonalitySkills.traits, PersonalitySkills.combo2],
    },
    [PersonalitySkills.karmaAlignment]: {
        description: "Gain 2 points in either Positive or Negative Karma consequence",
        links: [PersonalitySkills.perception1],
    },
    [PersonalitySkills.positiveForce]: {
        description: "When gaining positive KAP, gain double",
        links: [PersonalitySkills.karmaAlignment]
    },
    [PersonalitySkills.negativeForce]: {
        description: "When gaining negative KAP, gain double",
        links: [PersonalitySkills.karmaAlignment]
    },
    [PersonalitySkills.affiliation]: {
        description: "Trade your Affiliations, Traits, and Flaws with another Affiliation",
        links: [PersonalitySkills.perception2],
    },
    [PersonalitySkills.traits]: {
        description: "Gain 1 Trait with no Flaw",
        links: [PersonalitySkills.affiliation],
    }
}

export const fullSkillTree: { [skillName in SkillName]: SkillTreeNode } = {...vitalitySkillTree, ...karmaSkillTree, ...personalitySkillTree, ...talentsSkillTree}

export type SkillTreeSelections = {
    [K in 2 | 4 | 5 | 6 | 7 | 8 | 9 | 10]: SkillName[] & { length: 0 | 1 | 2 };
} & {
    3: SkillName[] & { length: 0 | 1 | 2 | 3 };
};
export function useSkillTree() {
    const [skills, setSkills] = useLocalStorage<SkillTreeSelections>("skills", {
        "2": [],
        "3": [],
        "4": [],
        "5": [],
        "6": [],
        "7": [],
        "8": [],
        "9": [],
        "10": []
    })

    function toggleSkill(skill: SkillName, level: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10) {
        setSkills(prevState => {
            if (prevState[level].includes(skill)) {
                return ({
                    ...prevState,
                    [level]: prevState[level].filter(selectedSkill => selectedSkill !== skill),
                })
            }
            return ({
                ...prevState,
                [level]: prevState[level].concat(skill),
            })
        })
    }

    function getEnabledSkills() {
        return Object.values(skills).flatMap(skill => skill)
    }

    return {skills, toggleSkill, getEnabledSkills}
}