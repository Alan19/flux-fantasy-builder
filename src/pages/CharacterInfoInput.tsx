import {CharacterIdentity} from "./CharacterIdentity.tsx";
import {ColoredLogo} from "../components/ui/ColoredLogo.tsx";
import {useIsMobile} from "../utils/hooks/useIsMobile.ts";
import {ModeToggle} from "../components/layout/ModeToggle.tsx";
import {clsx} from "clsx";
import {CharacterManager, OCSaveDataWithState} from "../utils/AssembleLocalStorage.ts";

export function CharacterInfoInput(props: Readonly<{ ocData: OCSaveDataWithState & { characters: CharacterManager } }>) {
    return <>
        <div className={"grid medium-space"}>
            <div className={"s11 l4"}>
                <ColoredLogo/>
                <span>Character Sheet</span>
            </div>
            <div className={"s1"}>
                {useIsMobile() && <div><ModeToggle className={clsx("circle border tertiary-text")}/></div>}
            </div>
        </div>
        <CharacterIdentity ocData={props.ocData}/>
    </>
}