import {CharacterIdentity} from "./CharacterIdentity.tsx";
import {ColoredLogo} from "../ui/ColoredLogo.tsx";
import {useIsMobile} from "../../hooks/useIsMobile.ts";
import {ModeToggle} from "../layout/ModeToggle.tsx";
import {clsx} from "clsx";

export function CharacterInfoInput() {
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
        <CharacterIdentity/>
    </>
}