import {FormControl, InputLabel, MenuItem, Select, TableCell, TableRow, TextField} from "@mui/material";
import {PowerLoadoutSettings, PowerTier, PowerType} from "./UsePowerLoadoutSettings";

import {getTierName, KarmaPowerLoadout, locomotionCosts, locomotionRanges, SpecialtyCosts} from "./KarmaPowerLoadout.ts";
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

export function KarmaPowerRow(props: Readonly<{
    powerType: PowerType
    karmaPowerLoadout: KarmaPowerLoadout,
    powerLoadoutSettings: PowerLoadoutSettings,
    paybackPoints: number,
    selectedSkills: SkillName[],
    editablePowerInfo?: [PowerTier, string, ((value: string) => void)],
}>) {
    const {powerType, editablePowerInfo, paybackPoints, karmaPowerLoadout, powerLoadoutSettings, selectedSkills} = props;
    const isAttack = powerType === PowerType.attack || powerType === PowerType.combo || powerType === PowerType.signature
    const [currentPowerTierForPower, setCurrentPowerTierForPower] = powerLoadoutSettings[powerType];
    const tierToDisplay: PowerTier = editablePowerInfo?.[0] ?? currentPowerTierForPower;
    const label = `${getTierName(tierToDisplay)} ${powerType.charAt(0).toUpperCase()}${powerType.substring(1)}`;

    function isMenuItemDisabled(skills: SkillName[], tier: number) {
        const hasBasic = tier === PowerTier.basic;
        const hasBasic2 = tier === PowerTier.basic2 && skills.includes(KarmaSkills.tier2BasicAttacks);
        const hasAdvanced = tier === PowerTier.advanced && skills.includes(KarmaSkills.advancedAttacks);
        const hasAdvanced2 = tier === PowerTier.advanced2 && skills.includes(KarmaSkills.advancedAttacks2);
        return !(hasBasic || hasBasic2 || hasAdvanced || hasAdvanced2);
    }

    return <TableRow>
        <TableCell style={{paddingTop: 10}}>
            {/*Textbox if the user is in editing mode, dropdown if the user is in-play mode*/}
            {editablePowerInfo ? <TextField fullWidth value={editablePowerInfo[1]} onChange={event => editablePowerInfo[2](event.target.value)} size={"small"} label={label} variant="outlined"/>
                : <FormControl fullWidth style={{maxWidth: 200}}>
                    <InputLabel>{label}</InputLabel>
                    <Select label={label}
                            fullWidth
                            onChange={event => setCurrentPowerTierForPower(event.target.value as PowerTier)}
                            value={currentPowerTierForPower}
                            size={"small"}>
                        {getNamesForPowerType(powerType, powerLoadoutSettings).map((value, index) => <MenuItem disabled={isMenuItemDisabled(selectedSkills, index)} key={index} value={index}>{value}</MenuItem>)}
                        {/*TODO Add swap powers here*/}
                    </Select>
                </FormControl>}
        </TableCell>
        <TableCell align="right">{getCostLabel(getBaseCost(powerType, tierToDisplay, karmaPowerLoadout.costs), props.paybackPoints)}{paybackPoints >= 50 ? "(⬆)" : ""}</TableCell>
        <TableCell align="right">{isAttack && karmaPowerLoadout[powerType].damage[tierToDisplay]}</TableCell>
        <TableCell align="right">{isAttack && karmaPowerLoadout[powerType].range[tierToDisplay]}</TableCell>
        {isAttack && <TableCell align="right">{karmaPowerLoadout.effects[tierToDisplay]}</TableCell>}
        {powerType === PowerType.defense && <TableCell align="right">+{karmaPowerLoadout.defense.effect[tierToDisplay]} to DEF on next turn.</TableCell>}
        {powerType === PowerType.locomotion && <TableCell align="right">+{locomotionRanges[tierToDisplay]} MOV</TableCell>}
    </TableRow>
}
