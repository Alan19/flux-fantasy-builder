import {Affiliation, EscapeArtistStudies, KarmaSpecialty} from "./types/KarmaSpecialty.ts";
import {AdvancedSwapPowerChoice, BasicSwapPowerChoice, PowerTier} from "./types/usePowerLoadoutSettings.ts";
import {OCSaveData} from "./types/OCSaveData.ts";

export function getNewCharacter(): OCSaveData {
    return {
        background: {
            playerName: "",
            characterName: "",
            characterImageData: "",
            gearOfDestinyImageData: "",
            age: "",
            gender: "",
            height: "",
            weight: "",
            karmaSpecialty: KarmaSpecialty.escapeArtist,
            study: EscapeArtistStudies.clockworkKarmastry,
            affiliation: Affiliation.academia,
            background: "",
            traits: [],
            flaws: [],
            level: 1,
            karmaEquipmentConfiguration: ""
        }, inventory: {
            medKits: 2,
            merits: 20,
            positiveKarma: 0,
            negativeKarma: 0,
            karmaPool: 0,
            extraKarma: 0,
            payback: 0,
            currentHP: 0,
            items: "",
            otherSkills: ""
        }, karmaPowers: {
            basicAttack: "",
            basicCombo: "",
            basicSignature: "",
            basicDefense: "",
            basic2Attack: "",
            basic2Combo: "",
            basic2Signature: "",
            basic2Defense: "",
            advancedAttack: "",
            advancedCombo: "",
            advancedSignature: "",
            advancedDefense: "",
            advanced2Attack: "",
            advanced2Combo: "",
            advanced2Signature: "",
            advanced2Defense: "",
            basicLocomotion: "",
            basic2Locomotion: "",
            advancedLocomotion: "",
            advanced2Locomotion: "",
            selectedSwapPower: BasicSwapPowerChoice.A,
            selectedAdvancedSwapPower: AdvancedSwapPowerChoice.D,
            selectedAttackTier: PowerTier.Basic,
            selectedDefenseTier: PowerTier.Basic,
            selectedComboTier: PowerTier.Basic,
            selectedSignatureTier: PowerTier.Basic,
            selectedLocomotionTier: PowerTier.Basic,
            karmaPowerDescriptions: ""
        }, skills: {
            unlockedSkills: [],
            vitalityEnhance: undefined,
            talent1: undefined,
            talent2: undefined,
            talent3: undefined,
            talent4: undefined,
            talentedBoost: undefined,
            level5TalentBoost: undefined
        }, talents: {
            aura: 1,
            technique: 1,
            stamina: 1,
            function: 1,
            willpower: 1,
            agility: 1,
            bonusAura: 0,
            bonusTechnique: 0,
            bonusStamina: 0,
            bonusFunction: 0,
            bonusWillpower: 0,
            bonusAgility: 0
        }

    }
}