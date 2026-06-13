import {ClockbotStudies, EscapeArtistStudies, InkFighterStudies, type KarmaStudy, type SaveData, SpecialAgentStudies} from "../../logic/save-data.ts";
import {db} from "../../logic/data-store.ts";
import {getMaxKarma} from "../../logic/stats.ts";
import * as _ from "lodash";

export function RightColumn(props: Readonly<{ saveData: SaveData & { id: string } }>) {
    const maxKarma = getMaxKarma(props.saveData.study, props.saveData.level);

    return <>
        <h6 className={'bold upper m l'} style={{visibility: 'hidden'}}><i>double_arrow</i></h6>
        <div className="field label suffix border">
            <select onChange={event => db.characters.update(props.saveData.id, {study: event.target.value as KarmaStudy})} value={props.saveData.study}>
                <optgroup label={"Escape Artist"}>
                    {Object.values(EscapeArtistStudies).map(value => <option key={value}>{value}</option>)}
                </optgroup>
                <optgroup label={"Ink Fighter"}>
                    {Object.values(InkFighterStudies).map(value => <option key={value}>{value}</option>)}
                </optgroup>
                <optgroup label={"Special Agent"}>
                    {Object.values(SpecialAgentStudies).map(value => <option key={value}>{value}</option>)}
                </optgroup>
                <optgroup label={"Clockbot"}>
                    {Object.values(ClockbotStudies).map(value => <option key={value}>{value}</option>)}
                </optgroup>
            </select>
            <label><i className={"middle"}>double_arrow</i>Karma Study</label>
            <i>arrow_drop_down</i>
        </div>
        <div className="field label border">
            <input type="number" value={props.saveData.level} onChange={event => db.characters.update(props.saveData.id, {level: Math.floor(_.clamp(Number(event.target.value), 1, 10)) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10})}/>
            <label>Level</label>
        </div>
        <h6 className={'bold upper'}><i>double_arrow</i>Gear of Destiny</h6>
        <div>
            <input type={"file"}/>
            <img src={"https://alcorsiteartbucket.s3.amazonaws.com/webp/alcors_logos_2.webp"} style={{width: "100%", objectFit: "cover", objectPosition: "top", aspectRatio: 1, border: "2px solid var(--outline-variant)"}}/>
        </div>

        <div className={"border top-margin"} style={{flex: 1}}>
            <h6 className={"upper primary center-align bold"}><i>keyboard_arrow_down</i>Karma Pool<i>keyboard_arrow_down</i></h6>
            <div className={"small-padding"}>
                <div style={{display: "flex", flexDirection: "column", gap: '.5rem'}}>
                    <div className={"grid"}>
                        <div className="field middle-align s7">
                            <div className="slider medium">
                                <input type="range" value={props.saveData.karma} max={maxKarma} min={0} onChange={event => db.characters.update(props.saveData.id, {karma: event.target.valueAsNumber})}/>
                                <span></span>
                            </div>
                            <output>Karma (KP)</output>
                        </div>
                        <div className="field fill suffix no-margin s5">
                            <input type="number" min={0} max={maxKarma} value={props.saveData.karma} onChange={event => db.characters.update(props.saveData.id, {karma: event.target.valueAsNumber})}/>
                            <div className={"absolute"} style={{right: '1rem', top: 12}}>/{maxKarma}</div>
                        </div>
                    </div>
                    <hr/>
                    <div className={"grid"}>
                        <div className="field middle-align s7">
                            <div className="slider medium">
                                <input type="range" value={props.saveData.payback} min={0} max={100} onChange={event => db.characters.update(props.saveData.id, {payback: event.target.valueAsNumber})}/>
                                <span><i>dangerous</i></span>
                            </div>
                            <output>Payback (PBP)</output>
                        </div>
                        <div className="fill field no-margin s5">
                            <input type="number" min={0} max={100} value={props.saveData.payback} onChange={event => db.characters.update(props.saveData.id, {payback: event.target.valueAsNumber})}/>
                        </div>
                    </div>
                    <hr/>
                    <div className="field round border center label small top-margin">
                        <input type="number" value={props.saveData.extraKarma} onChange={event => db.characters.update(props.saveData.id, {extraKarma: Number(event.target.valueAsNumber)})}/>
                        <label>Extra Karma</label>
                    </div>
                </div>
            </div>
        </div>
    </>
}