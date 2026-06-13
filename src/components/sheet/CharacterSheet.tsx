import {type PowerKit, PowerTiers, type SaveData} from "../../logic/save-data.ts";
import {ColoredLogo} from "../ui/ColoredLogo.tsx";
import {db} from "../../logic/data-store.ts";
import LeftColumn from "./LeftColumn.tsx";
import {MiddleColumn} from "./MiddleColumn.tsx";
import {RightColumn} from "./RightColumn.tsx";
import {ActiveKarmastryPowerKit} from "./ActiveKarmastryPowerKit.tsx";
import {KarmastryPowerKit} from "./KarmastryPowerKit.tsx";
import {useState} from "react";
import ControlledInput from "../ui/ControlledInput.tsx";

export function CharacterSheet(props: Readonly<{ saveData: SaveData & { id: string }, powerKit: (PowerKit & { characterID: string, tier: PowerTiers })[] }>) {
    console.log(props.saveData.background)
    const [background, setBackground] = useState('')
    return <div className={"main responsive grid medium-space"}>
        <div className={'l3 s12'}>
            <ColoredLogo/>
            <div className={"bold upper"} style={{fontSize: "x-large"}}>Character Sheet</div>
        </div>
        <div className="field label border l9 s12 large">
            <input type="text" value={props.saveData.playerName} onChange={event => db.characters.update(props.saveData.id, {playerName: event.target.value})}/>
            <label>Player Name</label>
        </div>
        <div className={"m3 s12"}>
            <LeftColumn saveData={props.saveData}/>
        </div>
        <div className={"m6 s12"} style={{display: "flex", flexDirection: "column"}}>
            <MiddleColumn saveData={props.saveData}/>
        </div>
        <div className={"m3 s12"} style={{display: "flex", flexDirection: "column"}}>
            <RightColumn saveData={props.saveData}/>
        </div>
        <div className={"s12"}>
            <ActiveKarmastryPowerKit saveData={props.saveData} powerKit={props.powerKit} />
        </div>
        <div className={"s12 l6"}>
            <div className="field label border extra">
                <ControlledInput value={props.saveData.background} onChange={event => db.characters.update(props.saveData.id, {background: event.target.value})}></ControlledInput>
                <label><i className={"middle"}>double_arrow</i>Background</label>
            </div>
        </div>
        <div className={"s6 l3"}>
            <div className="field label border extra">
                <textarea></textarea>
                <label><i className={"middle"}>double_arrow</i>Traits</label>
            </div>
        </div>
        <div className={"s6 l3"}>
            <div className="field label border extra">
                <textarea></textarea>
                <label><i className={"middle"}>double_arrow</i>Flaws</label>
            </div>
        </div>
        <div className={"s12"}>
            <KarmastryPowerKit powerKit={props.powerKit[0]} tier={PowerTiers.BASIC1} id={props.saveData.id} />
        </div>
        <div className={"s12"}>
            <KarmastryPowerKit powerKit={props.powerKit[1]} tier={PowerTiers.BASIC2} id={props.saveData.id} />
        </div>
        <div className={"s12"}>
            <KarmastryPowerKit powerKit={props.powerKit[2]} tier={PowerTiers.ADVANCED1} id={props.saveData.id} />
        </div>
        <div className={"s12"}>
            <KarmastryPowerKit powerKit={props.powerKit[3]} tier={PowerTiers.ADVANCED2} id={props.saveData.id} />
        </div>
    </div>
}