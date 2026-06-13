import Dexie, {type EntityTable, type Table} from "dexie";
import {Affiliation, NonKarmaPower, type PowerKit, PowerTiers, type SaveData, SpecialAgentStudies} from "./save-data.ts";

export const db = new Dexie("characterDatabase") as Dexie & {
    characters: EntityTable<SaveData & { id: string }, "id">,
    powers: Table<PowerKit & { characterID: string, tier: PowerTiers }, [string, PowerTiers]>
}

// Schema declaration:
db.version(1).stores({
    characters: "++id, playerName, characterName",
    powers: "[characterID+tier]"
})

export function createEntry() {
    db.characters.add({
        bonusAgility: 0, bonusAura: 0, bonusFunction: 0, bonusStamina: 0, bonusTechnique: 0, bonusWillpower: 0, currentHP: 0,
        baseAgility: 1, baseAura: 1, baseFunction: 1, baseStamina: 1, baseTechnique: 1, baseWillpower: 1,
        affiliation: Affiliation.NKA,
        age: "",
        background: "",
        characterName: "",
        extraKarma: 0,
        flaws: [],
        gearOfDestinyImageData: "",
        gender: "",
        height: "",
        items: "",
        karma: 0,
        karmaConfiguration: "",
        level: 1,
        medKitCount: 2,
        merits: 0,
        negativeKAP: 0,
        nonKarmaPower: NonKarmaPower.A,
        payback: 0,
        playerName: "",
        portraitImageData: "",
        positiveKAP: 0,
        powerTheme: "",
        selectedAttackTier: PowerTiers.BASIC1,
        selectedComboTier: PowerTiers.BASIC1,
        selectedDefenseTier: PowerTiers.BASIC1,
        selectedLocomotionTier: PowerTiers.BASIC1,
        selectedSignatureTier: PowerTiers.BASIC1,
        study: SpecialAgentStudies.TINKER,
        tradingCardsInUse: [undefined, undefined, undefined, undefined],
        traits: [],
        unlockedSkills: [],
        weight: ""
    }).then(id => {
        [PowerTiers.BASIC1, PowerTiers.BASIC2, PowerTiers.ADVANCED1, PowerTiers.ADVANCED2]
            .forEach(value => db.powers.add({
                attackDescription: "",
                attackName: "",
                characterID: id,
                comboDescription: "",
                comboName: "",
                defenseDescription: "",
                defenseName: "",
                effect: undefined,
                locomotionDescription: "",
                locomotionName: "",
                signatureDescription: "",
                signatureName: "",
                tier: value
            }))
    })
}