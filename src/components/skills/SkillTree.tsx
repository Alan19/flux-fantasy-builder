import {isSkillUnlocked} from "../../utils/utils.ts";
import {Talent} from "../../utils/types/KarmaSpecialty.ts";
import {BeerCSSCheckbox} from "../ui/beer-css-wrappers/BeerCSSCheckbox.tsx";
import {BeerCSSSelect} from "../ui/beer-css-wrappers/BeerCSSSelect.tsx";
import {KarmaSkills, karmaSkillTree, personalitySkillTree, SkillName, SkillTreeNode, TalentSkills, talentsSkillTree, VitalitySkills, vitalitySkillTree} from "./SkillTreeInfo.ts";
import {Traits} from "../../utils/types/Traits.ts";
import _ from "lodash";

export function SkillTree(props: Readonly<{
    level: number,
    traits: Traits[],
    aura: number,
    stamina: number,
    agility: number,
    technique: number,
    willpower: number,
    function: number,
    selectedSkills: SkillName[],
    setSelectedSkills: (skill: SkillName[]) => void,
    talent1?: Talent.AURA | Talent.STAMINA,
    talent2?: Talent.AGILITY | Talent.FUNCTION,
    talent3?: Talent.TECHNIQUE | Talent.WILLPOWER,
    talent4?: Talent,
    level5Talent?: Talent,
    talented?: Talent,
    setTalent1: (choice:Talent.AURA | Talent.STAMINA ) => void,
    setTalent2: (choice: Talent.AGILITY | Talent.FUNCTION) => void,
    setTalent3: (choice: Talent.TECHNIQUE | Talent.WILLPOWER) => void,
    setTalent4: (choice: Talent) => void,
    setLevel5Talent: (choice: Talent) => void,
    setTalented: (choice: Talent) => void,
    vitalityEnhance?: "MOV" | "DEF",
    setVitalityEnhance: (choice: "MOV" | "DEF") => void,
}>) {
    const {level, traits, aura, stamina, agility, technique, willpower, function: functionStat, selectedSkills} = props

    function getSkillCheckbox(skillName: SkillName, skillData: SkillTreeNode) {
        return <BeerCSSCheckbox label={skillName} checked={selectedSkills.includes(skillName)} onChange={() => props.setSelectedSkills(_.xor(props.selectedSkills, [skillName]))} disabled={!isSkillUnlocked(skillData, selectedSkills, level) && !selectedSkills.includes(skillName)} key={skillName}/>
    }

    const karmaSkillCount = selectedSkills.filter(value => (Object.values(KarmaSkills) as string[]).includes(value)).length;
    const nonKarmaSkillCount = selectedSkills.filter(value => !(Object.values(KarmaSkills) as string[]).includes(value)).length;
    const karmaSkillPoints = Math.max(level - 1 - karmaSkillCount, 0);
    const otherSkillPoints = (level - 1) * 2 + (level > 3 ? 1 : 0) - Math.max(karmaSkillCount - (level - 1), 0) - nonKarmaSkillCount;

    return <>
        {/*TODO Disable skill selection if you run out of skill points*/}
        <span>You have {karmaSkillPoints} Karma skill points and {otherSkillPoints} skill points left!</span>
        <div className={'grid'}>
            {/*TODO Add error if you remove prerequisite*/}
            <fieldset className={"s6 l3"}>
                <legend>Vitality</legend>
                <nav className={"vertical"}>
                    {Object.entries(vitalitySkillTree).map(([key, value]) => getSkillCheckbox(key as SkillName, value))}
                </nav>
            </fieldset>
            <fieldset className={"s6 l3"}>
                <legend>Personality</legend>
                <nav className={"vertical"}>
                    {Object.entries(personalitySkillTree).map(([key, value]) => getSkillCheckbox(key as SkillName, value))}
                </nav>
            </fieldset>
            <fieldset className={"s6 l3"}>
                <legend>Karma</legend>
                <nav className={"vertical"}>
                    {Object.entries(karmaSkillTree).map(([key, value]) => getSkillCheckbox(key as SkillName, value))}
                </nav>
            </fieldset>
            <fieldset className={"s6 l3"}>
                <legend>Talent</legend>
                <nav className={"vertical"}>
                    {Object.entries(talentsSkillTree).map(([key, value]) => getSkillCheckbox(key as SkillName, value))}
                </nav>
            </fieldset>
        </div>
        <nav className={"vertical"}>
            <fieldset style={{width: '100%'}}>
                <legend>Stat Boosts</legend>
                {/*TODO Add margins between selects*/}
                {selectedSkills.includes(TalentSkills.talent1) && <BeerCSSSelect fill label={"Talent 1"} value={props.talent1} onChange={event => props.setTalent1(event.target.value as Talent.AURA | Talent.STAMINA)}>
                    <option value={"Aura"}>Aura</option>
                    <option value={"Stamina"}>Stamina</option>
                </BeerCSSSelect>}
                {selectedSkills.includes(TalentSkills.talent2) && <BeerCSSSelect fill label={"Talent 3"} value={props.talent2} onChange={event => props.setTalent2(event.target.value as Talent.AGILITY | Talent.FUNCTION)}>
                    <option value={"Agility"}>Agility</option>
                    <option value={"Function"}>Function</option>
                </BeerCSSSelect>}
                {selectedSkills.includes(TalentSkills.talent3) && <BeerCSSSelect fill label={"Talent 3"} value={props.talent3} onChange={event => props.setTalent3(event.target.value as Talent.TECHNIQUE | Talent.WILLPOWER)}>
                    <option value={"Willpower"}>Willpower</option>
                    <option value={"Technique"}>Technique</option>
                </BeerCSSSelect>}
                {selectedSkills.includes(TalentSkills.talent4) &&
                    <BeerCSSSelect label={"Talent 4"} fill value={props.talent4} onChange={event => props.setTalent4(event.target.value as Talent)}>
                        <option value={"aura"}>Aura</option>
                        <option value={"stamina"}>Stamina</option>
                        <option value={"agility"}>Agility</option>
                        <option value={"function"}>Function</option>
                        <option value={"willpower"}>Willpower</option>
                        <option value={"technique"}>Technique</option>
                    </BeerCSSSelect>}
                {level >= 5 && <BeerCSSSelect label={"Level 5"} fill value={props.level5Talent} onChange={event => props.setLevel5Talent(event.target.value as Talent)}>
                    <option value={"aura"}>Aura</option>
                    <option value={"stamina"}>Stamina</option>
                    <option value={"agility"}>Agility</option>
                    <option value={"function"}>Function</option>
                    <option value={"willpower"}>Willpower</option>
                    <option value={"technique"}>Technique</option>
                </BeerCSSSelect>}
                {selectedSkills.includes(VitalitySkills.vitalityEnhance) && <BeerCSSSelect fill label={"Vitality Enhance"} value={props.vitalityEnhance} onChange={event => props.setVitalityEnhance(event.target.value as "MOV" | "DEF")}>
                    <option value={"MOV"}>+MOV</option>
                    <option value={"DEF"}>+DEF</option>
                </BeerCSSSelect>}
                {traits.includes("Talented") && <BeerCSSSelect fill label={"Talented"} value={props.talented} onChange={event => props.setTalented(event.target.value as Talent)}>
                    {aura < 3 && <option value={"aura"}>Aura</option>}
                    {stamina < 3 && <option value={"stamina"}>Stamina</option>}
                    {agility < 3 && <option value={"agility"}>Agility</option>}
                    {functionStat < 3 && <option value={"function"}>Function</option>}
                    {willpower < 3 && <option value={"willpower"}>Willpower</option>}
                    {technique < 3 && <option value={"technique"}>Technique</option>}
                </BeerCSSSelect>}
            </fieldset>

        </nav>
    </>
}