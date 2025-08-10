import {Typography} from "@mui/material";
import {CharacterIdentity} from "./CharacterIdentity.tsx";
import {ColoredLogo} from "./ColoredLogo.tsx";

export function CharacterInfoInput() {
    return <>
        <div className={"grid"}>
            <div className={"s4"}>
                <ColoredLogo/>
                <Typography variant={"subtitle2"}>Character Builder</Typography>
            </div>
        </div>
        <CharacterIdentity/>
    </>
}