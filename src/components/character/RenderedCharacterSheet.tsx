import {useCharacterSheetFields} from "../../hooks/useCharacterSheetFields.ts";
import {PowerProfileTable} from "../karma-abilities/PowerProfileTable.tsx";
import {getPowerLoadout} from "../../utils/types/KarmaPowerLoadout.ts";
import {getDefenseModifier, getEffectiveTalents, getHealingPercent, getMaxHP, getMaxKarma, getMovModifier, KarmaSpecialty} from "../../utils/types/KarmaSpecialty.ts";
import {TraitAndFlawTable} from "../traits/TraitAndFlawTable.tsx";
import {useEffect, useState} from "react";
import {TypographyWithAdornment} from "../ui/TypographyWithAdornment.tsx";
import {SkillTree} from "../skills/SkillTree.tsx";
import {useSkillTree} from "../../hooks/useSkillTree.ts";
import {ColoredLogo} from "../ui/ColoredLogo.tsx";
import {BeerCSSTextField} from "../ui/beer-css-wrappers/BeerCSSTextField.tsx";
import {NumericFormat} from "react-number-format";
import {UnselectedKarmaStudyWarning} from "../karma-abilities/UnselectedKarmaStudyWarning.tsx";


function getAdvantages(karmaSpecialty: KarmaSpecialty, level: number): string {
    let advantages = "";
    switch (karmaSpecialty) {
        case KarmaSpecialty.escapeArtist:
            advantages += "● Escape Artists can replenish 10 KP when completely depleted in battle"
            break
        case KarmaSpecialty.clockbot:
            advantages += "● Can absorb 50% of payback and karma-weapon attacks without taking damage, halving all potential damage"
            break
        case KarmaSpecialty.inkFighter:
            advantages += "● Can trade Movement for an extra action in combat"
            break
        case KarmaSpecialty.specialAgent:
            advantages += "● Receive 10% of their current merit balance as a government-approved bonus and an extra Med+ Kit after each checkpoint"
            break
    }
    if (level >= 2) {
        advantages += "\n● +5 to Karma Pool"
    }
    if (level >= 3) {
        advantages += "\n● +10 HP Boost"
    }
    if (level >= 4) {
        advantages += "\n● Extra Skill Tree point"
    }
    if (level >= 5) {
        advantages += "\n● +1 to Any Talent"
    }
    if (level >= 6) {
        advantages += "\n● 10% Discount in all Shops"
    }
    if (level >= 7) {
        advantages += "\n● +1 to DEF"
    }
    if (level >= 8) {
        advantages += "\n● +1 to DEF"
    }
    if (level >= 9) {
        advantages += "\n● All one-time items can be used twice"
    }
    if (level >= 10) {
        advantages += "\n● +10 to your Karma Pool"
    }

    return advantages;
}

function getSpecialItems(karmaSpecialty: KarmaSpecialty) {
    switch (karmaSpecialty) {
        case KarmaSpecialty.specialAgent:
            return "1 Security Badge (Common Clearance)"
        case KarmaSpecialty.inkFighter:
            return "3 Ink Syringes"
        case KarmaSpecialty.clockbot:
            return "1 Large Internal Torus"
        case KarmaSpecialty.escapeArtist:
            return "1 Large or 2 Small Toruses"
    }
}

export function RenderedCharacterSheet() {
    const characterSheetFields = useCharacterSheetFields();
    const {skills, level5Talent, talent1Options, vitalityOptions, talent3Options, talent4Options, talent2Options, talentedTalent} = useSkillTree();
    const [effectiveTalents] = getEffectiveTalents(characterSheetFields.study, characterSheetFields.aura, characterSheetFields.technique, characterSheetFields.stamina, characterSheetFields.function, characterSheetFields.willpower, characterSheetFields.agility, talent1Options, talent2Options, talent3Options, talent4Options, level5Talent, talentedTalent, skills, characterSheetFields.level, characterSheetFields.traits)
    const [printMode, setPrintMode] = useState(false)

    function printCharacterSheet() {
        setPrintMode(true);
    }

    useEffect(() => {
        if (printMode) {
            window.print()
            setPrintMode(false)
        }
    }, [printMode])

    return <div>
        <div>
            <div className={"grid middle-align"}>
                <div className={"s4"}>
                    <ColoredLogo/>
                    <span>Character Sheet</span>
                </div>
                <div className={"s8 bottom-margin fade"}>
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
                        <div className={"grid"}>
                            <div className={"s6"}>
                                {/*TODO Get a better numeric field*/}
                                <BeerCSSTextField inputMode={"numeric"}
                                                  className={"s6"}
                                                  onChange={(e) => characterSheetFields.setPositiveKarma(Math.max(0, Number(e.target.value)))}
                                                  type={"number"}
                                                  min={0}
                                                  value={characterSheetFields.positiveKarma}
                                                  label={"Positive KAP"}/>

                            </div>
                            <div className={"s6"}>
                                <BeerCSSTextField
                                    inputMode={"numeric"}
                                    className={"s6"}
                                    onChange={(e) => characterSheetFields.setNegativeKarma(Math.max(0, Number(e.target.value)))}
                                    type={"number"}
                                    value={characterSheetFields.negativeKarma}
                                    label={"Negative KAP"}/>

                            </div>
                        </div>
                        <div className="field border label textarea extra">
                            <textarea readOnly value={characterSheetFields.karmaSpecialty ? getAdvantages(characterSheetFields.karmaSpecialty, characterSheetFields.level) : ""}></textarea>
                            <label>Advantages</label>
                        </div>
                        <div className={"grid"}>
                            <div className={"s4"}>
                                <NumericFormat value={characterSheetFields.merits}
                                               customInput={BeerCSSTextField}
                                               label={"Merits"}
                                               inputPrefix={<i className={"tiny fill"}>hourglass</i>}
                                               onChange={(e) => characterSheetFields.setMerits(Math.max(0, Number(e.target.value)))}
                                               thousandSeparator/>
                            </div>
                            <div className={"s4"}>
                                <NumericFormat
                                    customInput={BeerCSSTextField}
                                    label="Med+ Kit #"
                                    variant={"outlined"}
                                    value={characterSheetFields.medKits}
                                    onChange={(e) => characterSheetFields.setMedKits(Math.max(0, Number(e.target.value)))}
                                />
                            </div>
                            <div className={"s4"}>
                                <BeerCSSTextField
                                    label="Med+ Kit %"
                                    variant={"outlined"}
                                    value={characterSheetFields.karmaSpecialty ? (getHealingPercent(characterSheetFields.karmaSpecialty, skills) + "%") : ""}
                                />
                            </div>
                        </div>
                        <BeerCSSTextField className={"top-margin"} label={'Special Items'} placeholder={characterSheetFields.karmaSpecialty ? getSpecialItems(characterSheetFields.karmaSpecialty) : ""} readOnly/>
                        <BeerCSSTextField className={"top-margin"} label={'Background'} value={characterSheetFields.background} readOnly multiline/>
                        <BeerCSSTextField className={"top-margin"} label={'Karma Tool Configuration'} readOnly multiline value={characterSheetFields.configuration}/>
                    </div>
                    <div className={"xl6 s12 l8"}>
                        <div>
                            <fieldset>
                                <legend><TypographyWithAdornment text={"Identity"} coloredText/></legend>
                                <BeerCSSTextField variant={"outlined"} value={characterSheetFields.characterName} label={"Character Name (+Alias)"} readOnly inputSize={"small"}/>
                                <div className={"grid"}>
                                    <div className={"s3"}>
                                        <BeerCSSTextField variant={"outlined"} value={characterSheetFields.age} label={"Age"} readOnly inputSize={"small"}/>
                                    </div>
                                    <div className={"s3"}>
                                        <BeerCSSTextField variant={"outlined"} value={characterSheetFields.gender} label={"Gender"} readOnly inputSize={"small"}/>
                                    </div>
                                    <div className={"s3"}>
                                        <BeerCSSTextField variant={"outlined"} value={characterSheetFields.height} label={"Height"} readOnly inputSize={"small"}/>
                                    </div>
                                    <div className={"s3"}>
                                        <BeerCSSTextField variant={"outlined"} value={characterSheetFields.weight} label={"Weight"} readOnly inputSize={"small"}/>
                                    </div>
                                </div>
                                <div className={"grid"}>
                                    <div className={"s6"}>
                                        <BeerCSSTextField variant={"outlined"} value={characterSheetFields.karmaSpecialty} label={"Karma Specialty"} readOnly inputSize={"small"}/>
                                    </div>
                                    <div className={"s6"}>
                                        <BeerCSSTextField variant={"outlined"} value={characterSheetFields.affiliation} label={"Affiliation"} readOnly inputSize={"small"}/>
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
                                                          readOnly/>
                                    </div>
                                    <div className={"s4 l2"}>
                                        <BeerCSSTextField value={"+" + effectiveTalents.technique}
                                                          label={"Technique"}
                                                          readOnly/>
                                    </div>
                                    <div className={"s4 l2"}>
                                        <BeerCSSTextField value={"+" + effectiveTalents.stamina}
                                                          label={"Stamina"}
                                                          readOnly/>
                                    </div>
                                    <div className={"s4 l2"}>
                                        <BeerCSSTextField value={"+" + effectiveTalents.function}
                                                          label={"Function"}
                                                          readOnly/>
                                    </div>
                                    <div className={"s4 l2"}>
                                        <BeerCSSTextField value={"+" + effectiveTalents.willpower}
                                                          label={"Willpower"}
                                                          readOnly/>
                                    </div>
                                    <div className={"s4 l2"}>
                                        <BeerCSSTextField value={"+" + effectiveTalents.agility}
                                                          label={"Agility"}
                                                          readOnly/>
                                    </div>
                                </div>
                                <div className={"grid"}>
                                    {/*TODO Add number range validation for level / HP / karma pool*/}
                                    <div className={"s4 l4"}>
                                        <BeerCSSTextField
                                            inputPrefix={<i>favorite</i>}
                                            type={"number"}
                                            onChange={(e) => characterSheetFields.setCurrentHP(Math.max(0, Number(e.target.value)))}
                                            value={characterSheetFields.currentHP}
                                            label={`HP`}
                                            helperText={`Max HP: ${getMaxHP(effectiveTalents, characterSheetFields.level, skills)}`}
                                        />
                                    </div>
                                    <div className={"s4 l4"}>
                                        <BeerCSSTextField
                                            inputPrefix={<i>shield</i>}
                                            readOnly
                                            value={characterSheetFields.affiliation ? "+" + getDefenseModifier(characterSheetFields.affiliation, characterSheetFields.level, skills, vitalityOptions) : "+1"}
                                            label={"DEF"}/>
                                    </div>
                                    <div className={"s4 l4"}>
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
                    <div className={"xl3 s12 grid"}>
                        <div className={"m6 s12"}>
                            <BeerCSSTextField
                                label="Study"
                                variant={"outlined"}
                                value={characterSheetFields.study}
                                readOnly/>
                            <NumericFormat
                                customInput={BeerCSSTextField}
                                label="Level"
                                min={1}
                                max={20}
                                variant={"outlined"}
                                className={"top-margin"}
                                value={characterSheetFields.level}
                                onChange={(e) => characterSheetFields.setLevel(Math.max(1, Number(e.target.value)))}
                            />
                            <fieldset>
                                <legend><TypographyWithAdornment text={"Gear of Destiny"} coloredText/></legend>
                                <img src={characterSheetFields.gearOfDestiny} style={{width: '100%'}}/>
                            </fieldset>
                        </div>
                        <div className={"m6 s12"}>
                            <fieldset className={"bottom-padding large-padding"}>
                                <legend><TypographyWithAdornment text={"Karma Pool"} coloredText/></legend>
                                <div className={"grid"}>
                                    <div className={"s6"}>
                                        <NumericFormat customInput={BeerCSSTextField}
                                                       onChange={(e) => characterSheetFields.setKarmaPool(Math.max(0, Number(e.target.value)))}
                                                       variant={"outlined"}
                                                       helperText={`Max Karma: ${characterSheetFields.karmaSpecialty ? getMaxKarma(characterSheetFields.karmaSpecialty, characterSheetFields.level, skills) : 0}`}
                                                       value={characterSheetFields.karmaPool}
                                                       label={"Karma Pool"}/>
                                    </div>
                                    <div className={"s6"}>
                                        {/*TODO Find a way to fit /100 into the textfield*/}
                                        <NumericFormat
                                            customInput={BeerCSSTextField}
                                            onChange={(e) => characterSheetFields.setPaybackPoints(Math.max(0, Number(e.target.value)))}
                                            variant={"outlined"}
                                            value={characterSheetFields.paybackPoints}
                                            inputPrefix={<i>check</i>}
                                            label={"Payback"}/>
                                    </div>
                                </div>
                            </fieldset>
                            <BeerCSSTextField label={'Items'} addMargin multiline value={characterSheetFields.items} onChange={event => characterSheetFields.setItems(event.target.value)}/>
                            <BeerCSSTextField label={'Other Learned Skills and Techniques'} multiline value={characterSheetFields.otherSkills} onChange={event => characterSheetFields.setOtherSkills(event.target.value)}/>
                            {/*TODO Move this*/}
                            <div style={{width: "100%", display: "flex"}} className={"top-margin"}>
                                {!printMode && <button className={" border tertiary-text ripple no-margin"} style={{width: "100%"}} onClick={() => printCharacterSheet()}>
                                    <i>print</i> <span>Print</span>
                                </button>}
                            </div>
                        </div>
                    </div>
                </div>
                <article>
                    <TypographyWithAdornment text={"Traits & Flaws"} coloredText/>
                    <TraitAndFlawTable inPlay/>
                </article>
                <article>
                    <TypographyWithAdornment text={"Skill Tree"} coloredText/>
                    <SkillTree readOnly/>
                </article>
            </div>
        </div>
        <div>
            <div className={""}>
            </div>
            <div className={""}>
            </div>

        </div>
    </div>;
}