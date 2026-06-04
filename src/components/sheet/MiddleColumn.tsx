import {Affiliation, type SaveData} from "../../logic/save-data.ts";
import {getDefenseModifier, getKarmaSpecialty, getMaxHP, getMovModifier} from "../../logic/stats.ts";
import {db} from "../../logic/data-store.ts";
import {clamp, sample} from "lodash";
import {clsx} from "clsx";
import {getBoostedTalent, getEffectiveTalents} from "../../logic/talents.ts";
import {useMediaQuery} from "usehooks-ts";

export function MiddleColumn(props: Readonly<{ saveData: SaveData & { id: string } }>) {
    const {agility, aura, function: function1, stamina, technique, willpower} = getEffectiveTalents({agility: props.saveData.baseAgility, stamina: props.saveData.baseStamina, technique: props.saveData.baseTechnique, willpower: props.saveData.baseWillpower, ["function"]: props.saveData.baseFunction, aura: props.saveData.baseAura}, props.saveData.study, props.saveData.level, props.saveData)
    const isLarge = useMediaQuery('(min-width: 601px)')
    return <>
        <h6 className={'bold upper'}><i>double_arrow</i>Identity</h6>
        <article className={"grid"}>
            <div className="field label border s12">
                <input type="text" value={props.saveData.characterName} onChange={event => db.characters.update(props.saveData.id, {characterName: event.target.value})}/>
                <label>Character Name (+alias)</label>
            </div>
            <div className="field label border s6 m3">
                <input type="text" value={props.saveData.age} onChange={event => db.characters.update(props.saveData.id, {age: event.target.value})}/>
                <label>Age</label>
            </div>
            <div className="field label border s6 m3">
                <input type="text" value={props.saveData.gender} onChange={event => db.characters.update(props.saveData.id, {gender: event.target.value})}/>
                <label>Gender</label>
            </div>
            <div className="field label border s6 m3">
                <input type="text" value={props.saveData.height} onChange={event => db.characters.update(props.saveData.id, {height: event.target.value})}/>
                <label>Height</label>
            </div>
            <div className="field label border s6 m3">
                <input type="text" value={props.saveData.weight} onChange={event => db.characters.update(props.saveData.id, {weight: event.target.value})}/>
                <label>Weight</label>
            </div>
            <div className="field label border s6">
                <input readOnly type="text" value={getKarmaSpecialty(props.saveData.study)}/>
                <label>Karmastry Specialty</label>
            </div>
            <div className="field label suffix border s6">
                <select value={props.saveData.affiliation} onChange={event => db.characters.update(props.saveData.id, {affiliation: event.target.value as Affiliation})}>
                    {Object.values(Affiliation).map(value => <option key={value}>{value}</option>)}
                </select>
                <label>Affiliation</label>
                <i>arrow_drop_down</i>
            </div>
        </article>
        <h5 className={'bold upper center-align'}><i>keyboard_arrow_down</i>Talents<i>keyboard_arrow_down</i></h5>
        <article style={{flex: 1, display: "flex", flexDirection: "column", gap: '1rem'}}>
            <div style={{flex: 1}}>
                <div className={"grid"}>
                    <div className="field label l2 s4">
                        <input type="text" value={'+' + aura} readOnly/>
                        <label>Aura</label>
                    </div>
                    <div className="field label l2 s4">
                        <input type="text" value={'+' + stamina} readOnly/>
                        <label>Stamina</label>
                    </div>
                    <div className="field label l2 s4">
                        <input type="text" value={'+' + agility} readOnly/>
                        <label>Agility</label>
                    </div>
                    <div className="field label l2 s4">
                        <input type="text" value={'+' + technique} readOnly/>
                        <label>Technique</label>
                    </div>
                    <div className="field label l2 s4">
                        <input type="text" value={'+' + willpower} readOnly/>
                        <label>Willpower</label>
                    </div>
                    <div className="field label l2 s4">
                        <input type="text" value={'+' + function1} readOnly/>
                        <label>Function</label>
                    </div>
                    <div className={clsx("round field label border l3 m12 s4", isLarge && "prefix")}>
                        <i className={"m l"}>shield</i>
                        <input type="text" value={`+${getDefenseModifier(props.saveData.affiliation, props.saveData.level)}`} readOnly/>
                        <label>DEF</label>
                    </div>
                    <div className={clsx("round field label border l6 m12 s4 suffix", isLarge && "prefix")}>
                        <i className={"m l"}>favorite</i>
                        <input type="number" value={props.saveData.currentHP} onChange={event => db.characters.update(props.saveData.id, {currentHP: clamp(event.target.valueAsNumber, 0, getMaxHP(props.saveData.baseFunction, props.saveData.level))})}/>
                        <label>HP</label>
                        <div className={"absolute"} style={{right: '1rem', top: 12}}>/{getMaxHP(props.saveData.baseFunction, props.saveData.level)}</div>
                    </div>
                    <div className={clsx("round field label border l3 m12 s4", isLarge && "prefix") }>
                        <i className={"m l"}>directions_run</i>
                        <input type="number" value={getMovModifier(props.saveData.baseAgility)} readOnly/>
                        <label>MOV</label>
                    </div>
                </div>
            </div>

            <div className={"border medium-padding"} style={{flex: 1}}>
                <h6 className={"upper bold"}>Base Talents</h6>
                <div className={"grid"} >
                    {([["Aura", "baseAura"], ["Stamina", "baseStamina"], ["Agility", "baseAgility"], ["Technique", "baseTechnique"], ["Willpower", "baseWillpower"], ["Function", "baseFunction"]] as [string, keyof SaveData][])
                        .map(([label, talent]) => <div key={label} className={"s6 l4"}>
                            <span className={"bold"}>{label}</span>{getBoostedTalent(props.saveData.study) === label.toLowerCase() && <i>arrow_upward_alt</i>}
                            <nav className="group connected no-margin">
                                {/*@ts-expect-error The possible values of the array should be keys of SaveData*/}
                                {["left-round", "no-round", "right-round"].map((value, index) => <button key={label + index} onClick={() => db.characters.update(props.saveData.id, {[talent]: index + 1})} className={clsx(value, (props.saveData[talent] === (index + 1)) && "active", "small")} style={{flex: 1}}>+{index + 1}</button>)}
                            </nav>
                        </div>)}

                </div>
            </div>
        </article>
        <br/>
        <div className={"grid top-padding"}>
            <div className="field label border s12 m6">
                <input type="text" value={props.saveData.powerTheme} onChange={event => db.characters.update(props.saveData.id, {powerTheme: event.target.value})}/>
                <label><i className={"middle"}>double_arrow</i>Power Theme</label>
            </div>
            <div className="field label border s12 m6">
                <input type="text" value={props.saveData.nonKarmaPower} onChange={event => db.characters.update(props.saveData.id, {nonKarmaPower: event.target.valueAsNumber})}/>
                <label><i className={"middle"}>double_arrow</i>Non-Karma Power</label>
            </div>
        </div>
    </>
}