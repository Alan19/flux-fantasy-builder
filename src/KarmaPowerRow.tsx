import {PowerLoadoutSettings, PowerTier, PowerType} from "./UsePowerLoadoutSettings";
import {isSwapPower, KarmaPowerLoadout, locomotionCosts, locomotionRanges, SpecialtyCosts, SwapPowerChoices} from "./KarmaPowerLoadout.ts";
import {KarmaSkills, PersonalitySkills, SkillName} from "./UseSkillTree.ts";
import {BeerCSSTextField} from "./beer_wrappers/BeerCSSTextField.tsx";
import {BeerCSSSelect} from "./beer_wrappers/BeerCSSSelect.tsx";
import _ from "lodash";

function getNamesForPowerType(powerType: PowerType, powerLoadoutSettings: PowerLoadoutSettings): [string, string, string, string] {
    return [powerLoadoutSettings[0][powerType][0], powerLoadoutSettings[1][powerType][0], powerLoadoutSettings[2][powerType][0], powerLoadoutSettings[3][powerType][0]]
}

function getPowerCost(baseCost: number, paybackPoints: number, isCombo = false, combo2Unlocked = false, combo3Unlocked = false) {
    let cost = baseCost;
    if (paybackPoints >= 50) {
        cost += 2;
    }
    if (isCombo && combo2Unlocked) {
        cost -= 10
    }
    if (isCombo && combo3Unlocked) {
        cost -= 5
    }
    return Math.max(cost, 0);
}

function getBaseCost(powerType: PowerType, powerTier: PowerTier, costsForSpecialty: SpecialtyCosts) {
    switch (powerType) {
        case PowerType.attack:
        case PowerType.defense:
            return costsForSpecialty.attackAndDefense[powerTier];
        case PowerType.combo:
        case PowerType.signature:
            return costsForSpecialty[powerType][powerTier];
        case PowerType.locomotion:
            return locomotionCosts[powerTier];
    }
}

function getTierName(power: PowerTier | string) {
// TODO Add label for advanced swap power
    if (typeof power === 'string') {
        return "Swap Power"
    }
    switch (power) {
        case PowerTier.basic:
            return "Basic"
        case PowerTier.basic2:
            return "Basic Tier 2"
        case PowerTier.advanced:
            return "Advanced"
        case PowerTier.advanced2:
            return "Advanced Tier 2"
    }
}

export function KarmaPowerRow(props: Readonly<{
    powerType: PowerType
    karmaPowerLoadout: KarmaPowerLoadout,
    powerLoadoutSettings: PowerLoadoutSettings,
    swapPowers: SwapPowerChoices,
    paybackPoints: number,
    selectedSkills: SkillName[],
    editablePowerInfo?: [PowerTier, string, ((value: string) => void)],
}>) {
    const {powerType, editablePowerInfo, paybackPoints, karmaPowerLoadout, powerLoadoutSettings, selectedSkills, swapPowers} = props;
    const isAttack = powerType === PowerType.attack || powerType === PowerType.combo || powerType === PowerType.signature
    const [currentPowerTierForPower, setCurrentPowerTierForPower] = powerLoadoutSettings[powerType];
    const [, setAttackPowerTier] = powerLoadoutSettings.attack;
    const tierToDisplay = editablePowerInfo?.[0] ?? currentPowerTierForPower;
    const label = `${getTierName(tierToDisplay)} ${powerType.charAt(0).toUpperCase()}${powerType.substring(1)}`;

    function isMenuItemDisabled(skills: SkillName[], tier: number) {
        const hasBasic = tier === PowerTier.basic;
        const hasBasic2 = tier === PowerTier.basic2 && skills.includes(KarmaSkills.tier2BasicAttacks);
        const hasAdvanced = tier === PowerTier.advanced && skills.includes(KarmaSkills.advancedAttacks);
        const hasAdvanced2 = tier === PowerTier.advanced2 && skills.includes(KarmaSkills.advancedAttacks2);
        return !(hasBasic || hasBasic2 || hasAdvanced || hasAdvanced2);
    }

    const selectedSwapPower = swapPowers.basic.concat(swapPowers.advanced).find(value => value.name === powerLoadoutSettings.attack[0]);

    function getPowerSelection() {
        return <BeerCSSSelect label={label}
                              onChange={event => {
                                  if (powerType === PowerType.attack) {
                                      setAttackPowerTier(event.target.value)
                                  } else {
                                      setCurrentPowerTierForPower(event.target.value as unknown as PowerTier);
                                  }
                              }}
                              value={currentPowerTierForPower}
                              inputSize={"small"}
        >
            {powerType === PowerType.attack && <option disabled={!powerLoadoutSettings.swapPower[0]} value={powerLoadoutSettings.swapPower[0]}>{powerLoadoutSettings.swapPower[0] ?? "Unselected Basic Swap Power"}</option>}
            {powerType === PowerType.attack && <option value={powerLoadoutSettings.advancedSwapPower[0]} disabled={!selectedSkills.includes(KarmaSkills.advancedAttacks) || !powerLoadoutSettings.advancedSwapPower[0]}>{powerLoadoutSettings.advancedSwapPower[0] ?? "Unselected Advanced Swap Power"}</option>}
            {getNamesForPowerType(powerType, powerLoadoutSettings).map((value, index) => <option disabled={isMenuItemDisabled(selectedSkills, index)} key={index} value={index}>{_.isEmpty(value) ? `Unnamed ${getTierName(index)} ${powerType.charAt(0).toUpperCase()}${powerType.substring(1)}` : value}</option>)}
        </BeerCSSSelect>;
    }

    return <tr>
        <td style={{paddingTop: 10}}>
            {/*Textbox if the user is in editing mode, dropdown if the user is in-play mode*/}
            {editablePowerInfo ? <BeerCSSTextField value={editablePowerInfo[1]} onChange={event => editablePowerInfo[2](event.target.value)} label={label}/> : getPowerSelection()}
        </td>
        <td align="right">
            {isSwapPower(tierToDisplay) ? "" : getPowerCost(getBaseCost(powerType, tierToDisplay, karmaPowerLoadout.costs), props.paybackPoints, powerType === PowerType.combo, selectedSkills.includes(PersonalitySkills.combo2), selectedSkills.includes(PersonalitySkills.combo3))}{paybackPoints >= 50 ? "(⬆)" : ""}
        </td>
        <td align="right">{isAttack && (isSwapPower(tierToDisplay) ? selectedSwapPower?.damage : karmaPowerLoadout[powerType].damage[tierToDisplay])}</td>
        <td align="right">{isAttack && (isSwapPower(tierToDisplay) ? selectedSwapPower?.range : karmaPowerLoadout[powerType].range[tierToDisplay])}</td>
        {isAttack && <td align="right">{(isSwapPower(tierToDisplay) ? selectedSwapPower?.effect : karmaPowerLoadout.effects[tierToDisplay])}</td>}
        {powerType === PowerType.defense && !isSwapPower(tierToDisplay) && <td align="right">+{karmaPowerLoadout.defense.effect[tierToDisplay]} to DEF on next turn.</td>}
        {powerType === PowerType.locomotion && !isSwapPower(tierToDisplay) && <td align="right">+{locomotionRanges[tierToDisplay]} MOV</td>}
    </tr>
}
