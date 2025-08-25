import {CharacterIdentity} from "./CharacterIdentity.tsx";
import {ColoredLogo} from "../ui/ColoredLogo.tsx";

export function CharacterInfoInput() {
    return <>
        <div className={"grid"}>
            <div className={"s4"}>
                <ColoredLogo/>
                <span>Character Builder</span>
            </div>
        </div>
        <CharacterIdentity/>
    </>
}