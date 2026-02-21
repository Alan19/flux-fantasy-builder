import {Affiliation, KarmaSpecialty, Study, Talent} from "./KarmaSpecialty.ts";
import {SkillName} from "../../components/skills/SkillTreeInfo.ts";
import {Flaws, Traits} from "./Traits.ts";
import {AdvancedSwapPowerChoice, BasicSwapPowerChoice, PowerTier, SwapPower} from "./usePowerLoadoutSettings.ts";

export type SkillSettings = {
    "unlockedSkills": SkillName[],
    "vitalityEnhance": "MOV" | "DEF" | undefined,
    "talent1": Talent.AURA | Talent.STAMINA | undefined,
    "talent2": Talent.AGILITY | Talent.FUNCTION | undefined,
    "talent3": Talent.WILLPOWER | Talent.TECHNIQUE | undefined,
    "talent4": Talent | undefined,
    "talentedBoost": Talent | undefined,
    "level5TalentBoost": Talent | undefined,
}

//TODO Make Karma Specialty derived from study
export type CharacterBackground = {
    playerName: string,
    characterName: string,
    characterImageData: string,
    gearOfDestinyImageData: string,
    age: string,
    gender: string,
    height: string,
    weight: string,
    karmaSpecialty: KarmaSpecialty,
    study: Study,
    affiliation: Affiliation,
    background: string,
    traits: Traits[],
    flaws: Flaws[],
    level: number,
    karmaEquipmentConfiguration: string,
}
export type CharacterTalents = {
    aura: number,
    technique: number,
    stamina: number,
    function: number,
    willpower: number,
    agility: number,
    bonusAura: number,
    bonusTechnique: number,
    bonusStamina: number,
    bonusFunction: number,
    bonusWillpower: number,
    bonusAgility: number,
}
export type CharacterInventory = {
    medKits: number,
    merits: number,
    positiveKarma: number,
    negativeKarma: number,
    karmaPool: number,
    extraKarma: number,
    payback: number,
    currentHP: number,
    items: string,
    otherSkills: string
}
export type PowerLoadoutState = {
    basicAttack: string;
    basicCombo: string;
    basicSignature: string;
    basicDefense: string;
    basic2Attack: string;
    basic2Combo: string;
    basic2Signature: string;
    basic2Defense: string;
    advancedAttack: string;
    advancedCombo: string;
    advancedSignature: string;
    advancedDefense: string;
    advanced2Attack: string;
    advanced2Combo: string;
    advanced2Signature: string;
    advanced2Defense: string;
    basicLocomotion: string;
    basic2Locomotion: string;
    advancedLocomotion: string;
    advanced2Locomotion: string;
    selectedSwapPower: BasicSwapPowerChoice;
    selectedAdvancedSwapPower: AdvancedSwapPowerChoice;
    selectedAttackTier: PowerTier | SwapPower;
    selectedDefenseTier: PowerTier;
    selectedComboTier: PowerTier;
    selectedSignatureTier: PowerTier;
    selectedLocomotionTier: PowerTier;
}
export type OCSaveData = {
    // PowerLoadoutState & SkillSettings & CharacterTalents & CharacterInventory & CharacterBackground
    karmaPowers: PowerLoadoutState,
    skills: SkillSettings,
    talents: CharacterTalents,
    inventory: CharacterInventory,
    background: CharacterBackground
}

