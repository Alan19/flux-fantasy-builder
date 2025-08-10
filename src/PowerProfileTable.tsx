import {KarmaPowerLoadout, SwapPowerChoices} from "./KarmaPowerLoadout.ts";
import {FormControlLabel, Radio} from "@mui/material";
import {useCharacterSheetFields} from "./UseCharacterSheetFields.ts";
import {PowerTier, PowerType, usePowerLoadoutSettings} from "./UsePowerLoadoutSettings.ts";
import {KarmaPowerRow} from "./KarmaPowerRow.tsx";
import {useSkillTree} from "./UseSkillTree.ts";
import {clsx} from "clsx";

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

    return <div className={clsx("scroll", !props.readOnly && "medium-height")}>
        <table className={"small"}>
            <thead>
            <tr>
                <th>{readOnly ? "Selected" : "Basic"} Powers</th>
                <th align="right">Cost</th>
                <th align="right">Damage</th>
                <th align="right">Range</th>
                <th align="right">Effect</th>
            </tr>
            </thead>
            <tbody>
            {readOnly ? Object.values(PowerType).map(value => <KarmaPowerRow key={value}
                                                                             swapPowers={swapPowers}
                                                                             powerType={value}
                                                                             karmaPowerLoadout={karmaPowers}
                                                                             powerLoadoutSettings={powerNames}
                                                                             paybackPoints={paybackPoints}
                                                                             selectedSkills={skills}/>) :
                <>
                    {getPowerSetForTier(0)}
                    <tr>
                        <th>Basic Swap Powers</th>
                        <th align="right">Cost</th>
                        <th align="right">Damage</th>
                        <th align="right">Range</th>
                        <th align="right">Effect</th>
                    </tr>

                    {swapPowers.basic.map(value => <tr key={value.name}>
                        <td><FormControlLabel value={value.name}
                                              onChange={() => powerNames.swapPower[1](value.name)}
                                              control={<Radio size={"small"} checked={powerNames.swapPower[0] === value.name}/>}
                                              label={value.name}/></td>
                        <td></td>
                        <td align={"right"}>{value.damage}</td>
                        <td align={"right"}>{value.range}</td>
                        <td align={"right"}>{value.effect}</td>
                    </tr>)}
                    <tr>
                        <th>Basic Tier 2 Powers</th>
                        <th align="right">Cost</th>
                        <th align="right">Damage</th>
                        <th align="right">Range</th>
                        <th align="right">Effect</th>
                    </tr>
                    {getPowerSetForTier(1)}
                    <tr>
                        <th>Advanced Powers</th>
                        <th align="right">Cost</th>
                        <th align="right">Damage</th>
                        <th align="right">Range</th>
                        <th align="right">Effect</th>
                    </tr>
                    {getPowerSetForTier(2)}
                    <tr>
                        <th>Advanced Swap Powers</th>
                        <th align="right">Cost</th>
                        <th align="right">Damage</th>
                        <th align="right">Range</th>
                        <th align="right">Effect</th>
                    </tr>
                    {swapPowers.advanced.map(value => <tr key={value.name}>
                        <th><FormControlLabel value={value.name}
                                              onChange={() => powerNames.advancedSwapPower[1](value.name)}
                                              control={<Radio size={"small"} checked={powerNames.advancedSwapPower[0] === value.name}/>}
                                              label={value.name}/></th>
                        <td align="right"></td>
                        <td align="right">{value.damage}</td>
                        <td align="right">{value.range}</td>
                        <td align="right">{value.effect}</td>
                    </tr>)}
                    <tr>
                        <th>Advanced Tier 2 Powers</th>
                        <th align="right">Cost</th>
                        <th align="right">Damage</th>
                        <th align="right">Range</th>
                        <th align="right">Effect</th>
                    </tr>
                    {getPowerSetForTier(3)}
                </>
            }
            </tbody>
        </table>
    </div>
}