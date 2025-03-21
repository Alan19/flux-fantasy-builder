import {Checkbox, FormControlLabel, FormHelperText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {affiliationFlaws, affiliationTraits, Flaws, selectableFlaws, selectableTraits, Trait, Traits} from "./Traits.ts";
import {useCharacterSheetFields} from "./UseCharacterSheetFields.ts";

export function TraitAndFlawTable(props: Readonly<{ inPlay?: boolean }>) {
    const characterSheetFields = useCharacterSheetFields();

    function getDisplayedTraits(): [string, Trait][] {
        if (props.inPlay) {
            const selectedTraits = Object.entries(characterSheetFields.traits).filter(([, value]) => value).map(([key]) => key)
            return Object.entries(selectableTraits).filter(([key]) => selectedTraits.includes(key));
        } else {
            return Object.entries(selectableTraits);
        }
    }

    function getDisplayedFlaws(): [string, Trait][] {
        if (props.inPlay) {
            const selectedTraits = Object.entries(characterSheetFields.flaws).filter(([, value]) => value).map(([key]) => key)
            return Object.entries(selectableFlaws).filter(([key]) => selectedTraits.includes(key));
        } else {
            return Object.entries(selectableFlaws);
        }
    }

    return (
        <TableContainer>
            <Table size={"small"}>
                <TableHead>
                    <TableRow>
                        <TableCell>Trait</TableCell>
                        <TableCell>Effect</TableCell>
                        <TableCell>Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.inPlay && characterSheetFields.affiliation && <>
                        <TableCell component="th" scope="row">
                            {affiliationTraits[characterSheetFields.affiliation].name}
                        </TableCell>
                        <TableCell>
                            {affiliationTraits[characterSheetFields.affiliation].effect}
                        </TableCell>
                    </>}
                    {getDisplayedTraits().map(([trait, {description, effect}]) =>
                        <TableRow key={trait}>
                            <TableCell component="th" scope="row">
                                {props.inPlay ? trait :
                                    <FormControlLabel control={<Checkbox checked={characterSheetFields.traits.includes(trait as Traits)} onChange={() => characterSheetFields.toggleTrait(trait as Traits)}/>} label={trait}/>}
                            </TableCell>
                            <TableCell>
                                {effect}
                            </TableCell>
                            <TableCell>
                                {description}
                            </TableCell>
                        </TableRow>)}
                </TableBody>
                <TableHead>
                    <TableRow>
                        <TableCell>Flaw</TableCell>
                        <TableCell>Effect</TableCell>
                        <TableCell>Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.inPlay && characterSheetFields.affiliation && <>
                        <TableCell component="th" scope="row">
                            {affiliationFlaws[characterSheetFields.affiliation].name}
                        </TableCell>
                        <TableCell>
                            {affiliationFlaws[characterSheetFields.affiliation].effect}
                        </TableCell>
                    </>}
                    {getDisplayedFlaws().map(([trait, {description, effect}]) =>
                        <TableRow key={trait}>
                            <TableCell component="th" scope="row">
                                {props.inPlay ? trait : <FormControlLabel control={<Checkbox checked={characterSheetFields.flaws.includes(trait as Flaws)} onChange={() => characterSheetFields.toggleFlaw(trait as Flaws)}/>} label={trait}/>}
                            </TableCell>
                            <TableCell>
                                {effect}
                            </TableCell>
                            <TableCell>
                                {description}
                            </TableCell>
                        </TableRow>)}
                </TableBody>
            </Table>
            {/*TODO Update color when done*/}
            {!props.inPlay && <FormHelperText error={getDisplayedTraits().length !== getDisplayedFlaws().length}>The number of traits and flaws should be equal!</FormHelperText>}
        </TableContainer>
    )
        ;
}