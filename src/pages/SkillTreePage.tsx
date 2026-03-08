import {ColoredLogo} from "../components/ui/ColoredLogo.tsx";
import {useIsMobile} from "../utils/hooks/useIsMobile.ts";
import {ModeToggle} from "../components/layout/ModeToggle.tsx";
import {clsx} from "clsx";
import {TypographyWithAdornment} from "../components/ui/TypographyWithAdornment.tsx";
import {SkillTree} from "../components/skills/SkillTree.tsx";
import {getBaseTalentModifersWithStudyBonus, getBaseTalentModifiers} from "../utils/types/KarmaSpecialty.ts";
import {OCSaveDataWithState} from "../utils/AssembleLocalStorage.ts";

export function SkillTreePage(props: Readonly<{ ocData: OCSaveDataWithState }>) {
    const {ocData} = props
    return <div className={"fade"}>
        <div className={"grid medium-space"}>
            <div className={"s11 l4"}>
                <ColoredLogo/>
                <span>Character Sheet</span>
            </div>
            <div className={"s1"}>
                {useIsMobile() && <div><ModeToggle className={clsx("circle border tertiary-text")}/></div>}
            </div>
        </div>
        <article>
            <TypographyWithAdornment coloredText text={"Skill Tree"}/>
            <SkillTree showStatBoost isTalented={ocData.background.traits[0].includes("Talented")} skills={ocData.skills} level={ocData.background.level[0]} talentModifiers={getBaseTalentModifersWithStudyBonus(getBaseTalentModifiers(ocData), ocData.background.study[0])}/>
        </article>
    </div>;
}