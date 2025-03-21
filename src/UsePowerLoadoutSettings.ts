import {useLocalStorage} from "usehooks-ts";
import * as React from "react";

export enum PowerType {
    attack = "attack",
    defense = "defense",
    combo = "combo",
    signature = "signature",
    locomotion = "locomotion",
}

export enum PowerTier {
    basic,
    basic2,
    advanced,
    advanced2
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
    selectedSwapPower: string;
    selectedAdvancedSwapPower: string;
    selectedAttackTier: PowerTier | string;
    selectedDefenseTier: PowerTier;
    selectedComboTier: PowerTier;
    selectedSignatureTier: PowerTier;
    selectedLocomotionTier: PowerTier;
}

export type PowerLoadoutSettings = Record<PowerTier, { [type in PowerType]: [string, React.Dispatch<React.SetStateAction<string>>] }>
    & Record<'swapPower', [string, React.Dispatch<React.SetStateAction<string>>]>
    & Record<'advancedSwapPower', [string, React.Dispatch<React.SetStateAction<string>>]>
    & Record<PowerType.defense | PowerType.combo | PowerType.signature | PowerType.locomotion, [PowerTier, React.Dispatch<React.SetStateAction<PowerTier>>]>
    & Record<PowerType.attack, [PowerTier | string, React.Dispatch<React.SetStateAction<PowerTier | string>>]>
    & Record<'serializePowerLoadoutState', () => PowerLoadoutState>
    & Record<'deserializePowerLoadoutState', (json: string) => void>;

export function usePowerLoadoutSettings(): PowerLoadoutSettings {
    // Karma Power Names
    const [basicAttack, setBasicAttack] = useLocalStorage('basic-attack', '')
    const [basicCombo, setBasicCombo] = useLocalStorage('basic-combo', '')
    const [basicSignature, setBasicSignature] = useLocalStorage('basic-signature', '')
    const [basicDefense, setBasicDefense] = useLocalStorage('basic-defense', '')
    const [basic2Attack, setBasic2Attack] = useLocalStorage('basic-2-attack', '')
    const [basic2Combo, setBasic2Combo] = useLocalStorage('basic-2-combo', '')
    const [basic2Signature, setBasic2Signature] = useLocalStorage('basic-2-signature', '')
    const [basic2Defense, setBasic2Defense] = useLocalStorage('basic-2-defense', '')
    const [advancedAttack, setAdvancedAttack] = useLocalStorage('advanced-attack', '')
    const [advancedCombo, setAdvancedCombo] = useLocalStorage('advanced-combo', '')
    const [advancedSignature, setAdvancedSignature] = useLocalStorage('advanced-signature', '')
    const [advancedDefense, setAdvancedDefense] = useLocalStorage('advanced-defense', '')
    const [advanced2Attack, setAdvanced2Attack] = useLocalStorage('advanced-2-attack', '')
    const [advanced2Combo, setAdvanced2Combo] = useLocalStorage('advanced-2-combo', '')
    const [advanced2Signature, setAdvanced2Signature] = useLocalStorage('advanced-2-signature', '')
    const [advanced2Defense, setAdvanced2Defense] = useLocalStorage('advanced-2-defense', '')
    const [basicLocomotion, setBasicLocomotion] = useLocalStorage('basic-locomotion', '')
    const [basic2Locomotion, setBasic2Locomotion] = useLocalStorage('basic-2-locomotion', '')
    const [advancedLocomotion, setAdvancedLocomotion] = useLocalStorage('advanced-locomotion', '')
    const [advanced2Locomotion, setAdvanced2Locomotion] = useLocalStorage('advanced-2-locomotion', '')
    const [selectedSwapPower, setSelectedSwapPower] = useLocalStorage<string>('selected-swap-power', '')
    const [selectedAdvancedSwapPower, setSelectedAdvancedSwapPower] = useLocalStorage<string>('selected-advanced-swap-power', '')

    // String option is a swap power
    const [selectedAttackTier, setSelectedAttackTier] = useLocalStorage<PowerTier | string>('selected-attack-tier', PowerTier.basic)
    const [selectedDefenseTier, setSelectedDefenseTier] = useLocalStorage<PowerTier>('selected-defense-tier', PowerTier.basic)
    const [selectedComboTier, setSelectedComboTier] = useLocalStorage<PowerTier>('selected-combo-tier', PowerTier.basic)
    const [selectedSignatureTier, setSelectedSignatureTier] = useLocalStorage<PowerTier>('selected-signature-tier', PowerTier.basic)
    const [selectedLocomotionTier, setSelectedLocomotionTier] = useLocalStorage<PowerTier>('selected-locomotion-tier', PowerTier.basic)

    const serializeState = (): PowerLoadoutState => ({
        advanced2Attack: advanced2Attack,
        advanced2Combo: advanced2Combo,
        advanced2Defense: advanced2Defense,
        advanced2Locomotion: advanced2Locomotion,
        advanced2Signature: advanced2Signature,
        advancedAttack: advancedAttack,
        advancedCombo: advancedCombo,
        advancedDefense: advancedDefense,
        advancedLocomotion: advancedLocomotion,
        advancedSignature: advancedSignature,
        basic2Attack: basic2Attack,
        basic2Combo: basic2Combo,
        basic2Defense: basic2Defense,
        basic2Locomotion: basic2Locomotion,
        basic2Signature: basic2Signature,
        basicAttack: basicAttack,
        basicCombo: basicCombo,
        basicDefense: basicDefense,
        basicLocomotion: basicLocomotion,
        basicSignature: basicSignature,
        selectedAdvancedSwapPower: selectedAdvancedSwapPower,
        selectedAttackTier: selectedAttackTier,
        selectedComboTier: selectedComboTier,
        selectedDefenseTier: selectedDefenseTier,
        selectedLocomotionTier: selectedLocomotionTier,
        selectedSignatureTier: selectedSignatureTier,
        selectedSwapPower: selectedSwapPower
    });

    return {
        [PowerTier.basic]: {
            attack: [basicAttack, setBasicAttack],
            defense: [basicDefense, setBasicDefense],
            combo: [basicCombo, setBasicCombo],
            signature: [basicSignature, setBasicSignature],
            locomotion: [basicLocomotion, setBasicLocomotion]
        },
        [PowerTier.basic2]: {
            attack: [basic2Attack, setBasic2Attack],
            defense: [basic2Defense, setBasic2Defense],
            combo: [basic2Combo, setBasic2Combo],
            signature: [basic2Signature, setBasic2Signature],
            locomotion: [basic2Locomotion, setBasic2Locomotion]
        },
        [PowerTier.advanced]: {
            attack: [advancedAttack, setAdvancedAttack],
            defense: [advancedDefense, setAdvancedDefense],
            combo: [advancedCombo, setAdvancedCombo],
            signature: [advancedSignature, setAdvancedSignature],
            locomotion: [advancedLocomotion, setAdvancedLocomotion]
        },
        [PowerTier.advanced2]: {
            attack: [advanced2Attack, setAdvanced2Attack],
            defense: [advanced2Defense, setAdvanced2Defense],
            combo: [advanced2Combo, setAdvanced2Combo],
            signature: [advanced2Signature, setAdvanced2Signature],
            locomotion: [advanced2Locomotion, setAdvanced2Locomotion]
        },
        swapPower: [selectedSwapPower, setSelectedSwapPower],
        advancedSwapPower: [selectedAdvancedSwapPower, setSelectedAdvancedSwapPower],
        [PowerType.attack]: [selectedAttackTier, setSelectedAttackTier],
        [PowerType.defense]: [selectedDefenseTier, setSelectedDefenseTier],
        [PowerType.combo]: [selectedComboTier, setSelectedComboTier],
        [PowerType.signature]: [selectedSignatureTier, setSelectedSignatureTier],
        [PowerType.locomotion]: [selectedLocomotionTier, setSelectedLocomotionTier],
        serializePowerLoadoutState: serializeState,
        deserializePowerLoadoutState(json: string) {
            const parsedJson = JSON.parse(json)
            setBasicAttack(parsedJson.basicAttack)
            setBasicCombo(parsedJson.basicCombo)
            setBasicSignature(parsedJson.basicSignature)
            setBasicDefense(parsedJson.basicDefense)
            setBasic2Attack(parsedJson.basic2Attack)
            setBasic2Combo(parsedJson.basic2Combo)
            setBasic2Signature(parsedJson.basic2Signature)
            setBasic2Defense(parsedJson.basic2Defense)
            setAdvancedAttack(parsedJson.advancedAttack)
            setAdvancedCombo(parsedJson.advancedCombo)
            setAdvancedSignature(parsedJson.advancedSignature)
            setAdvancedDefense(parsedJson.advancedDefense)
            setAdvanced2Attack(parsedJson.advanced2Attack)
            setAdvanced2Combo(parsedJson.advanced2Combo)
            setAdvanced2Signature(parsedJson.advanced2Signature)
            setAdvanced2Defense(parsedJson.advanced2Defense)
            setBasicLocomotion(parsedJson.basicLocomotion)
            setBasic2Locomotion(parsedJson.basic2Locomotion)
            setAdvancedLocomotion(parsedJson.advancedLocomotion)
            setAdvanced2Locomotion(parsedJson.advanced2Locomotion)
            setSelectedAttackTier(parsedJson.selectedAttackTier)
            setSelectedDefenseTier(parsedJson.selectedDefenseTier)
            setSelectedComboTier(parsedJson.selectedComboTier)
            setSelectedSignatureTier(parsedJson.selectedSignatureTier)
            setSelectedLocomotionTier(parsedJson.selectedLocomotionTier)
        }
    }
}