import {affiliationFlaws, affiliationTraits, Flaws, selectableFlaws, selectableTraits, Trait, Traits} from "./Traits.ts";
import {useCharacterSheetFields} from "./UseCharacterSheetFields.ts";
import {BeerCSSCheckbox} from "./beer_wrappers/BeerCSSCheckbox.tsx";

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

    return <div className={"medium-height scroll"}>
        <table>
            <thead>
            <tr className={'primary'}>
                <th>Trait</th>
                <th>Effect</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
            {props.inPlay && characterSheetFields.affiliation && <>
                <th scope="row">
                    {affiliationTraits[characterSheetFields.affiliation].name}
                </th>
                <th>
                    {affiliationTraits[characterSheetFields.affiliation].effect}
                </th>
            </>}
            {getDisplayedTraits().map(([trait, {description, effect}]) => {
                return <tr key={trait}>
                    <td scope="row">
                        {props.inPlay ? trait : <BeerCSSCheckbox label={trait} onChange={() => characterSheetFields.toggleTrait(trait as Traits)} checked={characterSheetFields.traits.includes(trait as Traits)} />}
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
            <tr className={'primary'}>
                <th>Flaw</th>
                <th>Effect</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
            {props.inPlay && characterSheetFields.affiliation && <>
                <th scope="row">
                    {affiliationFlaws[characterSheetFields.affiliation].name}
                </th>
                <th>
                    {affiliationFlaws[characterSheetFields.affiliation].effect}
                </th>
            </>}
            {getDisplayedFlaws().map(([trait, {description, effect}]) =>
                <tr key={trait}>
                    <td scope="row">
                        {props.inPlay ? trait : <BeerCSSCheckbox label={trait} onChange={() => characterSheetFields.toggleFlaw(trait as Flaws)} checked={characterSheetFields.flaws.includes(trait as Flaws)} />}
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