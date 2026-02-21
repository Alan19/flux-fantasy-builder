import {Affiliation, getBoostedTalent, getStudies, KarmaSpecialty, Study} from "../utils/types/KarmaSpecialty.ts";
import {TypographyWithAdornment} from "../components/ui/TypographyWithAdornment.tsx";
import {TraitAndFlawTable} from "../components/traits/TraitAndFlawTable.tsx";
import {KarmaPowerTable} from "../components/karma-abilities/KarmaPowerTable.tsx";
import {BeerCSSTextField} from "../components/ui/beer-css-wrappers/BeerCSSTextField.tsx";
import {BeerCSSSelect} from "../components/ui/beer-css-wrappers/BeerCSSSelect.tsx";
import {setFileBase64} from "../utils/utils.ts";
import {CharacterManager, OCSaveDataWithState} from "../utils/hooks/useOCLocalStorage.ts";

export function CharacterIdentity(props: Readonly<{ ocData: OCSaveDataWithState & { characters: CharacterManager } }>) {
    const ocSaveDataWithState = props.ocData;
    const {background: characterIdentity, talents} = ocSaveDataWithState;
    const [playerName, setPlayerName] = characterIdentity.playerName;
    const [characterName, setCharacterName] = characterIdentity.characterName;
    const [characterImageData, setCharacterImageData] = characterIdentity.characterImageData;
    const [gearOfDestinyImageData, setGearOfDestinyImageData] = characterIdentity.gearOfDestinyImageData;
    const [age, setAge] = characterIdentity.age;
    const [gender, setGender] = characterIdentity.gender;
    const [height, setHeight] = characterIdentity.height;
    const [weight, setWeight] = characterIdentity.weight;
    const [background, setBackground] = characterIdentity.background;
    const [karmaSpecialty, setKarmaSpecialty] = characterIdentity.karmaSpecialty;
    const [study, setStudy] = characterIdentity.study;
    const [traits, setTraits] = characterIdentity.traits;
    const [flaws, setFlaws] = characterIdentity.flaws;
    const [karmaEquipmentConfiguration, setKarmaEquipmentConfiguration] = characterIdentity.karmaEquipmentConfiguration;
    const [affiliation, setAffiliation] = characterIdentity.affiliation;
    
    const [aura, setAura] = talents.aura;
    const [agility, setAgility] = talents.agility;
    const [stamina, setStamina] = talents.stamina;
    const [functionStat, setFunction] = talents.function;
    const [willpower, setWillpower] = talents.willpower;
    const [technique, setTechnique] = talents.technique;
    return <div className={"fade"}>
        <div>
            <article>
                <div className={"grid"}>
                    <fieldset className={"l5 s12"}>
                        <legend><TypographyWithAdornment coloredText text={"About You"}/></legend>
                        <div style={{display: "flex", flexDirection: "column", gap: 16}}>
                            <BeerCSSTextField value={playerName} onChange={(e) => setPlayerName(e.target.value)} label="Player Name"/>
                            <BeerCSSTextField value={characterName} onChange={(e) => setCharacterName(e.target.value)} label="Character Name (+Alias)"/>
                            {/*TODO Add check mark to confirm that file has been uploaded and hash it to CRC or MD5*/}
                            {/*TODO Stop the input from opening a file dialog twice*/}
                            <BeerCSSTextField accept="image/*" inputPrefix={<i>attach_file</i>} type={"file"} onChange={(e) => setFileBase64(e, setCharacterImageData)} label="Character Image" inputSuffix={characterImageData && <i>check</i>}/>
                            <BeerCSSTextField accept="image/*" inputPrefix={<i>attach_file</i>} type={"file"} onChange={(e) => setFileBase64(e, setGearOfDestinyImageData)} label="Gear of Destiny Image" inputSuffix={gearOfDestinyImageData && <i>check</i>}/>
                            <div className={"grid no-margin"}>
                                <div className={"s6 l3"}>
                                    <BeerCSSTextField value={age} onChange={(e) => setAge(e.target.value)} label={"Age"}/>
                                </div>
                                <div className={"s6 l3"}>
                                    <BeerCSSTextField value={gender} onChange={(e) => setGender(e.target.value)} label={"Gender"}/>
                                </div>
                                <div className={"s6 l3"}>
                                    <BeerCSSTextField value={height} onChange={(e) => setHeight(e.target.value)} label={"Height"}/>
                                </div>
                                <div className={"s6 l3"}>
                                    <BeerCSSTextField value={weight} onChange={(e) => setWeight(e.target.value)} label={"Weight"}/>
                                </div>
                            </div>
                            <div className="field border label textarea no-margin">
                                <textarea value={background} onChange={event => setBackground(event.target.value)}></textarea>
                                <label>Background</label>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className={"l5 s12"}>
                        <legend><TypographyWithAdornment coloredText text={"Your Karmastry"}/></legend>
                        <div style={{display: "flex", flexDirection: "column", gap: 16, height: "100%"}}>
                            <BeerCSSSelect label={"Karma Specialty"} onChange={event => setKarmaSpecialty(event.target.value as KarmaSpecialty)} value={karmaSpecialty}>
                                {Object.values(KarmaSpecialty).map(value => <option key={value} value={value}>{value}</option>)}
                            </BeerCSSSelect>

                            <BeerCSSSelect label={"Karma Study"} onChange={event => setStudy(event.target.value as Study)} value={study}>
                                {Object.values(getStudies(karmaSpecialty)).map(value => <option key={value} value={value}>{value}</option>)}
                            </BeerCSSSelect>
                            <div className="field border label no-margin">
                                {/*TODO Make sure this is set / nulled first*/}
                                <select onChange={event => setAffiliation(event.target.value as Affiliation)} value={affiliation}>
                                    {Object.values(Affiliation).map(value => <option key={value} value={value}>{value}</option>)}
                                </select>
                                <label>Affiliation</label>
                            </div>
                            <BeerCSSTextField label={"Torus, Special Weapon, or Sigil Configuration"} multiline value={karmaEquipmentConfiguration} onChange={event => setKarmaEquipmentConfiguration(event.target.value)} containerClass={"flex-one"}/>
                        </div>

                    </fieldset>
                    <fieldset className={"l2 s12"}>
                        <legend><TypographyWithAdornment coloredText text={"Talents"}/></legend>
                        <div style={{display: 'flex', flexDirection: "column", gap: 4}}>
                            {[['Aura', aura, setAura],
                                ['Stamina', stamina, setStamina],
                                ['Agility', agility, setAgility],
                                ['Technique', technique, setTechnique],
                                ['Willpower', willpower, setWillpower],
                                ['Function', functionStat, setFunction]]
                                .map(talentArray => {
                                    const [talentName, value, setTalent] = talentArray as [string, number, (talent: number) => void];
                                    return <div key={talentName}>
                                        <label>{talentName} {study && getBoostedTalent(study) === talentName && <i>arrow_upward</i>}</label>
                                        <nav className="group connected no-margin">
                                            <button type="button" onClick={() => setTalent(1)} className={`left-round max ${value === 1 ? 'active' : ''}`}>+1</button>
                                            <button type="button" onClick={() => setTalent(2)} className={`no-round max ${value === 2 ? 'active' : ''}`}>+2</button>
                                            <button type="button" onClick={() => setTalent(3)} className={`right-round max ${value === 3 ? 'active' : ''}`}>+3</button>
                                        </nav>
                                    </div>;
                                })}
                        </div>
                    </fieldset>
                </div>
            </article>
            <article className="middle-align center-align">
                {<fieldset style={{width: "100%"}}>
                    <legend><TypographyWithAdornment coloredText text={"Karma Powers"}/></legend>
                    <KarmaPowerTable displayMode={"basic"} study={study} karmaPowerLoadout={ocSaveDataWithState.karmaPowers} skills={ocSaveDataWithState.skills.unlockedSkills[0]} isOverPaybackThreshold={ocSaveDataWithState.inventory.payback[0] >= 50} />
                </fieldset>}
            </article>
        </div>
        <article>
            <fieldset>
                <legend><TypographyWithAdornment text={"Traits and Flaws"} coloredText/></legend>
                <TraitAndFlawTable flaws={flaws} traits={traits} affiliation={affiliation} setTraits={setTraits} setFlaws={setFlaws} />
            </fieldset>
        </article>
        <article>
            <TypographyWithAdornment text={"Skill Tree"} coloredText/>
            {/*<SkillTree characterOptions={characterIdentity}/>*/}
        </article>
    </div>;
}