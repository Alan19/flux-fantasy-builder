import {FormControl, InputLabel, MenuItem, Select, TableCell, TableRow, TextField} from "@mui/material";
import {PowerLoadoutSettings, PowerTier, PowerType} from "./UsePowerLoadoutSettings";

import {isSwapPower, KarmaPowerLoadout, locomotionCosts, locomotionRanges, SpecialtyCosts, SwapPowerChoices} from "./KarmaPowerLoadout.ts";
import {KarmaSkills, SkillName} from "./UseSkillTree.ts";

function getNamesForPowerType(powerType: PowerType, powerLoadoutSettings: PowerLoadoutSettings): [string, string, string, string] {
    return [powerLoadoutSettings[0][powerType][0], powerLoadoutSettings[1][powerType][0], powerLoadoutSettings[2][powerType][0], powerLoadoutSettings[3][powerType][0]]
}

function getCostLabel(baseCost: number, paybackPoints: number) {
    return baseCost + (paybackPoints >= 50 ? 2 : 0);
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

export function getTierName(power: PowerTier | string) {
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
    const [currentPowerTierForPower] = powerLoadoutSettings[powerType];
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
    return <TableRow>
        <TableCell style={{paddingTop: 10}}>
            {/*Textbox if the user is in editing mode, dropdown if the user is in-play mode*/}
            {editablePowerInfo ? <TextField fullWidth value={editablePowerInfo[1]} onChange={event => editablePowerInfo[2](event.target.value)} size={"small"} label={label} variant="outlined"/>
                : <FormControl fullWidth style={{maxWidth: 200}}>
                    <InputLabel>{label}</InputLabel>
                    <Select label={label}
                            fullWidth
                            onChange={event => setAttackPowerTier(event.target.value)}
                            value={currentPowerTierForPower}
                            size={"small"}>
                        <MenuItem value={powerLoadoutSettings.swapPower[0]}>{powerLoadoutSettings.swapPower[0]}</MenuItem>
                        <MenuItem value={powerLoadoutSettings.advancedSwapPower[0]} disabled={!selectedSkills.includes(KarmaSkills.advancedAttacks)}>{powerLoadoutSettings.advancedSwapPower[0]}</MenuItem>
                        {getNamesForPowerType(powerType, powerLoadoutSettings).map((value, index) => <MenuItem disabled={isMenuItemDisabled(selectedSkills, index)} key={index} value={index}>{value}</MenuItem>)}
                    </Select>
                </FormControl>}
        </TableCell>
        <TableCell align="right">{isSwapPower(tierToDisplay) ? "" : getCostLabel(getBaseCost(powerType, tierToDisplay, karmaPowerLoadout.costs), props.paybackPoints)}{paybackPoints >= 50 ? "(⬆)" : ""}</TableCell>
        <TableCell align="right">{isAttack && (isSwapPower(tierToDisplay) ? selectedSwapPower?.damage : karmaPowerLoadout[powerType].damage[tierToDisplay])}</TableCell>
        <TableCell align="right">{isAttack && (isSwapPower(tierToDisplay) ? selectedSwapPower?.range : karmaPowerLoadout[powerType].range[tierToDisplay])}</TableCell>
        {isAttack && <TableCell align="right">{(isSwapPower(tierToDisplay) ? selectedSwapPower?.effect : karmaPowerLoadout.effects[tierToDisplay])}</TableCell>}
        {powerType === PowerType.defense && !isSwapPower(tierToDisplay) && <TableCell align="right">+{karmaPowerLoadout.defense.effect[tierToDisplay]} to DEF on next turn.</TableCell>}
        {powerType === PowerType.locomotion && !isSwapPower(tierToDisplay) && <TableCell align="right">+{locomotionRanges[tierToDisplay]} MOV</TableCell>}
    </TableRow>
}
