import {CharacterIdentity} from "./CharacterIdentity.tsx";
import {ColoredLogo} from "../components/ui/ColoredLogo.tsx";
import {useIsMobile} from "../utils/hooks/useIsMobile.ts";
import {ModeToggle} from "../components/layout/ModeToggle.tsx";
import {clsx} from "clsx";
import {CharacterManager, OCSaveDataWithState} from "../utils/hooks/useOCLocalStorage.ts";

export function CharacterInfoInput(props: Readonly<{ ocData: OCSaveDataWithState & { characters: CharacterManager } }>) {
    return <>
        <div style={{display: "flex", gap: '2rem', alignItems: "baseline"}}>
            <div style={{flex: "1", maxWidth: "500px"}}>
                <ColoredLogo/>
                <span>Character Builder</span>
            </div>
            <div>
                {useIsMobile() && <div><ModeToggle className={clsx("circle border tertiary-text")}/></div>}
            </div>
        </div>
        <CharacterIdentity ocData={props.ocData}/>
    </>
}