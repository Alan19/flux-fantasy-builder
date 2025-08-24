import {CharacterIdentity} from "./CharacterIdentity.tsx";
import {ColoredLogo} from "./ColoredLogo.tsx";

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