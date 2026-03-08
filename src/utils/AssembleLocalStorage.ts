import {CharacterBackground, CharacterInventory, CharacterTalents, OCSaveData, PowerLoadoutState, SkillSettings} from "./types/OCSaveData.ts";
import sanitize from "sanitize-filename";
import {ChangeEvent} from "react";

export type KarmaPowersGettersAndSetters = { [Field in keyof PowerLoadoutState]: [PowerLoadoutState[Field], (val: PowerLoadoutState[Field]) => void] };
export type SkillSettingsGettersAndSetters = { [Field in keyof SkillSettings]: [SkillSettings[Field], (val: SkillSettings[Field]) => void] };
export type OCSaveDataWithState = {
    karmaPowers: KarmaPowersGettersAndSetters,
    skills: SkillSettingsGettersAndSetters,
    talents: { [Field in keyof CharacterTalents]: [CharacterTalents[Field], (val: CharacterTalents[Field]) => void] },
    inventory: { [Field in keyof CharacterInventory]: [CharacterInventory[Field], (val: CharacterInventory[Field]) => void] },
    background: { [Field in keyof CharacterBackground]: [CharacterBackground[Field], (val: CharacterBackground[Field]) => void] },
    // TODO Add character object

}
export type CharacterManager = {
    characterList: string[]
    createCharacter: () => void
    deleteCharacter: (id: string) => void
    exportCharacter: (id?: string) => void
    importCharacter: (event: ChangeEvent<HTMLInputElement>) => void,
    setCurrentCharacter: React.Dispatch<React.SetStateAction<string>>,
    currentCharacter: string
}
export const getOCData = (ocData: OCSaveData, setOCData: (value: (((prevState: OCSaveData) => OCSaveData) | OCSaveData)) => void): OCSaveDataWithState => {
    const {skills, inventory, background, talents, karmaPowers} = ocData;

    return {
        background: {
            playerName: [background.playerName, val => setOCData({...ocData, background: {...background, playerName: val}})],
            characterName: [background.characterName, val => setOCData({...ocData, background: {...background, characterName: val}})],
            characterImageData: [background.characterImageData, val => setOCData({...ocData, background: {...background, characterImageData: val}})],
            gearOfDestinyImageData: [background.gearOfDestinyImageData, val => setOCData({...ocData, background: {...background, gearOfDestinyImageData: val}})],
            age: [background.age, val => setOCData({...ocData, background: {...background, age: val}})],
            gender: [background.gender, val => setOCData({...ocData, background: {...background, gender: val}})],
            height: [background.height, val => setOCData({...ocData, background: {...background, height: val}})],
            weight: [background.weight, val => setOCData({...ocData, background: {...background, weight: val}})],
            karmaSpecialty: [background.karmaSpecialty, val => setOCData({...ocData, background: {...background, karmaSpecialty: val}})],
            study: [background.study, val => setOCData({...ocData, background: {...background, study: val}})],
            affiliation: [background.affiliation, val => setOCData({...ocData, background: {...background, affiliation: val}})],
            background: [background.background, val => setOCData({...ocData, background: {...background, background: val}})],
            traits: [background.traits, val => setOCData({...ocData, background: {...background, traits: val}})],
            flaws: [background.flaws, val => setOCData({...ocData, background: {...background, flaws: val}})],
            level: [background.level, val => setOCData({...ocData, background: {...background, level: val}})],
            karmaEquipmentConfiguration: [background.karmaEquipmentConfiguration, val => setOCData({...ocData, background: {...background, karmaEquipmentConfiguration: val}})]
        }, inventory: {
            "medKits": [inventory.medKits, val => setOCData({...ocData, inventory: {...inventory, medKits: val}})],
            merits: [inventory.merits, val => setOCData({...ocData, inventory: {...inventory, merits: val}})],
            "positiveKarma": [inventory.positiveKarma, val => setOCData({...ocData, inventory: {...inventory, positiveKarma: val}})],
            "negativeKarma": [inventory.negativeKarma, val => setOCData({...ocData, inventory: {...inventory, negativeKarma: val}})],
            "karmaPool": [inventory.karmaPool, val => setOCData({...ocData, inventory: {...inventory, karmaPool: val}})],
            "extraKarma": [inventory.extraKarma, val => setOCData({...ocData, inventory: {...inventory, extraKarma: val}})],
            payback: [inventory.payback, val => setOCData({...ocData, inventory: {...inventory, payback: val}})],
            currentHP: [inventory.currentHP, val => setOCData({...ocData, inventory: {...inventory, currentHP: val}})],
            items: [inventory.items, val => setOCData({...ocData, inventory: {...inventory, items: val}})],
            otherSkills: [inventory.otherSkills, val => setOCData({...ocData, inventory: {...inventory, otherSkills: val}})]
        }, karmaPowers: {
            basicAttack: [karmaPowers.basicAttack, val => setOCData({...ocData, karmaPowers: {...karmaPowers, basicAttack: val}})],
            basicCombo: [karmaPowers.basicCombo, val => setOCData({...ocData, karmaPowers: {...karmaPowers, basicCombo: val}})],
            basicSignature: [karmaPowers.basicSignature, val => setOCData({...ocData, karmaPowers: {...karmaPowers, basicSignature: val}})],
            basicDefense: [karmaPowers.basicDefense, val => setOCData({...ocData, karmaPowers: {...karmaPowers, basicDefense: val}})],
            basic2Attack: [karmaPowers.basic2Attack, val => setOCData({...ocData, karmaPowers: {...karmaPowers, basic2Attack: val}})],
            basic2Combo: [karmaPowers.basic2Combo, val => setOCData({...ocData, karmaPowers: {...karmaPowers, basic2Combo: val}})],
            basic2Signature: [karmaPowers.basic2Signature, val => setOCData({...ocData, karmaPowers: {...karmaPowers, basic2Signature: val}})],
            basic2Defense: [karmaPowers.basic2Defense, val => setOCData({...ocData, karmaPowers: {...karmaPowers, basic2Defense: val}})],
            "advancedAttack": [karmaPowers.advancedAttack, val => setOCData({...ocData, karmaPowers: {...karmaPowers, advancedAttack: val}})],
            "advancedCombo": [karmaPowers.advancedCombo, val => setOCData({...ocData, karmaPowers: {...karmaPowers, advancedCombo: val}})],
            "advancedSignature": [karmaPowers.advancedSignature, val => setOCData({...ocData, karmaPowers: {...karmaPowers, advancedSignature: val}})],
            "advancedDefense": [karmaPowers.advancedDefense, val => setOCData({...ocData, karmaPowers: {...karmaPowers, advancedDefense: val}})],
            "advanced2Attack": [karmaPowers.advanced2Attack, val => setOCData({...ocData, karmaPowers: {...karmaPowers, advanced2Attack: val}})],
            "advanced2Combo": [karmaPowers.advanced2Combo, val => setOCData({...ocData, karmaPowers: {...karmaPowers, advanced2Combo: val}})],
            "advanced2Signature": [karmaPowers.advanced2Signature, val => setOCData({...ocData, karmaPowers: {...karmaPowers, advanced2Signature: val}})],
            "advanced2Defense": [karmaPowers.advanced2Defense, val => setOCData({...ocData, karmaPowers: {...karmaPowers, advanced2Defense: val}})],
            "basicLocomotion": [karmaPowers.basicLocomotion, val => setOCData({...ocData, karmaPowers: {...karmaPowers, basicLocomotion: val}})],
            "basic2Locomotion": [karmaPowers.basic2Locomotion, val => setOCData({...ocData, karmaPowers: {...karmaPowers, basic2Locomotion: val}})],
            "advancedLocomotion": [karmaPowers.advancedLocomotion, val => setOCData({...ocData, karmaPowers: {...karmaPowers, advancedLocomotion: val}})],
            "advanced2Locomotion": [karmaPowers.advanced2Locomotion, val => setOCData({...ocData, karmaPowers: {...karmaPowers, advanced2Locomotion: val}})],
            "selectedSwapPower": [karmaPowers.selectedSwapPower, val => setOCData({...ocData, karmaPowers: {...karmaPowers, selectedSwapPower: val}})],
            "selectedAdvancedSwapPower": [karmaPowers.selectedAdvancedSwapPower, val => setOCData({...ocData, karmaPowers: {...karmaPowers, selectedAdvancedSwapPower: val}})],
            "selectedAttackTier": [karmaPowers.selectedAttackTier, val => setOCData({...ocData, karmaPowers: {...karmaPowers, selectedAttackTier: val}})],
            "selectedDefenseTier": [karmaPowers.selectedDefenseTier, val => setOCData({...ocData, karmaPowers: {...karmaPowers, selectedDefenseTier: val}})],
            "selectedComboTier": [karmaPowers.selectedComboTier, val => setOCData({...ocData, karmaPowers: {...karmaPowers, selectedComboTier: val}})],
            "selectedSignatureTier": [karmaPowers.selectedSignatureTier, val => setOCData({...ocData, karmaPowers: {...karmaPowers, selectedSignatureTier: val}})],
            "selectedLocomotionTier": [karmaPowers.selectedLocomotionTier, val => setOCData({...ocData, karmaPowers: {...karmaPowers, selectedLocomotionTier: val}})],
            karmaPowerDescriptions: [karmaPowers.karmaPowerDescriptions, val => setOCData({...ocData, karmaPowers: {...karmaPowers, karmaPowerDescriptions: val}})],
        }, talents: {
            aura: [talents.aura, val => setOCData({...ocData, talents: {...talents, aura: val}})],
            technique: [talents.technique, val => setOCData({...ocData, talents: {...talents, technique: val}})],
            stamina: [talents.stamina, val => setOCData({...ocData, talents: {...talents, stamina: val}})],
            function: [talents.function, val => setOCData({...ocData, talents: {...talents, function: val}})],
            willpower: [talents.willpower, val => setOCData({...ocData, talents: {...talents, willpower: val}})],
            agility: [talents.agility, val => setOCData({...ocData, talents: {...talents, agility: val}})],
            bonusAura: [talents.bonusAura, val => setOCData({...ocData, talents: {...talents, bonusAura: val}})],
            bonusTechnique: [talents.bonusTechnique, val => setOCData({...ocData, talents: {...talents, bonusTechnique: val}})],
            bonusStamina: [talents.bonusStamina, val => setOCData({...ocData, talents: {...talents, bonusStamina: val}})],
            bonusFunction: [talents.bonusFunction, val => setOCData({...ocData, talents: {...talents, bonusFunction: val}})],
            bonusWillpower: [talents.bonusWillpower, val => setOCData({...ocData, talents: {...talents, bonusWillpower: val}})],
            bonusAgility: [talents.bonusAgility, val => setOCData({...ocData, talents: {...talents, bonusAgility: val}})]
        },
        skills: {
            unlockedSkills: [skills.unlockedSkills, val => setOCData({...ocData, skills: {...skills, unlockedSkills: val}})],
            "talent1": [skills.talent1, val => setOCData({...ocData, skills: {...skills, "talent1": val}})],
            "talent2": [skills.talent2, val => setOCData({...ocData, skills: {...skills, "talent2": val}})],
            "vitalityEnhance": [skills.vitalityEnhance, val => setOCData({...ocData, skills: {...skills, "vitalityEnhance": val}})],
            "talent3": [skills.talent3, val => setOCData({...ocData, skills: {...skills, talent3: val}})],
            "talent4": [skills.talent4, val => setOCData({...ocData, skills: {...skills, talent4: val}})],
            "talentedBoost": [skills.talentedBoost, val => setOCData({...ocData, skills: {...skills, talentedBoost: val}})],
            level5TalentBoost: [skills.level5TalentBoost, val => setOCData({...ocData, skills: {...skills, level5TalentBoost: val}})]
        }
    }
}
export const assembleCharacterData = (characterList: string[], setCharacterList: (value: (((prevState: string[]) => string[]) | string[])) => void, setCurrentCharacter: (value: (((prevState: string) => string) | string)) => void, deleteCurrentCharacter: () => void, currentCharacter: string, ocData: OCSaveData) => {
    return {
        characterList,
        createCharacter() {
            const newCharacterID = crypto.randomUUID();
            setCharacterList([...characterList, newCharacterID])
            setCurrentCharacter(newCharacterID)
        },
        deleteCharacter(id: string) {
            const updatedCharacterList = characterList.filter(value => value !== id);
            deleteCurrentCharacter();
            setCharacterList(updatedCharacterList);
            // Go to first character if there are no characters left, otherwise set character to first character
            if (id === currentCharacter) {
                if (updatedCharacterList.length > 0) {
                    setCurrentCharacter(updatedCharacterList[0]);
                } else {
                    const newCharacterID = crypto.randomUUID();
                    setCurrentCharacter(newCharacterID)
                    setCharacterList([newCharacterID])
                }
            }
        },
        exportCharacter(id: string = currentCharacter) {
            const dataStr = `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(localStorage.getItem(id), null, 2))}`;
            const download = document.createElement('a');
            download.setAttribute('href', dataStr);
            download.setAttribute('download', sanitize(ocData.background.characterName) + '.json');
            document.body.appendChild(download);
            download.click();
            download.remove();
        },
        importCharacter(event: ChangeEvent<HTMLInputElement>) {
            if (event.target.files) {
                const fileReader = new FileReader();
                fileReader.readAsText(event.target.files[0], "UTF-8");
                fileReader.onload = e => {
                    if (e.target !== null && typeof e.target.result === "string") {
                        const newCharacterID = crypto.randomUUID();
                        localStorage.setItem(newCharacterID, JSON.parse(e.target.result))
                        setCharacterList([...characterList, newCharacterID])
                    }
                };
            }
        },
        setCurrentCharacter,
        currentCharacter
    };
}