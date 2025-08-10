import {Typography} from "@mui/material";
import {KarmaSkills, karmaSkillTree, personalitySkillTree, SkillName, SkillTreeNode, TalentSkills, talentsSkillTree, useSkillTree, VitalitySkills, vitalitySkillTree} from "./UseSkillTree.ts";
import {isSkillUnlocked} from "./utils.ts";
import {useCharacterSheetFields} from "./UseCharacterSheetFields.ts";
import {TalentModifiers} from "./KarmaSpecialty.ts";
import {BeerCSSCheckbox} from "./beer_wrappers/BeerCSSCheckbox.tsx";
import {BeerCSSSelect} from "./beer_wrappers/BeerCSSSelect.tsx";

// TODO Remove when readonly is done
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SkillTree(_props: Readonly<{ readOnly?: boolean }> = {readOnly: false}) {
    const {skills, toggleSkill} = useSkillTree();
    const {
        level5Talent,
        setLevel5Talent,
        setTalent1Options,
        setTalent2Options,
        setTalent3Options,
        setTalent4Options,
        setTalentedTalent,
        setVitalityOptions,
        talent1Options,
        talent2Options,
        talent3Options,
        talent4Options,
        talentedTalent,
        vitalityOptions
    } = useSkillTree();
    const {level, traits, aura, stamina, agility, technique, willpower, function: functionStat} = useCharacterSheetFields()

    function getSkillCheckbox(skillName: SkillName, skillData: SkillTreeNode) {
        return <BeerCSSCheckbox label={skillName} checked={skills.includes(skillName)} onChange={() => toggleSkill(skillName)} disabled={!isSkillUnlocked(skillData, skills, level) && !skills.includes(skillName)} key={skillName}/>
    }

    const karmaSkillCount = skills.filter(value => (Object.values(KarmaSkills) as string[]).includes(value)).length;
    const nonKarmaSkillCount = skills.filter(value => !(Object.values(KarmaSkills) as string[]).includes(value)).length;
    const karmaSkillPoints = Math.max(level - 1 - karmaSkillCount, 0);
    const otherSkillPoints = (level - 1) * 2 + (level > 3 ? 1 : 0) - Math.max(karmaSkillCount - (level - 1), 0) - nonKarmaSkillCount;

    return <>
        {/*TODO Disable skill selection if you run out of skill points*/}
        <Typography>You have {karmaSkillPoints} Karma skill points and {otherSkillPoints} skill points left!</Typography>
        <div className={'grid'}>
            {/*TODO Add error if you remove prerequisite*/}
            <fieldset className={"l3"}>
                <legend>Vitality</legend>
                <nav className={"vertical"}>
                    {Object.entries(vitalitySkillTree).map(([key, value]) => getSkillCheckbox(key as SkillName, value))}
                </nav>
            </fieldset>
            <fieldset className={"l3"}>
                <legend>Personality</legend>
                <nav className={"vertical"}>
                    {Object.entries(personalitySkillTree).map(([key, value]) => getSkillCheckbox(key as SkillName, value))}
                </nav>
            </fieldset>
            <fieldset className={"l3"}>
                <legend>Karma</legend>
                <nav className={"vertical"}>
                    {Object.entries(karmaSkillTree).map(([key, value]) => getSkillCheckbox(key as SkillName, value))}
                </nav>
            </fieldset>
            <fieldset className={"l3"}>
                <legend>Talent</legend>
                <nav className={"vertical"}>
                    {Object.entries(talentsSkillTree).map(([key, value]) => getSkillCheckbox(key as SkillName, value))}
                </nav>
            </fieldset>
        </div>
        <nav className={"vertical"}>
            <fieldset style={{width: '100%'}}>
                <legend>Stat Boosts</legend>
                {skills.includes(TalentSkills.talent1) && <BeerCSSSelect fill label={"Talent 1"} value={talent1Options} onChange={event => setTalent1Options(event.target.value as keyof TalentModifiers)}>
                    <option value={"aura"}>Aura</option>
                    <option value={"stamina"}>Stamina</option>
                </BeerCSSSelect>}
                {skills.includes(TalentSkills.talent2) && <BeerCSSSelect fill label={"Talent 3"} value={talent2Options} onChange={event => setTalent2Options(event.target.value as keyof TalentModifiers)}>
                    <option value={"agility"}>Agility</option>
                    <option value={"function"}>Function</option>
                </BeerCSSSelect>}
                {skills.includes(TalentSkills.talent3) && <BeerCSSSelect fill label={"Talent 3"} value={talent3Options} onChange={event => setTalent3Options(event.target.value as keyof TalentModifiers)}>
                    <option value={"willpower"}>Willpower</option>
                    <option value={"technique"}>Technique</option>
                </BeerCSSSelect>}
                {skills.includes(TalentSkills.talent4) &&
                    <BeerCSSSelect label={"Talent 4"} fill value={talent4Options} onChange={event => setTalent4Options(event.target.value as keyof TalentModifiers)}>
                        <option value={"aura"}>Aura</option>
                        <option value={"stamina"}>Stamina</option>
                        <option value={"agility"}>Agility</option>
                        <option value={"function"}>Function</option>
                        <option value={"willpower"}>Willpower</option>
                        <option value={"technique"}>Technique</option>
                    </BeerCSSSelect>}
                {level >= 5 && <BeerCSSSelect label={"Level 5"} fill value={level5Talent} onChange={event => setLevel5Talent(event.target.value as keyof TalentModifiers)}>
                    <option value={"aura"}>Aura</option>
                    <option value={"stamina"}>Stamina</option>
                    <option value={"agility"}>Agility</option>
                    <option value={"function"}>Function</option>
                    <option value={"willpower"}>Willpower</option>
                    <option value={"technique"}>Technique</option>
                </BeerCSSSelect>}
                {skills.includes(VitalitySkills.vitalityEnhance) && <BeerCSSSelect fill label={"Vitality Enhance"} value={vitalityOptions} onChange={event => setVitalityOptions(event.target.value as "MOV" | "DEF")}>
                    <option value={"MOV"}>+MOV</option>
                    <option value={"DEF"}>+DEF</option>
                </BeerCSSSelect>}
                {traits.includes("Talented") && <BeerCSSSelect fill label={"Talented"} value={talentedTalent} onChange={event => setTalentedTalent(event.target.value as keyof TalentModifiers)}>
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