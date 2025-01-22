import {KarmaPowerLoadout, SwapPower, SwapPowerChoices} from "./KarmaPowerLoadout.ts";
import {FormControlLabel, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography} from "@mui/material";
import {useCharacterSheetFields} from "./UseCharacterSheetFields.ts";

function getNameCell(readOnly: boolean, value: string, label: string, onChange: (value: string) => void) {
    if (readOnly) {
        return <TextField fullWidth slotProps={{input: {readOnly: true}}} value={value} onChange={event => onChange(event.target.value)} size={"small"} label={label} variant={"standard"}/>;
    }
    return <TextField fullWidth value={value} onChange={event => onChange(event.target.value)} size={"small"} label={label} variant="outlined"/>;
}

function getSwapPowerSection(readOnly: boolean, selectedSwapPowerObject: SwapPower | undefined, swapPowers: SwapPowerChoices) {
    if (readOnly && selectedSwapPowerObject) {
        return <TableRow>
            <TableCell><Typography variant={"body1"}>{selectedSwapPowerObject.name}</Typography></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">{selectedSwapPowerObject.damage}</TableCell>
            <TableCell align="right">{selectedSwapPowerObject.range}</TableCell>
        </TableRow>;
    } else {
        return <>
            {swapPowers.map((power) => <TableRow>
                <TableCell><FormControlLabel value={power.name} control={<Radio/>} label={power.name}/></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">{power.damage}</TableCell>
                <TableCell align="right">{power.range}</TableCell>
            </TableRow>)}
        </>;
    }
}

export function PowerProfile(props: { powers: [SwapPowerChoices, KarmaPowerLoadout], readOnly?: boolean }) {
    const {readOnly = false, powers} = props;
    const [swapPowers, karmaPowers] = powers;
    const {basicAttack, basicCombo, basicDefense, basicSignature, locomotion, selectedSwapPower, setBasicAttack, setBasicCombo, setBasicDefense, setBasicSignature, setLocomotion, setSelectedSwapPower} = useCharacterSheetFields();
    const selectedSwapPowerObject = swapPowers.find(value => value.name === selectedSwapPower);


    return <TableContainer>
        <RadioGroup value={selectedSwapPower} onChange={event => setSelectedSwapPower(event.target.value)}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Swap Powers</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right">Damage</TableCell>
                        <TableCell align="right">Range</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {getSwapPowerSection(readOnly, selectedSwapPowerObject, swapPowers)}
                </TableBody>
                <TableHead>
                    <TableRow>
                        <TableCell>Karma Powers</TableCell>
                        <TableCell align="right">Cost</TableCell>
                        <TableCell align="right">Damage</TableCell>
                        <TableCell align="right">Range</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{getNameCell(readOnly, basicAttack, "Basic Attack", setBasicAttack)}</TableCell>
                        <TableCell align="right">{karmaPowers.basicAttack.cost ?? 5}</TableCell>
                        <TableCell align="right">{karmaPowers.basicAttack.damage}</TableCell>
                        <TableCell align="right">{karmaPowers.basicAttack.range}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>{getNameCell(readOnly, basicCombo, "Basic Combo", setBasicCombo)}</TableCell>
                        <TableCell align="right">{karmaPowers.basicCombo.cost ?? 7}</TableCell>
                        <TableCell align="right">{karmaPowers.basicCombo.damage}</TableCell>
                        <TableCell align="right">{karmaPowers.basicCombo.range}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>{getNameCell(readOnly, basicSignature, "Basic Signature", setBasicSignature)}</TableCell>
                        <TableCell align="right">{karmaPowers.basicSignature.cost ?? 10}</TableCell>
                        <TableCell align="right">{karmaPowers.basicSignature.damage}</TableCell>
                        <TableCell align="right">{karmaPowers.basicSignature.range}</TableCell>
                    </TableRow>
                </TableBody>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="right">Cost</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right">Effect</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{getNameCell(readOnly, basicDefense, "Basic Defense", setBasicDefense)}</TableCell>
                        <TableCell align="right">{karmaPowers.basicDefense.cost ?? 5}</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right">{karmaPowers.basicDefense.effect}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>{getNameCell(readOnly, locomotion, "Locomotion", setLocomotion)}</TableCell>
                        <TableCell align="right">{`${karmaPowers.locomotion.cost ?? 3} for each square moved`}</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right">{karmaPowers.locomotion.effect}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </RadioGroup>
    </TableContainer>;
}