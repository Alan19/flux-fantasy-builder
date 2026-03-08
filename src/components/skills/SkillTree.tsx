import {isSkillUnlocked} from "../../utils/utils.ts";
import {Talent, TalentModifiers} from "../../utils/types/KarmaSpecialty.ts";
import {BeerCSSCheckbox} from "../ui/beer-css-wrappers/BeerCSSCheckbox.tsx";
import {BeerCSSSelect} from "../ui/beer-css-wrappers/BeerCSSSelect.tsx";
import {KarmaSkills, karmaSkillTree, personalitySkillTree, SkillName, SkillTreeNode, TalentSkills, talentsSkillTree, VitalitySkills, vitalitySkillTree} from "./SkillTreeInfo.ts";
import _ from "lodash";
import {SkillSettingsGettersAndSetters} from "../../utils/AssembleLocalStorage.ts";

export function SkillTree(props: Readonly<{
    skills: SkillSettingsGettersAndSetters,
    level: number,
    talentModifiers: TalentModifiers,
    isTalented: boolean,
    showStatBoost?: boolean
}>) {
    const {
        skills: {
            unlockedSkills: [unlockedSkills, setUnlockedSkills],
            level5TalentBoost: [level5TalentBoost, setLevel5TalentBoost],
            talent1: [talent1, setTalent1],
            talent2: [talent2, setTalent2],
            talent3: [talent3, setTalent3],
            talent4: [talent4, setTalent4],
            talentedBoost: [talentedBoost, setTalentedBoost],
            vitalityEnhance: [vitalityEnhance, setVitalityEnhance],
        },
        isTalented,
        level,
        talentModifiers: {
            Agility,
            Stamina,
            Willpower,
            Technique,
            Aura,
            Function
        },
        showStatBoost = false
    } = props;

    function getSkillCheckbox(skillName: SkillName, skillData: SkillTreeNode) {
        return <BeerCSSCheckbox label={skillName} checked={unlockedSkills.includes(skillName)} onChange={() => setUnlockedSkills(_.xor(unlockedSkills, [skillName]))} disabled={!isSkillUnlocked(skillData, unlockedSkills, level) && !unlockedSkills.includes(skillName)} key={skillName}/>
    }

    const karmaSkillCount = unlockedSkills.filter(value => (Object.values(KarmaSkills) as string[]).includes(value)).length;
    const nonKarmaSkillCount = unlockedSkills.filter(value => !(Object.values(KarmaSkills) as string[]).includes(value)).length;
    const karmaSkillPoints = Math.max(level - 1 - karmaSkillCount, 0);
    const otherSkillPoints = (level - 1) * 2 + (level > 3 ? 1 : 0) - Math.max(karmaSkillCount - (level - 1), 0) - nonKarmaSkillCount;

    const isStatBoostAvailable = isTalented || unlockedSkills.includes(TalentSkills.talent1) || unlockedSkills.includes(TalentSkills.talent2) || unlockedSkills.includes(TalentSkills.talent3) || unlockedSkills.includes(TalentSkills.talent4) || level >= 5 || unlockedSkills.includes(VitalitySkills.vitalityEnhance);
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
        {isStatBoostAvailable && showStatBoost && <fieldset style={{width: '100%'}}>
            <legend>Stat Boosts</legend>
            <div className={"flex-column"} style={{gap: '1rem'}}>
                {isTalented && <BeerCSSSelect fill label={"Talented"} value={talentedBoost} onChange={event => setTalentedBoost(event.target.value as Talent)}>
                    {Aura < 3 && <option value={"Aura"}>Aura</option>}
                    {Stamina < 3 && <option value={"Stamina"}>Stamina</option>}
                    {Agility < 3 && <option value={"Agility"}>Agility</option>}
                    {Function < 3 && <option value={"Function"}>Function</option>}
                    {Willpower < 3 && <option value={"Willpower"}>Willpower</option>}
                    {Technique < 3 && <option value={"Technique"}>Technique</option>}
                </BeerCSSSelect>}
                {unlockedSkills.includes(TalentSkills.talent1) && <BeerCSSSelect fill label={"Talent 1"} value={talent1} onChange={event => setTalent1(event.target.value as Talent.AURA | Talent.STAMINA)}>
                    <option value={"Aura"}>Aura</option>
                    <option value={"Stamina"}>Stamina</option>
                </BeerCSSSelect>}
                {unlockedSkills.includes(TalentSkills.talent2) && <BeerCSSSelect fill label={"Talent 3"} value={talent2} onChange={event => setTalent2(event.target.value as Talent.AGILITY | Talent.FUNCTION)}>
                    <option value={"Agility"}>Agility</option>
                    <option value={"Function"}>Function</option>
                </BeerCSSSelect>}
                {unlockedSkills.includes(TalentSkills.talent3) && <BeerCSSSelect fill label={"Talent 3"} value={talent3} onChange={event => setTalent3(event.target.value as Talent.TECHNIQUE | Talent.WILLPOWER)}>
                    <option value={"Willpower"}>Willpower</option>
                    <option value={"Technique"}>Technique</option>
                </BeerCSSSelect>}
                {unlockedSkills.includes(TalentSkills.talent4) &&
                    <BeerCSSSelect label={"Talent 4"} fill value={talent4} onChange={event => setTalent4(event.target.value as Talent)}>
                        <option value={"Aura"}>Aura</option>
                        <option value={"Stamina"}>Stamina</option>
                        <option value={"Agility"}>Agility</option>
                        <option value={"Function"}>Function</option>
                        <option value={"Willpower"}>Willpower</option>
                        <option value={"Technique"}>Technique</option>
                    </BeerCSSSelect>}
                {level >= 5 && <BeerCSSSelect label={"Level 5"} fill value={level5TalentBoost} onChange={event => setLevel5TalentBoost(event.target.value as Talent)}>
                    <option value={"Aura"}>Aura</option>
                    <option value={"Stamina"}>Stamina</option>
                    <option value={"Agility"}>Agility</option>
                    <option value={"Function"}>Function</option>
                    <option value={"Willpower"}>Willpower</option>
                    <option value={"Technique"}>Technique</option>
                </BeerCSSSelect>}
                {unlockedSkills.includes(VitalitySkills.vitalityEnhance) && <BeerCSSSelect fill label={"Vitality Enhance"} value={vitalityEnhance} onChange={event => setVitalityEnhance(event.target.value as "MOV" | "DEF")}>
                    <option value={"MOV"}>+MOV</option>
                    <option value={"DEF"}>+DEF</option>
                </BeerCSSSelect>}
            </div>
        </fieldset>}
    </>
}