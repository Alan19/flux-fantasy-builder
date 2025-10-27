import {useCharacterSheetFields} from "../../hooks/useCharacterSheetFields.ts";
import {PowerProfileTable} from "../karma-abilities/PowerProfileTable.tsx";
import {getPowerLoadout} from "../../utils/types/KarmaPowerLoadout.ts";
import {getDefenseModifier, getEffectiveTalents, getHealingPercent, getMaxHP, getMaxKarma, getMovModifier} from "../../utils/types/KarmaSpecialty.ts";
import {TraitAndFlawTable} from "../traits/TraitAndFlawTable.tsx";
import {TypographyWithAdornment} from "../ui/TypographyWithAdornment.tsx";
import {SkillTree} from "../skills/SkillTree.tsx";
import {useSkillTree} from "../../hooks/useSkillTree.ts";
import {ColoredLogo} from "../ui/ColoredLogo.tsx";
import {BeerCSSTextField} from "../ui/beer-css-wrappers/BeerCSSTextField.tsx";
import {UnselectedKarmaStudyWarning} from "../karma-abilities/UnselectedKarmaStudyWarning.tsx";
import {MaterialNumberField} from "../ui/MaterialNumberField.tsx";
import {Advantages} from "./Advantages.tsx";
import {getSpecialItems} from "./GetSpecialItems.ts";


export function RenderedCharacterSheet() {
    const characterSheetFields = useCharacterSheetFields();
    const {skills, level5Talent, talent1Options, vitalityOptions, talent3Options, talent4Options, talent2Options, talentedTalent} = useSkillTree();
    const [effectiveTalents] = getEffectiveTalents(characterSheetFields.study, characterSheetFields.aura, characterSheetFields.technique, characterSheetFields.stamina, characterSheetFields.function, characterSheetFields.willpower, characterSheetFields.agility, talent1Options, talent2Options, talent3Options, talent4Options, level5Talent, talentedTalent, skills, characterSheetFields.level, characterSheetFields.traits)

    const maxKarma = characterSheetFields.karmaSpecialty ? getMaxKarma(characterSheetFields.karmaSpecialty, characterSheetFields.level, skills) : 0;
    const maxHP = getMaxHP(effectiveTalents, characterSheetFields.level, skills);
    return <div>
        <div>
            <div className={"grid middle-align"}>
                <div className={"s4"}>
                    <ColoredLogo/>
                    <span>Character Sheet</span>
                </div>
                <div className={"s8 bottom-marzgin fade"}>
                    <BeerCSSTextField variant={"filled"} value={characterSheetFields.playerName} label={"Player Name"} inputSize={"medium"} readOnly/>
                </div>
            </div>
            <div className={"fade"}>
                <div className={"grid top-margin medium-space"}>
                    <div className={"xl3 l4 s12"}>
                        <div>
                            <TypographyWithAdornment text={"Portrait"} coloredText/>
                            <img src={characterSheetFields.characterImageData} style={{width: "100%", clipPath: 'polygon(0 0, 100% 0, 100% 75%, 75% 100%, 0 100%)'}}/>
                        </div>
                        <fieldset>
                            <legend><i>double_arrow</i>Karmic Alignment PTs</legend>
                            <div className={"grid no-margin"}>
                                <MaterialNumberField className={"s6 no-margin"}
                                                     onChange={(e) => characterSheetFields.setPositiveKarma(Math.max(0, e))}
                                                     max={100}
                                                     value={characterSheetFields.positiveKarma}
                                                     label={"Positive KAP"}/>
                                <MaterialNumberField className={"s6 no-margin"}
                                                     onChange={newVal => characterSheetFields.setNegativeKarma(Math.max(0, newVal))}
                                                     max={100}
                                                     value={characterSheetFields.negativeKarma}
                                                     label={"Negative KAP"}/>
                            </div>
                        </fieldset>
                        <article className={"tiny scroll top-margin bottom-margin"}>
                            {characterSheetFields.karmaSpecialty && <Advantages karmaSpecialty={characterSheetFields.karmaSpecialty} level={characterSheetFields.level}/>}
                        </article>
                        <div className={"grid no-margin"}>
                            <MaterialNumberField value={characterSheetFields.merits} label={"Merits"} className={"m6 s12"} inputPrefix={<i className={"tiny fill"}>hourglass</i>} onChange={(e) => characterSheetFields.setMerits(Math.max(0, e))}/>
                            <MaterialNumberField label="Med+ Kit #"
                                                 value={characterSheetFields.medKits}
                                                 className={"m6 s12"}
                                                 onChange={(e) => characterSheetFields.setMedKits(e)}
                                                 endAdornment={characterSheetFields.karmaSpecialty ? `(${getHealingPercent(characterSheetFields.karmaSpecialty, skills)}%)` : ""}
                                                 inputPrefix={<i>healing</i>}/>
                        </div>
                        <BeerCSSTextField label={'Special Items'} multiline  value={characterSheetFields.karmaSpecialty ? getSpecialItems(characterSheetFields.karmaSpecialty) : ""} readOnly className={"top-margin"}/>
                    </div>
                    <div className={"xl6 s12 l8"}>
                        <div>
                            <fieldset>
                                <legend><TypographyWithAdornment text={"Identity"} coloredText/></legend>
                                <BeerCSSTextField variant={"outlined"} value={characterSheetFields.characterName} label={"Character Name (+Alias)"} readOnly/>
                                <div className={"grid"}>
                                    <div className={"s3"}>
                                        <BeerCSSTextField variant={"outlined"} value={characterSheetFields.age} label={"Age"} readOnly/>
                                    </div>
                                    <div className={"s3"}>
                                        <BeerCSSTextField variant={"outlined"} value={characterSheetFields.gender} label={"Gender"} readOnly/>
                                    </div>
                                    <div className={"s3"}>
                                        <BeerCSSTextField variant={"outlined"} value={characterSheetFields.height} label={"Height"} readOnly/>
                                    </div>
                                    <div className={"s3"}>
                                        <BeerCSSTextField variant={"outlined"} value={characterSheetFields.weight} label={"Weight"} readOnly/>
                                    </div>
                                </div>
                                <div className={"grid"}>
                                    <div className={"s6"}>
                                        <BeerCSSTextField variant={"outlined"} value={characterSheetFields.karmaSpecialty} label={"Karma Specialty"} readOnly/>
                                    </div>
                                    <div className={"s6"}>
                                        <BeerCSSTextField variant={"outlined"} value={characterSheetFields.affiliation} label={"Affiliation"} readOnly/>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset className={"bottom-padding large-padding"}>
                                <legend>
                                    <TypographyWithAdornment text={"Talents"} coloredText/>
                                </legend>
                                <div className={"grid"}>
                                    {/*TODO Add adornment and score increase for study talent boost*/}
                                    <div className={"s4 l2"}>
                                        <BeerCSSTextField value={"+" + effectiveTalents.aura}
                                                          label={"Aura"}
                                                          variant={"filled"}
                                                          readOnly/>
                                    </div>
                                    <div className={"s4 l2"}>
                                        <BeerCSSTextField value={"+" + effectiveTalents.technique}
                                                          label={"Technique"}
                                                          variant={"filled"}
                                                          readOnly/>
                                    </div>
                                    <div className={"s4 l2"}>
                                        <BeerCSSTextField value={"+" + effectiveTalents.stamina}
                                                          label={"Stamina"}
                                                          variant={"filled"}
                                                          readOnly/>
                                    </div>
                                    <div className={"s4 l2"}>
                                        <BeerCSSTextField value={"+" + effectiveTalents.function}
                                                          label={"Function"}
                                                          variant={"filled"}
                                                          readOnly/>
                                    </div>
                                    <div className={"s4 l2"}>
                                        <BeerCSSTextField value={"+" + effectiveTalents.willpower}
                                                          label={"Willpower"}
                                                          variant={"filled"}
                                                          readOnly/>
                                    </div>
                                    <div className={"s4 l2"}>
                                        <BeerCSSTextField value={"+" + effectiveTalents.agility}
                                                          label={"Agility"}
                                                          variant={"filled"}
                                                          readOnly/>
                                    </div>
                                </div>
                                <div className={"grid bottom-align"} style={{marginTop: 0}}>
                                    <div className={"s12 l4"}>
                                        <MaterialNumberField
                                            inputPrefix={<i>favorite</i>}
                                            onChange={(e) => characterSheetFields.setCurrentHP(Math.min(e, maxHP))}
                                            value={characterSheetFields.currentHP}
                                            label={`HP`}
                                            max={maxHP}
                                            endAdornment={"/ " + maxHP}
                                        />
                                    </div>
                                    <div className={"s12 l4"}>
                                        <BeerCSSTextField
                                            inputPrefix={<i>shield</i>}
                                            readOnly
                                            value={characterSheetFields.affiliation ? "+" + getDefenseModifier(characterSheetFields.affiliation, characterSheetFields.level, skills, vitalityOptions) : "+1"}
                                            label={"DEF"}/>
                                    </div>
                                    <div className={"s12 l4"}>
                                        <BeerCSSTextField
                                            inputPrefix={<i>directions_run</i>}
                                            readOnly
                                            value={getMovModifier(effectiveTalents, skills, vitalityOptions)}
                                            label={"MOV"}/>
                                    </div>
                                </div>
                            </fieldset>
                            {(characterSheetFields.karmaSpecialty && characterSheetFields.study) ?
                                <fieldset>
                                    <legend><TypographyWithAdornment text={"Karma Power Profile"} coloredText/></legend>
                                    <PowerProfileTable powers={getPowerLoadout(characterSheetFields.karmaSpecialty, characterSheetFields.study)} readOnly/>
                                </fieldset> :
                                <UnselectedKarmaStudyWarning/>}
                        </div>
                    </div>
                    <div className={"xl3 s12 no-space"}>
                        {/*TODO Make this look better*/}
                        <BeerCSSTextField
                            label="Study"
                            variant={"outlined"}
                            value={characterSheetFields.study}
                            readOnly/>
                        <MaterialNumberField
                            label="Level"
                            min={1}
                            max={10}
                            className={"top-margin"}
                            value={characterSheetFields.level}
                            onChange={(e) => characterSheetFields.setLevel(Math.max(1, Number(e)))}
                        />
                        <fieldset>
                            <legend><TypographyWithAdornment text={"Gear of Destiny"} coloredText/></legend>
                            <img src={characterSheetFields.gearOfDestiny} style={{width: '100%'}}/>
                        </fieldset>
                        <fieldset style={{paddingTop: 0}}>
                            <legend><TypographyWithAdornment text={"Karma Pool"} coloredText/></legend>
                            <MaterialNumberField onChange={(e) => characterSheetFields.setKarmaPool(Math.min(maxKarma, e))}
                                                 endAdornment={`/ ${maxKarma}`}
                                                 value={characterSheetFields.karmaPool}
                                                 max={maxKarma}
                                                 label={"Karma Pool"}/>
                            {/*TODO Find a way to fit /100 into the textfield*/}
                            <MaterialNumberField
                                onChange={(e) => characterSheetFields.setPaybackPoints(Math.min(100, e))}
                                value={characterSheetFields.paybackPoints}
                                max={100}
                                endAdornment={'/ 100'}
                                inputPrefix={characterSheetFields.paybackPoints >= 50 ? <i>warning</i> : <i>check</i>}
                                label={"Payback"}/>
                        </fieldset>
                    </div>
                </div>
                <hr className={"top-margin bottom-margin page-break"} />
                <div style={{display: "flex", gap: '1rem', alignItems: "stretch"}}>
                    <div style={{flex: 1, display: "flex", flexDirection: "column", gap: '1rem'}}>
                        <BeerCSSTextField containerClass={"flex-half"} label={'Background'} value={characterSheetFields.background} readOnly multiline/>
                        <BeerCSSTextField containerClass={"flex-half"} label={'Torus, Special Weapon, or Sigil Configuration'} readOnly multiline value={characterSheetFields.configuration}/>
                    </div>
                    <div style={{flex: 1, display: "flex", gap: '1rem', flexDirection: "column"}}>
                        <fieldset>
                            <TypographyWithAdornment text={"Traits & Flaws"} coloredText/>
                            <TraitAndFlawTable inPlay/>
                        </fieldset>
                        <BeerCSSTextField label={'Items'} multiline value={characterSheetFields.items} onChange={event => characterSheetFields.setItems(event.target.value)} />
                        <BeerCSSTextField label={'Other Learned Skills and Techniques'} multiline value={characterSheetFields.otherSkills} onChange={event => characterSheetFields.setOtherSkills(event.target.value)}/>
                    </div>
                </div>
                <article>
                    <TypographyWithAdornment text={"Skill Tree"} coloredText/>
                    <SkillTree readOnly/>
                </article>
            </div>
        </div>
    </div>;
}