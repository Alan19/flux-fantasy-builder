import {useLocalStorage} from "usehooks-ts";
import {KarmaSpecialty} from "./KarmaSpecialty.tsx";
import {Affiliation} from "./CharacterSheet.tsx";
import {Study} from "./GetStudies.ts";

export function useCharacterSheetFields() {
    // Character creation choices
    const [playerName, setPlayerName] = useLocalStorage('player-name', '')
    const [characterName, setCharacterName] = useLocalStorage('character-name', '')
    const [characterImageURL, setCharacterImageURL] = useLocalStorage('character-image-url', '')
    const [age, setAge] = useLocalStorage('age', '')
    const [gender, setGender] = useLocalStorage('gender', '')
    const [height, setHeight] = useLocalStorage('height', '')
    const [weight, setWeight] = useLocalStorage('weight', '')
    const [karmaSpecialty, setKarmaSpecialty] = useLocalStorage<KarmaSpecialty | undefined>('karma-specialty', undefined)
    const [study, setStudy] = useLocalStorage<Study | undefined>('study', undefined)
    const [affiliation, setAffiliation] = useLocalStorage<Affiliation | undefined>('affiliation', undefined)
    const [background, setBackground] = useLocalStorage("background", "")

    // Attributes
    const [aura, setAura] = useLocalStorage<number | undefined>('aura', undefined)
    const [technique, setTechnique] = useLocalStorage<number | undefined>('technique', undefined)
    const [stamina, setStamina] = useLocalStorage<number | undefined>('stamina', undefined)
    const [functionStat, setFunction] = useLocalStorage<number | undefined>('function', undefined)
    const [willpower, setWillpower] = useLocalStorage<number | undefined>('willpower', undefined)
    const [agility, setAgility] = useLocalStorage<number | undefined>('agility', undefined)

    // Karma Power Names
    const [basicAttack, setBasicAttack] = useLocalStorage('basic-attack', '')
    const [basicCombo, setBasicCombo] = useLocalStorage('basic-combo', '')
    const [basicSignature, setBasicSignature] = useLocalStorage('basic-signature', '')
    const [basicDefense, setBasicDefense] = useLocalStorage('basic-defense', '')
    const [locomotion, setLocomotion] = useLocalStorage('locomotion', '')
    const [selectedSwapPower, setSelectedSwapPower] = useLocalStorage<string>('selected-swap-power', '')

    // Inventory and other editable information
    const [level, setLevel] = useLocalStorage('level', 1)
    const [medKits, setMedKits] = useLocalStorage('med-kits', 2)
    const [merits, setMerits] = useLocalStorage('merits', 20)
    const [configuration, setConfiguration] = useLocalStorage('configuration', "")
    const [positiveKarma, setPositiveKarma] = useLocalStorage<number>('positive-karma', 0)
    const [negativeKarma, setNegativeKarma] = useLocalStorage<number>('negative-karma', 0)

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
        basicAttack,
        setBasicAttack,
        basicCombo,
        setBasicCombo,
        basicSignature,
        setBasicSignature,
        basicDefense,
        setBasicDefense,
        locomotion,
        setLocomotion,
        selectedSwapPower,
        setSelectedSwapPower,
        characterImageURL,
        setCharacterImageURL,
        positiveKarma,
        setPositiveKarma,
        negativeKarma,
        setNegativeKarma
    }
}