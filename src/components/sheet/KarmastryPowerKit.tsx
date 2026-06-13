import {type PowerKit, PowerTiers} from "../../logic/save-data.ts";
import {db} from "../../logic/data-store.ts";

export function KarmastryPowerKit(props: Readonly<{ powerKit: PowerKit & { characterID: string, tier: PowerTiers }, tier: PowerTiers, id: string }>) {
    return <>
        <h5 className={'bold upper center-align'}><i>keyboard_arrow_down</i>Tier {props.tier}</h5>
        <table>
            <thead>
            <tr>
                <th>Power Name</th>
                <th className={"min"}>KP Cost</th>
                <th className={"min"}>Damage</th>
                <th className={"min"}>Range</th>
                <th>Effect</th>
                <th>Power Description</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td className={"small-width"}>
                    <div className="field border small label">
                        <input type="text" value={props.powerKit.attackName} onChange={event => db.powers.update([props.id, props.tier], {attackName: event.target.value})}/>
                        <label>Attack Name</label>
                    </div>
                </td>
                <td>Cell</td>
                <td>Cell</td>
                <td>Cell</td>
                <td>Cell</td>
                <td>
                    <div className="field border small label">
                        <input type="text" value={props.powerKit.attackDescription} onChange={event => db.powers.update([props.id, props.tier], {attackDescription: event.target.value})}/>
                        <label>Attack Description</label>
                    </div>
                </td>
            </tr>
            <tr>
                <td className={"small-width"}>
                    <div className="field border small label">
                        <input type="text" value={props.powerKit.defenseName} onChange={event => db.powers.update([props.id, props.tier], {defenseName: event.target.value})}/>
                        <label>Defense Name</label>
                    </div>
                </td>
                <td>Cell</td>
                <td>Cell</td>
                <td>Cell</td>
                <td>Cell</td>
                <td>
                    <div className="field border small label">
                        <input type="text" value={props.powerKit.defenseDescription} onChange={event => db.powers.update([props.id, props.tier], {defenseDescription: event.target.value})}/>
                        <label>Defense Description</label>
                    </div>
                </td>
            </tr>
            <tr>
                <td className={"small-width"}>
                    <div className="field border small label">
                        <input type="text" value={props.powerKit.comboName} onChange={event => db.powers.update([props.id, props.tier], {comboName: event.target.value})}/>
                        <label>Combo Name</label>
                    </div>
                </td>
                <td>Cell</td>
                <td>Cell</td>
                <td>Cell</td>
                <td>Cell</td>
                <td>
                    <div className="field border small label">
                        <input type="text" value={props.powerKit.comboDescription} onChange={event => db.powers.update([props.id, props.tier], {comboDescription: event.target.value})}/>
                        <label>Combo Description</label>
                    </div>
                </td>
            </tr>
            <tr>
                <td className={"small-width"}>
                    <div className="field border small label">
                        <input type="text" value={props.powerKit.signatureName} onChange={event => db.powers.update([props.id, props.tier], {signatureName: event.target.value})}/>
                        <label>Signature Name</label>
                    </div>
                </td>
                <td>Cell</td>
                <td>Cell</td>
                <td>Cell</td>
                <td>Cell</td>
                <td>
                    <div className="field border small label">
                        <input type="text" value={props.powerKit.signatureDescription} onChange={event => db.powers.update([props.id, props.tier], {signatureDescription: event.target.value})}/>
                        <label>Signature Description</label>
                    </div>
                </td>
            </tr>
            <tr>
                <td className={"small-width"}>
                    <div className="field border small label">
                        <input type="text" value={props.powerKit.locomotionName} onChange={event => db.powers.update([props.id, props.tier], {locomotionName: event.target.value})}/>
                        <label>Locomotion Name</label>
                    </div>
                </td>
                <td>Cell</td>
                <td>Cell</td>
                <td>Cell</td>
                <td>Cell</td>
                <td>
                    <div className="field border small label">
                        <input type="text" value={props.powerKit.locomotionDescription} onChange={event => db.powers.update([props.id, props.tier], {locomotionDescription: event.target.value})}/>
                        <label>Locomotion Description</label>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </>
}