import {KarmaPowerTable} from "../components/karma-abilities/KarmaPowerTable.tsx";
import {getBaseTalents, getDefenseModifier, getEffectiveTalents, getHealingPercent, getMaxHP, getMaxKarma, getMovModifier} from "../utils/types/KarmaSpecialty.ts";
import {TraitAndFlawTable} from "../components/traits/TraitAndFlawTable.tsx";
import {TypographyWithAdornment} from "../components/ui/TypographyWithAdornment.tsx";
import {ColoredLogo} from "../components/ui/ColoredLogo.tsx";
import {BeerCSSTextField} from "../components/ui/beer-css-wrappers/BeerCSSTextField.tsx";
import {MaterialNumberField} from "../components/ui/MaterialNumberField.tsx";
import {Advantages} from "../components/character/Advantages.tsx";
import {getSpecialItems} from "../components/character/GetSpecialItems.ts";
import {ModeToggle} from "../components/layout/ModeToggle.tsx";
import {useIsMobile} from "../utils/hooks/useIsMobile.ts";
import {clsx} from "clsx";
import {CharacterManager, OCSaveDataWithState} from "../utils/AssembleLocalStorage.ts";
import {CharacterTalents, SkillSettings} from "../utils/types/OCSaveData.ts";
import _ from "lodash";
import {SkillTree} from "../components/skills/SkillTree.tsx";

interface RenderedCharacterSheetProps {
    ocData: OCSaveDataWithState & { characters: CharacterManager }
}
export function RenderedCharacterSheet({ocData}: Readonly<RenderedCharacterSheetProps>) {
    const {
        karmaSpecialty: [karmaSpecialty],
        playerName: [playerName],
        level: [level, setLevel],
        study: [study],
        characterImageData: [characterImageData],
        traits: [traits, setTraits],
        flaws: [flaws, setFlaws],
        affiliation: [affiliation],
        background: [background],
        height: [height],
        weight: [weight],
        age: [age],
        gender: [gender],
        characterName: [characterName],
        gearOfDestinyImageData: [gearOfDestinyImageData],
        karmaEquipmentConfiguration: [karmaEquipmentConfiguration],
    } = ocData.background;
    const {
        positiveKarma: [positiveKarma, setPositiveKarma],
        items: [items, setItems],
        payback: [payback, setPayback],
        extraKarma: [extraKarma, setExtraKarma],
        otherSkills: [otherSkills, setOtherSkills],
        medKits: [medKits, setMedKits],
        merits: [merits, setMerits],
        karmaPool: [karmaPool, setKarmaPool],
        negativeKarma: [negativeKarma, setNegativeKarma],
        currentHP: [currentHP, setCurrentHP],
    } = ocData.inventory;
    const effectiveTalents = getEffectiveTalents({study: study, talented: ocData.background.traits[0].includes("Talented"), talentModifiers: Object.entries(ocData.talents).reduce((previousValue, currentValue) => ({...previousValue, [currentValue[0]]: currentValue[1][0]}), {}) as CharacterTalents, level: level, skills: Object.entries(_.omit(ocData.skills, "vitalityEnhance")).reduce((previousValue, currentValue) => ({...previousValue, [currentValue[0]]: currentValue[1][0]}), {}) as SkillSettings})

    const maxKarma = getMaxKarma(karmaSpecialty, level, ocData.skills.unlockedSkills[0]);
    const maxHP = getMaxHP(effectiveTalents, level, ocData.skills.unlockedSkills[0]);
    const {Technique: effectiveTechnique, Agility: effectiveAgility, Stamina: effectiveStamina, Aura: effectiveAura, Willpower: effectiveWillpower, Function: effectiveFunction} = effectiveTalents;
    return <div>
        <div>
            <div className={"grid medium-space"}>
                <div className={"s11 l4"}>
                    <ColoredLogo/>
                    <span>Character Sheet</span>
                </div>
                {useIsMobile() && <div className={"s1"}><ModeToggle className={clsx("circle border tertiary-text")}/></div>}
                <div className={"s12 l8 bottom-margin fade"}>
                    <BeerCSSTextField variant={"filled"} value={playerName} label={"Player Name"} inputSize={"medium"} readOnly/>
                </div>
            </div>
            <div className={"fade"}>
                <div className={"grid top-margin medium-space"}>
                    <div className={"xl3 l4 s12 justified-column"}>
                        <div>
                            <TypographyWithAdornment text={"Portrait"} coloredText/>
                            <img src={characterImageData} style={{width: "100%", clipPath: 'polygon(0 0, 100% 0, 100% 75%, 75% 100%, 0 100%)', objectFit: "cover", objectPosition: "top", height: "350px", border: "2px solid var(--outline-variant)"}}/>
                        </div>
                        <fieldset>
                            <legend><i>double_arrow</i>Karmic Alignment PTs</legend>
                            <div className={"grid no-margin"}>
                                <MaterialNumberField className={"s6 no-margin"}
                                                     onChange={(e) => setPositiveKarma(Math.max(0, e))}
                                                     max={100}
                                                     value={positiveKarma}
                                                     label={"Positive KAP"}/>
                                <MaterialNumberField className={"s6 no-margin"}
                                                     onChange={newVal => setNegativeKarma(Math.max(0, newVal))}
                                                     max={100}
                                                     value={negativeKarma}
                                                     label={"Negative KAP"}/>
                            </div>
                        </fieldset>
                        <article className={"small scroll top-margin bottom-margin"}>
                            {karmaSpecialty && <Advantages karmaSpecialty={karmaSpecialty} level={level}/>}
                        </article>
                        <div className={"grid no-margin"}>
                            <MaterialNumberField value={merits} label={"Merits"} className={"m6 s12"} inputPrefix={<i className={"tiny fill"}>hourglass</i>} onChange={(e) => setMerits(Math.max(0, e))}/>
                            <MaterialNumberField label="Med+ Kit #"
                                                 value={medKits}
                                                 className={"m6 s12"}
                                                 onChange={(e) => setMedKits(e)}
                                                 endAdornment={karmaSpecialty ? `(${getHealingPercent(karmaSpecialty, ocData.skills.unlockedSkills[0])}%)` : ""}
                                                 inputPrefix={<i>healing</i>}/>
                        </div>
                        <div>
                            <BeerCSSTextField label={'Special Items'} multiline value={karmaSpecialty ? getSpecialItems(karmaSpecialty) : ""} readOnly className={"top-margin"}/>
                        </div>
                    </div>
                    <div className={"xl6 s12 l8 justified-column"}>
                        <fieldset>
                            <legend><TypographyWithAdornment text={"Identity"} coloredText/></legend>
                            <BeerCSSTextField variant={"outlined"} value={characterName} label={"Character Name (+Alias)"} readOnly/>
                            <div className={"grid"}>
                                <div className={"s3"}>
                                    <BeerCSSTextField variant={"outlined"} value={age} label={"Age"} readOnly/>
                                </div>
                                <div className={"s3"}>
                                    <BeerCSSTextField variant={"outlined"} value={gender} label={"Gender"} readOnly/>
                                </div>
                                <div className={"s3"}>
                                    <BeerCSSTextField variant={"outlined"} value={height} label={"Height"} readOnly/>
                                </div>
                                <div className={"s3"}>
                                    <BeerCSSTextField variant={"outlined"} value={weight} label={"Weight"} readOnly/>
                                </div>
                            </div>
                            <div className={"grid"}>
                                <div className={"s6"}>
                                    <BeerCSSTextField variant={"outlined"} value={karmaSpecialty} label={"Karma Specialty"} readOnly/>
                                </div>
                                <div className={"s6"}>
                                    <BeerCSSTextField variant={"outlined"} value={affiliation} label={"Affiliation"} readOnly/>
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
                                    <BeerCSSTextField value={"+" + effectiveAura}
                                                      label={"Aura"}
                                                      variant={"filled"}
                                                      readOnly/>
                                </div>
                                <div className={"s4 l2"}>
                                    <BeerCSSTextField value={"+" + effectiveStamina}
                                                      label={"Stamina"}
                                                      variant={"filled"}
                                                      readOnly/>
                                </div>
                                <div className={"s4 l2"}>
                                    <BeerCSSTextField value={"+" + effectiveAgility}
                                                      label={"Agility"}
                                                      variant={"filled"}
                                                      readOnly/>
                                </div>
                                <div className={"s4 l2"}>
                                    <BeerCSSTextField value={"+" + effectiveTechnique}
                                                      label={"Technique"}
                                                      variant={"filled"}
                                                      readOnly/>
                                </div>
                                <div className={"s4 l2"}>
                                    <BeerCSSTextField value={"+" + effectiveWillpower}
                                                      label={"Willpower"}
                                                      variant={"filled"}
                                                      readOnly/>
                                </div>
                                <div className={"s4 l2"}>
                                    <BeerCSSTextField value={"+" + effectiveFunction}
                                                      label={"Function"}
                                                      variant={"filled"}
                                                      readOnly/>
                                </div>
                            </div>
                            <div className={"grid bottom-align"} style={{marginTop: 0}}>
                                <div className={"s12 l4"}>
                                    <MaterialNumberField
                                        inputPrefix={<i>favorite</i>}
                                        onChange={(e) => setCurrentHP(Math.min(e, maxHP))}
                                        value={currentHP}
                                        label={`HP`}
                                        max={maxHP}
                                        endAdornment={"/ " + maxHP}
                                    />
                                </div>
                                <div className={"s12 l4"}>
                                    <BeerCSSTextField
                                        inputPrefix={<i>shield</i>}
                                        readOnly
                                        value={`+${getDefenseModifier(affiliation, level, ocData.skills.unlockedSkills[0], ocData.skills.vitalityEnhance[0])}`}
                                        label={"DEF"}/>
                                </div>
                                <div className={"s12 l4"}>
                                    <BeerCSSTextField
                                        inputPrefix={<i>directions_run</i>}
                                        readOnly
                                        value={getMovModifier(effectiveTalents, ocData.skills.unlockedSkills[0], ocData.skills.vitalityEnhance[0])}
                                        label={"MOV"}/>
                                </div>
                            </div>
                        </fieldset>
                        {<fieldset>
                            <legend><TypographyWithAdornment text={"Karma Power Profile"} coloredText/></legend>
                            <KarmaPowerTable displayMode={"select"} karmaPowerLoadout={ocData.karmaPowers} study={study} skills={ocData.skills.unlockedSkills[0]} isOverPaybackThreshold={ocData.inventory.payback[0] >= 50}/>
                        </fieldset>}
                    </div>
                    <div className={"xl3  s12 no-space flex-column"}>
                        {/*TODO Make this look better*/}
                        <BeerCSSTextField
                            label="Study"
                            variant={"outlined"}
                            value={study}
                            readOnly/>
                        <MaterialNumberField
                            label="Level"
                            min={1}
                            max={10}
                            className={"top-margin"}
                            value={level}
                            onChange={(e) => setLevel(Math.max(1, Number(e)))}
                        />
                        <div className={"grid"}>
                        <fieldset className={"l12 s12 m8"}>
                            <legend><TypographyWithAdornment text={"Gear of Destiny"} coloredText/></legend>
                            <img src={gearOfDestinyImageData} style={{width: '100%', aspectRatio: 1}}/>
                        </fieldset>
                        <fieldset className={"l12 s12 m4"} style={{paddingTop: 0, flex: 1}}>
                            <legend><TypographyWithAdornment text={"Karma Pool"} coloredText/></legend>
                            <MaterialNumberField onChange={(e) => setKarmaPool(Math.min(maxKarma, e))}
                                                 endAdornment={`/ ${maxKarma}`}
                                                 value={karmaPool}
                                                 max={maxKarma}
                                                 label={"Karma Pool"}/>
                            <MaterialNumberField onChange={(e) => setExtraKarma(Math.min(extraKarma, e))}
                                                 value={extraKarma}
                                                 label={"Extra Karma"}/>
                            <MaterialNumberField
                                onChange={(e) => setPayback(Math.min(100, e))}
                                value={payback}
                                max={100}
                                endAdornment={'/ 100'}
                                inputPrefix={payback >= 50 ? <i>warning</i> : <i>check</i>}
                                label={"Payback"}/>
                        </fieldset>
                        </div>
                    </div>
                </div>
                <hr className={"top-margin bottom-margin page-break"}/>
                <div style={{display: "flex", gap: '1rem', alignItems: "stretch"}}>
                    <div style={{flex: 1, display: "flex", flexDirection: "column", gap: '1rem'}}>
                        <BeerCSSTextField containerClass={"flex-one"} label={'Background'} value={background} readOnly multiline/>
                        <fieldset className={"no-margin"}>
                            <legend>Torus, Special Weapon, or Sigil Configuration</legend>
                            <img style={{width: "100%", aspectRatio: 2, objectPosition: "top", objectFit: "cover"}}  src={karmaEquipmentConfiguration}/>
                        </fieldset>
                    </div>
                    <div style={{flex: 1, display: "flex", gap: '1rem', flexDirection: "column"}}>
                        <fieldset>
                            <TypographyWithAdornment text={"Traits & Flaws"} coloredText/>
                            <TraitAndFlawTable traits={traits} flaws={flaws} setFlaws={setFlaws} setTraits={setTraits} affiliation={affiliation} inPlay/>
                        </fieldset>
                        <BeerCSSTextField label={'Items'} multiline value={items} onChange={event => setItems(event.target.value)}/>
                        <BeerCSSTextField label={'Other Learned Skills and Techniques'} multiline value={otherSkills} onChange={event => setOtherSkills(event.target.value)}/>
                    </div>
                </div>
                <article>
                    <TypographyWithAdornment text={"Skill Tree"} coloredText/>
                    <SkillTree skills={ocData.skills} level={level} isTalented={traits.includes("Talented")} talentModifiers={getBaseTalents(Object.entries(ocData.talents).reduce((previousValue, currentValue) => ({...previousValue, [currentValue[0]]: currentValue[1][0]}), {}) as CharacterTalents, study)} />
                </article>
            </div>
        </div>
    </div>;
}