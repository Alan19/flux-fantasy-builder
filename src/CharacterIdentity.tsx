import {Affiliation, getStudies, KarmaSpecialty, Study} from "./KarmaSpecialty.ts";
import {useCharacterSheetFields} from "./UseCharacterSheetFields.ts";
import {TypographyWithAdornment} from "./TypographyWithAdornment.tsx";
import {TraitAndFlawTable} from "./TraitAndFlawTable.tsx";
import {PowerProfileTable} from "./PowerProfileTable.tsx";
import {getPowerLoadout} from "./KarmaPowerLoadout.ts";
import {SkillTree} from "./SkillTree.tsx";
import {useSkillTree} from "./UseSkillTree.ts";
import {BeerCSSTextField} from "./beer_wrappers/BeerCSSTextField.tsx";
import {BeerCSSSelect} from "./beer_wrappers/BeerCSSSelect.tsx";

export function CharacterIdentity() {
    const characterIdentity = useCharacterSheetFields();
    const {skills} = useSkillTree()
    return <div>
        <div>
            <article>
                <div className={"grid"}>
                    <fieldset className={"l5 s12"}>
                        <legend><TypographyWithAdornment coloredText text={"About You"}/></legend>
                        <div style={{display: "flex", flexDirection: "column", gap: 16}}>
                            <BeerCSSTextField value={characterIdentity.playerName} onChange={(e) => characterIdentity.setPlayerName(e.target.value)} label="Player Name"/>
                            <BeerCSSTextField value={characterIdentity.characterName} onChange={(e) => characterIdentity.setCharacterName(e.target.value)} label="Character Name (+Alias)"/>
                            {/*TODO Add check mark to confirm that file has been uploaded and hash it to CRC or MD5*/}
                            <BeerCSSTextField accept="image/*" inputPrefix={<i>attach_file</i>} type={"file"} onChange={(e) => characterIdentity.setCharacterImageURL(e)} label="Character Image"/>
                            <BeerCSSTextField accept="image/*" inputPrefix={<i>attach_file</i>} type={"file"} onChange={(e) => characterIdentity.setGearOfDestinyURL(e)} label="Gear of Destiny Image"/>
                            <div className={"grid no-margin"}>
                                <div className={"s6 l3"}>
                                    <BeerCSSTextField value={characterIdentity.age} onChange={(e) => characterIdentity.setAge(e.target.value)} label={"Age"}/>
                                </div>
                                <div className={"s6 l3"}>
                                    <BeerCSSTextField value={characterIdentity.gender} onChange={(e) => characterIdentity.setGender(e.target.value)} label={"Gender"}/>
                                </div>
                                <div className={"s6 l3"}>
                                    <BeerCSSTextField value={characterIdentity.height} onChange={(e) => characterIdentity.setHeight(e.target.value)} label={"Height"}/>
                                </div>
                                <div className={"s6 l3"}>
                                    <BeerCSSTextField value={characterIdentity.weight} onChange={(e) => characterIdentity.setWeight(e.target.value)} label={"Weight"}/>
                                </div>
                            </div>
                            <div className="field border label textarea no-margin">
                                <textarea value={characterIdentity.background} onChange={event => characterIdentity.setBackground(event.target.value)}></textarea>
                                <label>Background</label>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className={"l5 s12"}>
                        <legend><TypographyWithAdornment coloredText text={"Your Karmastry"}/></legend>
                        <div style={{display: "flex", flexDirection: "column", gap: 16}}>
                            <BeerCSSSelect label={"Karma Specialty"} onChange={event => characterIdentity.setKarmaSpecialty(event.target.value as KarmaSpecialty)} value={characterIdentity.karmaSpecialty}>
                                {Object.values(KarmaSpecialty).map(value => <option key={value} value={value}>{value}</option>)}
                            </BeerCSSSelect>

                                <BeerCSSSelect label={"Karma Study"} onChange={event => characterIdentity.setStudy(event.target.value as Study)} value={characterIdentity.study}>
                                    {Object.values(getStudies(characterIdentity.karmaSpecialty)).map(value => <option key={value} value={value}>{value}</option>)}
                                </BeerCSSSelect>
                            <div className="field border label no-margin">
                                <select onChange={event => characterIdentity.setAffiliation(event.target.value as Affiliation)} value={characterIdentity.affiliation}>
                                    {Object.values(Affiliation).map(value => <option key={value} value={value}>{value}</option>)}
                                </select>
                                <label>Affiliation</label>
                            </div>
                            <div className="field border label textarea no-margin">
                                <textarea value={characterIdentity.configuration} onChange={event => characterIdentity.setConfiguration(event.target.value)}></textarea>
                                <label>Torus, Special Weapon, or Sigil Configuration</label>
                            </div>
                        </div>

                    </fieldset>
                    <fieldset className={"l2 s12"}>
                        <legend><TypographyWithAdornment coloredText text={"Talents"}/></legend>
                        <div style={{display: 'flex', flexDirection: "column", gap: 4}}>
                            {['Aura', 'Stamina', 'Agility', 'Technique', 'Willpower', 'Function'].map(value => {
                                const [talent, second] = characterIdentity.getTalentHook(value as 'Aura' | 'Stamina' | 'Agility' | 'Technique' | 'Willpower' | 'Function');
                                return <div>
                                    <label>{value}</label>
                                    <nav className="group connected no-margin">
                                        <button type="button" onClick={() => second(1)} className={`left-round ${talent === 1 ? 'active' : ''}`}>+1</button>
                                        <button type="button" onClick={() => second(2)} className={`no-round ${talent === 2 ? 'active' : ''}`}>+2</button>
                                        <button type="button" onClick={() => second(3)} className={`right-round ${talent === 3 ? 'active' : ''}`}>+3</button>
                                    </nav>
                                </div>;
                            })}
                        </div>
                    </fieldset>
                </div>
            </article>
            <article className="middle-align center-align">
                {characterIdentity.karmaSpecialty && characterIdentity.study ?
                    // TODO Check if we can use something else
                    <fieldset style={{width: "100%"}}>
                        <legend><TypographyWithAdornment text={"Karma Powers"}/></legend>
                        <PowerProfileTable powers={getPowerLoadout(characterIdentity.karmaSpecialty, characterIdentity.study)}/>
                    </fieldset> : <div>
                        <i className="extra">warning</i>
                        <h5>No Karma Study!</h5>
                        <p>Choose a Karma Specialty and Karma Study to view Karma powers</p>
                        <div className="space"></div>
                        <nav className="center-align grid">
                            <div className="field border label s6">
                                <select onChange={event => characterIdentity.setKarmaSpecialty(event.target.value as KarmaSpecialty)} value={characterIdentity.karmaSpecialty}>
                                    {Object.values(KarmaSpecialty).map(value => <option key={value} value={value}>{value}</option>)}
                                </select>
                                <label>Karma Specialty</label>
                            </div>
                            <div className="field border label s6">
                                <select onChange={event => characterIdentity.setStudy(event.target.value as Study)} value={characterIdentity.study}>
                                    {Object.values(getStudies(characterIdentity.karmaSpecialty)).map(value => <option key={value} value={value}>{value}</option>)}
                                </select>
                                <label>Karma Studies</label>
                            </div>
                        </nav>
                    </div>}
            </article>
        </div>
        <article>
            <TypographyWithAdornment text={"Traits and Flaws"} coloredText/>
            <TraitAndFlawTable/>
        </article>
        <article>
                <TypographyWithAdornment text={"Skill Tree"} coloredText/>
                <SkillTree/>
        </article>
    </div>;
}