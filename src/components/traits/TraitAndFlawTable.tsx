import {affiliationFlaws, affiliationTraits, Flaws, selectableFlaws, selectableTraits, Trait, Traits} from "../../utils/types/Traits.ts";
import {useCharacterSheetFields} from "../../hooks/useCharacterSheetFields.ts";
import {BeerCSSCheckbox} from "../ui/beer-css-wrappers/BeerCSSCheckbox.tsx";

export function TraitAndFlawTable(props: Readonly<{ inPlay?: boolean }>) {
    const characterSheetFields = useCharacterSheetFields();

    function getDisplayedTraits(): [string, Trait][] {
        if (props.inPlay) {
            return characterSheetFields.traits.map(value => [value, selectableTraits[value]]);
        } else {
            return Object.entries(selectableTraits);
        }
    }

    function getDisplayedFlaws(): [string, Trait][] {
        if (props.inPlay) {
            return characterSheetFields.flaws.map(value => [value, selectableFlaws[value]]);
        } else {
            return Object.entries(selectableFlaws);
        }
    }

    return <div className={"scroll"}>
        <table className={"border"}>
            <thead>
            <tr className={'primary-container'}>
                <th>Trait</th>
                <th>Effect</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
            {props.inPlay && characterSheetFields.affiliation && <tr>
                <td scope="row">
                    <b>
                        {affiliationTraits[characterSheetFields.affiliation].name}
                    </b>
                </td>
                <td>
                    <b>
                        {affiliationTraits[characterSheetFields.affiliation].effect}
                    </b>
                </td>
                <td/>
            </tr>}
            {getDisplayedTraits().map(([trait, {description, effect}]) => {
                return <tr key={trait}>
                    <td scope="row">
                        {props.inPlay ? trait : <BeerCSSCheckbox label={trait} onChange={() => characterSheetFields.toggleTrait(trait as Traits)} checked={characterSheetFields.traits.includes(trait as Traits)}/>}
                    </td>
                    <td>
                        {effect}
                    </td>
                    <td>
                        {description}
                    </td>
                </tr>;
            })}
            </tbody>
            <thead>
            <tr className={'primary-container'}>
                <th>Flaw</th>
                <th>Effect</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
            {props.inPlay && characterSheetFields.affiliation && <tr>
                <td scope="row">
                    <b>
                        {affiliationFlaws[characterSheetFields.affiliation].name}
                    </b>
                </td>
                <td>
                    <b>
                        {affiliationFlaws[characterSheetFields.affiliation].effect}
                    </b>
                </td>
                <td />
            </tr>}
            {getDisplayedFlaws().map(([trait, {description, effect}]) =>
                <tr key={trait}>
                    <td scope="row">
                        {props.inPlay ? trait : <BeerCSSCheckbox label={trait} onChange={() => characterSheetFields.toggleFlaw(trait as Flaws)} checked={characterSheetFields.flaws.includes(trait as Flaws)}/>}
                    </td>
                    <td>
                        {effect}
                    </td>
                    <td>
                        {description}
                    </td>
                </tr>)}
            </tbody>
        </table>
        {/*TODO Update color when done*/}
        {!props.inPlay && <label style={{color: characterSheetFields.traits.length !== characterSheetFields.flaws.length ? 'var(--on-error-container)' : 'inherit'}}>The number of traits and flaws should be equal!</label>}
    </div>;
}