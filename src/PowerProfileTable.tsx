import {KarmaPowerLoadout, SwapPowerChoices} from "./KarmaPowerLoadout.ts";
import {FormControlLabel, Radio, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useCharacterSheetFields} from "./UseCharacterSheetFields.ts";
import {PowerTier, PowerType, usePowerLoadoutSettings} from "./UsePowerLoadoutSettings.ts";
import {KarmaPowerRow} from "./KarmaPowerRow.tsx";
import {useSkillTree} from "./UseSkillTree.ts";

export function PowerProfileTable(props: Readonly<{ powers: [SwapPowerChoices, KarmaPowerLoadout], readOnly?: boolean }>) {
    const {readOnly = false, powers} = props;
    const [swapPowers, karmaPowers] = powers;
    const powerNames = usePowerLoadoutSettings();
    const {paybackPoints} = useCharacterSheetFields()
    const {skills} = useSkillTree();

    function getPowerSetForTier(tier: PowerTier) {
        return Object.values(PowerType).map(value => <KarmaPowerRow key={value}
                                                                    powerType={value}
                                                                    karmaPowerLoadout={karmaPowers}
                                                                    swapPowers={swapPowers}
                                                                    powerLoadoutSettings={powerNames}
                                                                    paybackPoints={paybackPoints}
                                                                    editablePowerInfo={[tier, powerNames[tier][value][0], powerNames[tier][value][1]]}
                                                                    selectedSkills={skills}/>);
    }

    return <TableContainer>
        <Table size={"small"}>
            <TableHead>
                <TableRow>
                    <TableCell>{readOnly ? "Selected" : "Basic"} Powers</TableCell>
                    <TableCell align="right">Cost</TableCell>
                    <TableCell align="right">Damage</TableCell>
                    <TableCell align="right">Range</TableCell>
                    <TableCell align="right">Effect</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {readOnly ? Object.values(PowerType).map(value => <KarmaPowerRow key={value}
                                                                                 swapPowers={swapPowers}
                                                                                 powerType={value}
                                                                                 karmaPowerLoadout={karmaPowers}
                                                                                 powerLoadoutSettings={powerNames}
                                                                                 paybackPoints={paybackPoints}
                                                                                 selectedSkills={skills}/>) :
                    <>
                        {getPowerSetForTier(0)}
                        <TableRow>
                            <TableCell>Basic Swap Powers</TableCell>
                            <TableCell align="right">Cost</TableCell>
                            <TableCell align="right">Damage</TableCell>
                            <TableCell align="right">Range</TableCell>
                            <TableCell align="right">Effect</TableCell>
                        </TableRow>

                        {swapPowers.basic.map(value => <TableRow key={value.name}>
                            <TableCell><FormControlLabel value={value.name}
                                                         onChange={() => powerNames.swapPower[1](value.name)}
                                                         control={<Radio size={"small"} checked={powerNames.swapPower[0] === value.name}/>}
                                                         label={value.name}/></TableCell>
                            <TableCell></TableCell>
                            <TableCell align={"right"}>{value.damage}</TableCell>
                            <TableCell align={"right"}>{value.range}</TableCell>
                            <TableCell align={"right"}>{value.effect}</TableCell>
                        </TableRow>)}
                        <TableRow>
                            <TableCell>Basic Tier 2 Powers</TableCell>
                            <TableCell align="right">Cost</TableCell>
                            <TableCell align="right">Damage</TableCell>
                            <TableCell align="right">Range</TableCell>
                            <TableCell align="right">Effect</TableCell>
                        </TableRow>
                        {getPowerSetForTier(1)}
                        <TableRow>
                            <TableCell>Advanced Powers</TableCell>
                            <TableCell align="right">Cost</TableCell>
                            <TableCell align="right">Damage</TableCell>
                            <TableCell align="right">Range</TableCell>
                            <TableCell align="right">Effect</TableCell>
                        </TableRow>
                        {getPowerSetForTier(2)}
                        <TableRow>
                            <TableCell>Advanced Swap Powers</TableCell>
                            <TableCell align="right">Cost</TableCell>
                            <TableCell align="right">Damage</TableCell>
                            <TableCell align="right">Range</TableCell>
                            <TableCell align="right">Effect</TableCell>
                        </TableRow>
                        {swapPowers.advanced.map(value => <TableRow key={value.name}>
                            <TableCell><FormControlLabel value={value.name}
                                                         onChange={() => powerNames.advancedSwapPower[1](value.name)}
                                                         control={<Radio size={"small"} checked={powerNames.advancedSwapPower[0] === value.name}/>}
                                                         label={value.name}/></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">{value.damage}</TableCell>
                            <TableCell align="right">{value.range}</TableCell>
                            <TableCell align="right">{value.effect}</TableCell>
                        </TableRow>)}
                        <TableRow>
                            <TableCell>Advanced Tier 2 Powers</TableCell>
                            <TableCell align="right">Cost</TableCell>
                            <TableCell align="right">Damage</TableCell>
                            <TableCell align="right">Range</TableCell>
                            <TableCell align="right">Effect</TableCell>
                        </TableRow>
                        {getPowerSetForTier(3)}
                    </>
                }
            </TableBody>
        </Table>
    </TableContainer>;
}