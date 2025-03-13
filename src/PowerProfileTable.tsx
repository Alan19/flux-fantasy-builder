import {KarmaPowerLoadout, SwapPowerChoices} from "./KarmaPowerLoadout.ts";
import {RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useCharacterSheetFields} from "./UseCharacterSheetFields.ts";
import {PowerTier, PowerType, usePowerLoadoutSettings} from "./UsePowerLoadoutSettings.ts";
import {KarmaPowerRow} from "./KarmaPowerRow.tsx";

export function PowerProfileTable(props: Readonly<{ powers: [SwapPowerChoices, KarmaPowerLoadout], readOnly?: boolean }>) {
    const {readOnly = false, powers} = props;
    const [, karmaPowers] = powers;
    const powerNames = usePowerLoadoutSettings();
    const {paybackPoints} = useCharacterSheetFields()

    function getPowerSetForTier(tier: PowerTier) {
        return Object.values(PowerType).map(value => <KarmaPowerRow key={value} powerType={value} karmaPowerLoadout={karmaPowers} powerLoadoutSettings={powerNames} paybackPoints={paybackPoints}
                                                                    editablePowerInfo={[tier, powerNames[tier][value][0], powerNames[tier][value][1]]}/>);
    }

    return <TableContainer>
        <RadioGroup value={powerNames.swapPower[0]} onChange={event => powerNames.swapPower[1](event.target.value)}>
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
                    {readOnly ? Object.values(PowerType).map(value => <KarmaPowerRow key={value} powerType={value} karmaPowerLoadout={karmaPowers} powerLoadoutSettings={powerNames} paybackPoints={paybackPoints}/>) :
                        <>
                            {getPowerSetForTier(0)}
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
        </RadioGroup>
    </TableContainer>;
}