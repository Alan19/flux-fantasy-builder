import {useLocalStorage} from "usehooks-ts";
import {Affiliation, KarmaSpecialty, Study} from "../utils/types/KarmaSpecialty.ts";
import {Flaws, Traits} from "../utils/types/Traits.ts";
import {createToggleFunction} from "../utils/utils.ts";
import {SetStateAction} from "react";

export function useCharacterSheetFields() {
    // Character creation choices
    const [playerName, setPlayerName] = useLocalStorage('player-name', '')
    const [characterName, setCharacterName] = useLocalStorage('character-name', '')
    const [characterImageData, setCharacterImageData] = useLocalStorage('character-image-data', '')
    const [gearOfDestiny, setGearOfDestiny] = useLocalStorage('gear-of-destiny-image-data', '')
    const [age, setAge] = useLocalStorage('age', '')
    const [gender, setGender] = useLocalStorage('gender', '')
    const [height, setHeight] = useLocalStorage('height', '')
    const [weight, setWeight] = useLocalStorage('weight', '')
    const [karmaSpecialty, setKarmaSpecialty] = useLocalStorage<KarmaSpecialty | undefined>('karma-specialty', undefined)
    const [study, setStudy] = useLocalStorage<Study | undefined>('study', undefined)
    const [affiliation, setAffiliation] = useLocalStorage<Affiliation | undefined>('affiliation', undefined)
    const [background, setBackground] = useLocalStorage("background", "")
    const [traits, setTraits] = useLocalStorage<Traits[]>('trait-list', [])
    const [flaws, setFlaws] = useLocalStorage<Flaws[]>('flaw-list', [])

    const toggleTrait = createToggleFunction(setTraits);
    const toggleFlaw = createToggleFunction(setFlaws);

    // Attributes
    const [aura, setAura] = useLocalStorage<number>('aura', 1)
    const [technique, setTechnique] = useLocalStorage<number>('technique', 1)
    const [stamina, setStamina] = useLocalStorage<number>('stamina', 1)
    const [functionStat, setFunction] = useLocalStorage<number>('function', 1)
    const [willpower, setWillpower] = useLocalStorage<number>('willpower', 1)
    const [agility, setAgility] = useLocalStorage<number>('agility', 1)


    // Inventory and other editable information
    const [level, setLevel] = useLocalStorage('level', 1)
    const [medKits, setMedKits] = useLocalStorage('med-kits', 2)
    const [merits, setMerits] = useLocalStorage('merits', 20)
    const [configuration, setConfiguration] = useLocalStorage('configuration', "")
    const [positiveKarma, setPositiveKarma] = useLocalStorage<number>('positive-karma', 0)
    const [negativeKarma, setNegativeKarma] = useLocalStorage<number>('negative-karma', 0)
    const [karmaPool, setKarmaPool] = useLocalStorage<number>('karma-pool', 0)
    const [extraKarma, setExtraKarma] = useLocalStorage<number>('extra-karma', 0)
    const [paybackPoints, setPaybackPoints] = useLocalStorage<number>('payback-points', 0)
    const [currentHP, setCurrentHP] = useLocalStorage<number>('current-hp', 0)
    const [items, setItems] = useLocalStorage('items', '')
    const [otherSkills, setOtherSkills] = useLocalStorage('other-skills', '')

    function getTalentHook(talent: 'Aura' | 'Stamina' | 'Agility' | 'Technique' | 'Willpower' | 'Function'): [number, (value: SetStateAction<number>) => void] {
        switch (talent) {
            case "Agility":
                return [agility, setAgility]
            case "Technique":
                return [technique, setTechnique]
            case "Willpower":
                return [willpower, setWillpower]
            case "Function":
                return [functionStat, setFunction]
            case 'Aura':
                return [aura, setAura]
            case 'Stamina':
                return [stamina, setStamina]
        }
    }

    return {
        playerName,
        setPlayerName,
        characterName,
        setCharacterName,
        age,
        setAge,
        gender,
        setGender,
        height,
        setHeight,
        weight,
        setWeight,
        karmaSpecialty,
        setKarmaSpecialty,
        study,
        setStudy,
        affiliation,
        setAffiliation,
        background,
        setBackground,
        aura,
        setAura,
        technique,
        setTechnique,
        stamina,
        setStamina,
        function: functionStat,
        setFunction,
        willpower,
        setWillpower,
        agility,
        setAgility,
        level,
        setLevel,
        medKits,
        setMedKits,
        merits,
        setMerits,
        configuration,
        setConfiguration,
        characterImageData,
        setCharacterImageData,
        positiveKarma,
        setPositiveKarma,
        negativeKarma,
        setNegativeKarma,
        gearOfDestiny,
        setGearOfDestiny,
        karmaPool,
        setKarmaPool,
        paybackPoints,
        setPaybackPoints,
        currentHP,
        setCurrentHP,
        traits,
        toggleTrait,
        flaws,
        toggleFlaw,
        items,
        setItems,
        otherSkills,
        setOtherSkills,
        setTraits,
        setFlaws,
        getTalentHook,
        extraKarma,
        setExtraKarma
    }
}

