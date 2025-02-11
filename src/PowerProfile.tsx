import {KarmaPowerLoadout, locomotionCost, locomotionRanges, SwapPower, SwapPowerChoices} from "./KarmaPowerLoadout.ts";
import {FormControlLabel, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography} from "@mui/material";
import {useCharacterSheetFields} from "./UseCharacterSheetFields.ts";

function getNameCell(readOnly: boolean, value: string, label: string, onChange: (value: string) => void) {
    if (readOnly) {
        return <TextField fullWidth slotProps={{input: {readOnly: true}}} value={value} onChange={event => onChange(event.target.value)} size={"small"} label={label} variant={"standard"}/>;
    }
    return <TextField fullWidth value={value} onChange={event => onChange(event.target.value)} size={"small"} label={label} variant="outlined"/>;
}

function getSwapPowerColumn(swapPowers: SwapPowerChoices) {
    return swapPowers.basic.map((power) => <TableRow key={power.name}>
        <TableCell><FormControlLabel value={power.name} control={<Radio/>} label={power.name}/></TableCell>
        <TableCell align="right"></TableCell>
        <TableCell align="right">{power.damage}</TableCell>
        <TableCell align="right">{power.range}</TableCell>
    </TableRow>);
}

function getSelectedSwapPower(selectedSwapPowerObject: SwapPower) {
    return <TableRow>
        <TableCell><Typography variant={"body1"}>{selectedSwapPowerObject.name}</Typography></TableCell>
        <TableCell align="right"></TableCell>
        <TableCell align="right">{selectedSwapPowerObject.damage}</TableCell>
        <TableCell align="right">{selectedSwapPowerObject.range}</TableCell>
    </TableRow>
}

export function PowerProfile(props: Readonly<{ powers: [SwapPowerChoices, KarmaPowerLoadout], readOnly?: boolean }>) {
    const {readOnly = false, powers} = props;
    const [swapPowers, karmaPowers] = powers;
    const {
        basicAttack,
        basicCombo,
        basicDefense,
        basicSignature,
        locomotion,
        selectedSwapPower,
        setBasicAttack,
        setBasicCombo,
        setBasicDefense,
        setBasicSignature,
        setLocomotion,
        setSelectedSwapPower,
        paybackPoints
    } = useCharacterSheetFields();
    const selectedSwapPowerObject = swapPowers.basic.find(value => value.name === selectedSwapPower);

    function getCost(cost: number) {
        return cost + (paybackPoints >= 50 ? 2 : 0);
    }

    function getPowerSetForTier(sectionName: string, tier: number) {
        return <>
            <TableHead>
                <TableRow>
                    <TableCell>{sectionName} Powers</TableCell>
                    <TableCell align="right">Cost</TableCell>
                    <TableCell align="right">Damage</TableCell>
                    <TableCell align="right">Range</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>{getNameCell(readOnly, basicAttack, `${sectionName} Attack`, setBasicAttack)}</TableCell>
                    <TableCell align="right">{getCost(karmaPowers.costs.attackAndDefense[tier])}{paybackPoints >= 50 ? "(⬆)" : ""}</TableCell>
                    <TableCell align="right">{karmaPowers.attack.damage[tier]}</TableCell>
                    <TableCell align="right">{karmaPowers.attack.range[tier]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>{getNameCell(readOnly, basicCombo, `${sectionName} Combo`, setBasicCombo)}</TableCell>
                    <TableCell align="right">{getCost(karmaPowers.costs.combo[tier])}{paybackPoints >= 50 ? "(⬆)" : ""}</TableCell>
                    <TableCell align="right">{karmaPowers.combo.damage[tier]}</TableCell>
                    <TableCell align="right">{karmaPowers.combo.range[tier]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>{getNameCell(readOnly, basicSignature, `${sectionName} Signature`, setBasicSignature)}</TableCell>
                    <TableCell align="right">{getCost(karmaPowers.costs.signature[tier])}{paybackPoints >= 50 ? "(⬆)" : ""}</TableCell>
                    <TableCell align="right">{karmaPowers.signature.damage[tier]}</TableCell>
                    <TableCell align="right">{karmaPowers.signature.range[tier]}</TableCell>
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
                    <TableCell>{getNameCell(readOnly, basicDefense, `${sectionName} Defense`, setBasicDefense)}</TableCell>
                    <TableCell align="right">{karmaPowers.costs.attackAndDefense[tier]}{paybackPoints >= 50 ? "(⬆)" : ""}</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">+{karmaPowers.defense.effect[tier]} to DEF</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>{getNameCell(readOnly, locomotion, `${sectionName} Locomotion`, setLocomotion)}</TableCell>
                    <TableCell align="right">{getCost(locomotionCost[tier])}{paybackPoints >= 50 ? "(⬆)" : ""} for each square moved</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">+{locomotionRanges[tier]} to MOV for that turn</TableCell>
                </TableRow>
            </TableBody>
        </>;
    }

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
                    {readOnly && selectedSwapPowerObject ? getSelectedSwapPower(selectedSwapPowerObject) : getSwapPowerColumn(swapPowers)}
                </TableBody>
                {getPowerSetForTier("Basic", 0)}
                {getPowerSetForTier("Basic Tier 2", 1)}
                {getPowerSetForTier("Advanced", 2)}
                {getPowerSetForTier("Advanced Tier 2", 3)}
            </Table>
        </RadioGroup>
    </TableContainer>;
}