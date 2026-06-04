import type {SaveData} from "../../logic/save-data.ts";
import {db} from "../../logic/data-store.ts";
import {getAdvantages, getMedKitPercent} from "../../logic/stats.ts";

export default function LeftColumn(props: Readonly<{ saveData: SaveData & { id: string } }>) {
    return <div style={{display: "flex", gap: '1rem', flexDirection: "column"}}>
        <div>
            <h6 className={'bold upper'}><i>double_arrow</i>Portrait</h6>
            <img src={"https://alcorsiteartbucket.s3.amazonaws.com/webp/special_agent_tinker_alcor.webp"} style={{width: "100%", clipPath: 'polygon(0 0, 100% 0, 100% 75%, 75% 100%, 0 100%)', objectFit: "cover", objectPosition: "top", aspectRatio: 1 / 1.1, border: "2px solid var(--outline-variant)"}}/>
        </div>
        <div>
            <div style={{display: "flex", justifyContent: "stretch"}}>
                <i className={"auto-height"}>double_arrow</i>
                <div className={'bold upper'}>Karmic Alignment Points (KAPS)</div>
            </div>
            <div className={"grid no-margin"}>
                <div className="field border s6 prefix">
                    <i>add</i>
                    <input type="number" value={props.saveData.positiveKAP} onChange={event => db.characters.update(props.saveData.id, {positiveKAP: Number(event.target.value)})}/>
                </div>
                <div className="field border s6 prefix">
                    <i>remove</i>
                    <input type="number" value={props.saveData.negativeKAP} onChange={event => db.characters.update(props.saveData.id, {negativeKAP: Number(event.target.value)})}/>
                </div>
            </div>
        </div>
        <div>
            <div className={'bold upper'}><i>double_arrow</i>Advantages</div>
            <article className={"no-margin small"} style={{overflowY: "auto"}}>
                {getAdvantages(props.saveData.study, props.saveData.level).map(value => <div key={value}>• {value}</div>)}
            </article>
        </div>
        <div className="field prefix label border s6 m3">
            <i>hourglass</i>
            <input type="number" value={props.saveData.merits} onChange={event => db.characters.update(props.saveData.id, {merits: event.target.valueAsNumber})}/>
            <label><i className={"middle"}>double_arrow</i>Merits</label>
        </div>
        <div>
            <div style={{display: "flex", justifyContent: "stretch"}}>
                <i className={"middle-align"}>double_arrow</i>
                <div className={'bold upper'}>Med Kits</div>
            </div>
            <div className={"grid no-margin"}>
                <div className="field border s6 m12 l6 prefix">
                    <i>tag</i>
                    <input type="number" value={props.saveData.medKitCount} onChange={event => db.characters.update(props.saveData.id, {medKitCount: event.target.valueAsNumber})}/>
                </div>
                <div className="field border s6 m12 l6 prefix">
                    <i>percent</i>
                    <input type="number" value={getMedKitPercent(props.saveData.study)} readOnly/>
                </div>
            </div>
        </div>
    </div>
}