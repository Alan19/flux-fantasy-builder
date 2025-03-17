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

export type PowerLoadoutSettings = Record<PowerTier, { [type in PowerType]: [string, React.Dispatch<React.SetStateAction<string>>] }>
    & Record<'swapPower', [string, React.Dispatch<React.SetStateAction<string>>]>
    & Record<'advancedSwapPower', [string, React.Dispatch<React.SetStateAction<string>>]>
    & Record<PowerType.defense | PowerType.combo | PowerType.signature | PowerType.locomotion, [PowerTier, React.Dispatch<React.SetStateAction<PowerTier>>]>
    & Record<PowerType.attack, [PowerTier | string, React.Dispatch<React.SetStateAction<PowerTier | string>>]>;

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
        [PowerType.locomotion]: [selectedLocomotionTier, setSelectedLocomotionTier]
    }
}