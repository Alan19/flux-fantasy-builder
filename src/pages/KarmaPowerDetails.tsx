import {ColoredLogo} from "../components/ui/ColoredLogo.tsx";
import {useIsMobile} from "../utils/hooks/useIsMobile.ts";
import {ModeToggle} from "../components/layout/ModeToggle.tsx";
import {clsx} from "clsx";
import {KarmaPowerTable} from "../components/karma-abilities/KarmaPowerTable.tsx";
import {TypographyWithAdornment} from "../components/ui/TypographyWithAdornment.tsx";
import {CharacterManager, OCSaveDataWithState} from "../utils/AssembleLocalStorage.ts";

export function KarmaPowerDetails(props: Readonly<{ ocData: OCSaveDataWithState & { characters: CharacterManager } }>) {
    const {inventory, skills, karmaPowers, background} = props.ocData;
    return <div>
        <div className={"grid medium-space"}>
            <div className={"s11 l4"}>
                <ColoredLogo/>
                <span>Character Sheet</span>
            </div>
            <div className={"s1"}>
                {useIsMobile() && <div><ModeToggle className={clsx("circle border tertiary-text")}/></div>}
            </div>
        </div>
        <article className={"fade"}>
            <fieldset>
                <legend>
                    <TypographyWithAdornment text={"Karma Powers"} coloredText/>
                </legend>
                <KarmaPowerTable displayMode={"edit"} karmaPowerLoadout={karmaPowers} skills={skills.unlockedSkills[0]} study={background.study[0]} isOverPaybackThreshold={inventory.payback[0] >= 50}/>
            </fieldset>
        </article>
    </div>;
}