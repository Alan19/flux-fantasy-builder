import {affiliationFlaws, affiliationTraits, Flaws, selectableFlaws, selectableTraits, TraitText, Traits} from "../../utils/types/Traits.ts";
import {BeerCSSCheckbox} from "../ui/beer-css-wrappers/BeerCSSCheckbox.tsx";
import {Affiliation} from "../../utils/types/KarmaSpecialty.ts";
import _ from "lodash";

function TraitRow(props: Readonly<{ inPlay?: boolean, name: string, onChange: () => void, checked: boolean, effect: string, description: string }>) {
    return <tr>
        <td scope="row">{props.inPlay ? props.name : <BeerCSSCheckbox label={props.name} onChange={props.onChange} checked={props.checked}/>}</td>
        <td>{props.effect}</td>
        <td>{props.description}</td>
    </tr>;
}

export function TraitAndFlawTable(props: Readonly<{ inPlay?: boolean, traits: Traits[], flaws: Flaws[], affiliation: Affiliation, setTraits: (traits: Traits[]) => void, setFlaws: (flaws: Flaws[]) => void }>) {
    function getDisplayedTraits(): [Traits, TraitText][] {
        if (props.inPlay) {
            return props.traits.map(value => [value, selectableTraits[value]]);
        } else {
            return Object.entries(selectableTraits) as [Traits, TraitText][];
        }
    }

    function getDisplayedFlaws(): [Flaws, TraitText][] {
        if (props.inPlay) {
            return props.flaws.map(value => [value, selectableFlaws[value]]);
        } else {
            return Object.entries(selectableFlaws) as [Flaws, TraitText][];
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
            {props.affiliation && <tr>
                <td scope="row"><b>{affiliationTraits[props.affiliation].name}</b></td>
                <td><b>{affiliationTraits[props.affiliation].effect}</b></td>
                <td/>
            </tr>}
            {getDisplayedTraits().map(([trait, {description, effect}]) => <TraitRow key={trait} name={trait} onChange={() => props.setTraits(_.xor(props.traits, [trait]))} checked={props.traits.includes(trait)} effect={effect} description={description} />)}
            </tbody>
            <thead>
            <tr className={'primary-container'}>
                <th>Flaw</th>
                <th>Effect</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
            {props.affiliation && <tr>
                <td scope="row"><b>{affiliationFlaws[props.affiliation].name}</b></td>
                <td><b>{affiliationFlaws[props.affiliation].effect}</b></td>
                <td/>
            </tr>}
            {getDisplayedFlaws().map(([flaw, {description, effect}]) => <TraitRow key={flaw}
                                                                                  inPlay={props.inPlay}
                                                                                  name={flaw}
                                                                                  onChange={() => props.setFlaws(_.xor(props.flaws, [flaw]))}
                                                                                  checked={props.flaws.includes(flaw)}
                                                                                  effect={effect}
                                                                                  description={description}/>)}
            </tbody>
        </table>
        {/*TODO Update color when done*/}
        {/*{!props.inPlay && <label style={{color: characterSheetFields.traits.length !== characterSheetFields.flaws.length ? 'var(--on-error-container)' : 'inherit'}}>The number of traits and flaws should be equal!</label>}*/}
    </div>;
}