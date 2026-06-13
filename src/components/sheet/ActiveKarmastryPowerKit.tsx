import {type PowerKit, PowerTiers, type SaveData} from "../../logic/save-data.ts";
import {db} from "../../logic/data-store.ts";
import {sample} from "lodash";

export function ActiveKarmastryPowerKit(props: Readonly<{ saveData: SaveData & { id: string }, powerKit: (PowerKit & { characterID: string, tier: PowerTiers })[] }>) {
    console.log(props.powerKit)
    return <>
        <h5 className={'bold upper center-align'}><i>keyboard_arrow_down</i>Karmastry Power Kit<i>keyboard_arrow_down</i></h5>
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
                <td>
                    <div className="field suffix border">
                        <select value={props.saveData.selectedAttackTier} onChange={event => db.characters.update(props.saveData.id, {selectedAttackTier: Number(event.target.value) as PowerTiers})}>
                            {props.powerKit.map(value => <option value={value.tier} key={value.tier}>{value.attackName ? value.attackName : `Unnamed Tier ${value.tier} Attack`}</option>)}
                        </select>
                        <i>arrow_drop_down</i>
                    </div>
                </td>
                <td>Cell</td>
                <td>Cell</td>
                <td>Cell</td>
                <td>Cell</td>
                <td>{props.powerKit[props.saveData.selectedAttackTier].attackDescription}</td>
            </tr>
            <tr>
                <td>
                    <div className="field suffix border">
                        <select value={props.saveData.selectedDefenseTier} onChange={event => db.characters.update(props.saveData.id, {selectedDefenseTier: Number(event.target.value) as PowerTiers})}>
                            {props.powerKit.map(value => <option value={value.tier} key={value.tier}>{value.defenseName ? value.defenseName : `Unnamed Tier ${value.tier} Defense`}</option>)}
                        </select>
                        <i>arrow_drop_down</i>
                    </div>
                </td>
                <td>Cell</td>
                <td>Cell</td>
                <td>Cell</td>
                <td>Cell</td>
                <td>{props.powerKit[props.saveData.selectedDefenseTier].defenseDescription}</td>
            </tr>
            <tr>
                <td>
                    <div className="field suffix border">
                        <select value={props.saveData.selectedComboTier} onChange={event => db.characters.update(props.saveData.id, {selectedComboTier: Number(event.target.value) as PowerTiers})}>
                            {props.powerKit.map(value => <option value={value.tier} key={value.tier}>{value.comboName ? value.comboName : `Unnamed Tier ${value.tier} Combo`}</option>)}
                        </select>
                        <i>arrow_drop_down</i>
                    </div>
                </td>
                <td>Cell</td>
                <td>Cell</td>
                <td>Cell</td>
                <td>Cell</td>
                <td>{props.powerKit[props.saveData.selectedComboTier].comboDescription}</td>
            </tr>
            <tr>
                <td>
                    <div className="field suffix border">
                        <select value={props.saveData.selectedSignatureTier} onChange={event => db.characters.update(props.saveData.id, {selectedSignatureTier: Number(event.target.value) as PowerTiers})}>
                            {props.powerKit.map(value => <option value={value.tier} key={value.tier}>{value.signatureName ? value.signatureName : `Unnamed Tier ${value.tier} Signature`}</option>)}
                        </select>
                        <i>arrow_drop_down</i>
                    </div>
                </td>
                <td>Cell</td>
                <td>Cell</td>
                <td>Cell</td>
                <td>Cell</td>
                <td>{props.powerKit[props.saveData.selectedSignatureTier].signatureDescription}</td>
            </tr>
            <tr>
                <td>
                    <div className="field suffix border">
                        <select value={props.saveData.selectedLocomotionTier} onChange={event => db.characters.update(props.saveData.id, {selectedLocomotionTier: Number(event.target.value) as PowerTiers})}>
                            {props.powerKit.map(value => <option value={value.tier} key={value.tier}>{value.locomotionName ? value.locomotionName : `Unnamed Tier ${value.tier} Locomotion`}</option>)}
                        </select>
                        <i>arrow_drop_down</i>
                    </div>
                </td>
                <td>Cell</td>
                <td>Cell</td>
                <td>Cell</td>
                <td>Cell</td>
                <td>{props.powerKit[props.saveData.selectedComboTier].comboDescription}</td>
            </tr>
            </tbody>
        </table>
    </>
}