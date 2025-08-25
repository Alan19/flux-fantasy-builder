import {getStudies, KarmaSpecialty, Study} from "../../utils/types/KarmaSpecialty.ts";
import {useCharacterSheetFields} from "../../hooks/useCharacterSheetFields.ts";

export function UnselectedKarmaStudyWarning() {
    const {karmaSpecialty, setKarmaSpecialty, setStudy, study} = useCharacterSheetFields();

    return <div>
        <i className="extra">warning</i>
        <h5>No Karma Study!</h5>
        <p>Choose a Karma Specialty and Karma Study to view Karma powers</p>
        <div className="space"></div>
        <nav className="center-align grid">
            <div className="field border label s6">
                <select onChange={event => setKarmaSpecialty(event.target.value as KarmaSpecialty)} value={karmaSpecialty}>
                    {Object.values(KarmaSpecialty).map(value => <option key={value} value={value}>{value}</option>)}
                </select>
                <label>Karma Specialty</label>
            </div>
            <div className="field border label s6">
                <select onChange={event => setStudy(event.target.value as Study)} value={study}>
                    {Object.values(getStudies(karmaSpecialty)).map(value => <option key={value} value={value}>{value}</option>)}
                </select>
                <label>Karma Studies</label>
            </div>
        </nav>
    </div>;
}