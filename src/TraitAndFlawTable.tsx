import {Checkbox, FormControlLabel, FormHelperText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {affiliationFlaws, affiliationTraits, FlawList, selectableFlaws, selectableTraits, Trait, TraitList} from "./Traits.ts";
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
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Trait</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Effect</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.inPlay && characterSheetFields.affiliation && <>
                        <TableCell component="th" scope="row">
                            {affiliationTraits[characterSheetFields.affiliation].name}
                        </TableCell>
                        <TableCell>
                        </TableCell>
                        <TableCell>
                            {affiliationTraits[characterSheetFields.affiliation].effect}
                        </TableCell>
                    </>}
                    {getDisplayedTraits().map(([trait, {description, effect}]) =>
                        <TableRow key={trait}>
                            <TableCell component="th" scope="row">
                                {props.inPlay ? trait : <FormControlLabel control={<Checkbox checked={characterSheetFields.traits[trait as TraitList]} onChange={() => characterSheetFields.toggleTrait(trait as TraitList)}/>} label={trait}/>}
                            </TableCell>
                            <TableCell>
                                {description}
                            </TableCell>
                            <TableCell>
                                {effect}
                            </TableCell>
                        </TableRow>)}
                </TableBody>
                <TableHead>
                    <TableRow>
                        <TableCell>Flaw</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Effect</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.inPlay && characterSheetFields.affiliation && <>
                        <TableCell component="th" scope="row">
                            {affiliationFlaws[characterSheetFields.affiliation].name}
                        </TableCell>
                        <TableCell>
                        </TableCell>
                        <TableCell>
                            {affiliationFlaws[characterSheetFields.affiliation].effect}
                        </TableCell>
                    </>}
                    {getDisplayedFlaws().map(([trait, {description, effect}]) =>
                        <TableRow key={trait}>
                            <TableCell component="th" scope="row">
                                {props.inPlay ? trait : <FormControlLabel control={<Checkbox checked={characterSheetFields.flaws[trait as FlawList]} onChange={() => characterSheetFields.toggleFlaw(trait as FlawList)}/>} label={trait}/>}
                            </TableCell>
                            <TableCell>
                                {description}
                            </TableCell>
                            <TableCell>
                                {effect}
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