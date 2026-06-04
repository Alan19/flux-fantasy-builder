export enum EscapeArtistStudies  {
    CREATIVE = "Creative Karmastry",
    CLOCKWORK = "Clockwork Karmastry",
    BIO = "Bio Karmastry",
    MACHINE = "Machine Karmastry",
    QUANTUM = "Quantum Karmastry",
}

export enum InkFighterStudies {
    MELEE = "Melee",
    PROJECTILE = "Projectile",
    ANIMAL = "Animal",
    BODY = "Body",
    ELEMENTAL = "Elemental",
}

export enum SpecialAgentStudies {
    SCOUT = "Scout",
    DISRUPTER = "Disrupter",
    BODYGUARD = "Bodyguard",
    OPERATIVE = "Operative",
    TINKER = "Tinker",
}

export enum ClockbotStudies {
    DECOY = "D-Type (Decoy)",
    KARMASTY_ASSIST = "K-Type (Karmastry-Assist)",
    MEDICAL = "M-Type (Medical)",
    HEAVY = "H-Type (Heavy)",
    EXPERIMENTAL = "X-Type (Experimental)"
}

export type KarmaStudy = EscapeArtistStudies | InkFighterStudies | SpecialAgentStudies | ClockbotStudies

export enum KarmaSpecialty {
    INK_FIGHTER = "Ink Fighter", ESCAPE_ARTIST = "Escape Artist", SPECIAL_AGENT = "Special Agent", CLOCKBOT = "Clockbot"
}

export enum Affiliation {
    ACADEMIA = "Academia", GEARS = "GEARS", NKA = "NKA", INK_FIGHTING_ELITE = "Ink Fighting Elite", CLOCKBOT_UNION = "Clockbot Union", FOREIGN_VISITOR = "Foreign Visitor", INDEPENDENT = "Independent"
}

export enum NonKarmaPower {
    A, B, C, D, E, F, G
}

export enum PowerTiers {
    BASIC1, BASIC2, ADVANCED1, ADVANCED2
}

export interface AdvancedEffects {
}

export interface PowerKit {
    attackName: string,
    attackDescription: string,
    defenseName: string,
    defenseDescription: string,
    comboName: string,
    comboDescription: string,
    signatureName: string,
    signatureDescription: string,
    locomotionName: string,
    locomotionDescription: string,
    effect?: AdvancedEffects
}

type Skill = {}

type Trait = {}

type Flaw = {}

export type SaveData = {
    playerName: string,
    characterName: string,
    age: string,
    gender: string,
    height: string,
    weight: string,
    study: KarmaStudy,
    affiliation: Affiliation,
    level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    positiveKAP: number,
    negativeKAP: number,
    merits: number,
    medKitCount: number,
    powerTheme: string,
    nonKarmaPower: NonKarmaPower,
    portraitImageData: string,
    gearOfDestinyImageData: string,
    karma: number,
    payback: number,
    extraKarma: number,
    selectedAttackTier: PowerTiers,
    selectedDefenseTier: PowerTiers,
    selectedComboTier: PowerTiers,
    selectedSignatureTier: PowerTiers,
    selectedLocomotionTier: PowerTiers,
    background: string,
    traits: Trait[],
    flaws: Flaw[]
    // basicTier1Powers: PowerKit,
    // basicTier2Powers: PowerKit,
    // advancedTier1Powers: PowerKit,
    // advancedTier2Powers: PowerKit,
    karmaConfiguration: string,
    items: string,
    tradingCardsInUse: [Blob?, Blob?, Blob?, Blob?],
    unlockedSkills: Skill[],
    baseAura: number,
    baseTechnique: number,
    baseStamina: number,
    baseFunction: number,
    baseWillpower: number,
    baseAgility: number,
    currentHP: number,
    bonusAura: number,
    bonusTechnique: number,
    bonusStamina: number,
    bonusFunction: number,
    bonusWillpower: number,
    bonusAgility: number,
}