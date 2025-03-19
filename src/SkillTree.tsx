import Grid from "@mui/material/Grid2";
import {Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Stack, Typography} from "@mui/material";
import {KarmaSkills, karmaSkillTree, personalitySkillTree, SkillName, SkillTreeNode, TalentSkills, talentsSkillTree, useSkillTree, VitalitySkills, vitalitySkillTree} from "./UseSkillTree.ts";
import {isSkillUnlocked} from "./IsSkillUnlocked.tsx";
import {useCharacterSheetFields} from "./UseCharacterSheetFields.ts";
import {TalentModifiers} from "./KarmaSpecialty.ts";

// TODO Remove when readonly is done
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SkillTree(_props: Readonly<{ readOnly?: boolean }> = {readOnly: false}) {
    const {skills, toggleSkill} = useSkillTree();
    const talentInfo = useSkillTree();
    const {level} = useCharacterSheetFields()

    function getSkillCheckbox(skillName: SkillName, skillData: SkillTreeNode) {
        return <FormControlLabel control={<Checkbox/>}
                                 checked={skills.includes(skillName)}
                                 onChange={() => toggleSkill(skillName)}
                                 disabled={!isSkillUnlocked(skillData, skills, level) && !skills.includes(skillName)}
                                 label={skillName}
                                 key={skillName}/>;
    }

    const karmaSkillCount = skills.filter(value => (Object.values(KarmaSkills) as string[]).includes(value)).length;
    const nonKarmaSkillCount = skills.filter(value => !(Object.values(KarmaSkills) as string[]).includes(value)).length;
    const karmaSkillPoints = Math.max(level - 1 - karmaSkillCount, 0);
    const otherSkillPoints = (level - 1) * 2 + (level > 3 ? 1 : 0) - Math.max(karmaSkillCount - (level - 1), 0) - nonKarmaSkillCount;

    return <>
        {/*TODO Disable skill selection if you run out of skill points*/}
        <Typography>You have {karmaSkillPoints} Karma skill points and {otherSkillPoints} skill points left!</Typography>
        <Grid container spacing={2}>
            {/*TODO Add error if you remove prerequisite*/}
            <Grid size={{md: 3}}>
                <Typography variant={"h6"}>Vitality</Typography>
                <FormGroup>
                    {Object.entries(vitalitySkillTree).map(([key, value]) => getSkillCheckbox(key as SkillName, value))}
                </FormGroup>
            </Grid>
            <Grid size={{md: 3}}>
                <Typography variant={"h6"}>Personality</Typography>
                <FormGroup>
                    {Object.entries(personalitySkillTree).map(([key, value]) => getSkillCheckbox(key as SkillName, value))}
                </FormGroup>
            </Grid>
            <Grid size={{md: 3}}>
                <Typography variant={"h6"}>Karma</Typography>
                <FormGroup>
                    {Object.entries(karmaSkillTree).map(([key, value]) => getSkillCheckbox(key as SkillName, value))}
                </FormGroup>
            </Grid>
            <Grid size={{md: 3}}>
                <Typography variant={"h6"}>Talent</Typography>
                <FormGroup>
                    {Object.entries(talentsSkillTree).map(([key, value]) => getSkillCheckbox(key as SkillName, value))}
                </FormGroup>
            </Grid>
        </Grid>
        <Stack spacing={1}>
            {skills.includes(TalentSkills.talent1) && <FormControl variant={"filled"}>
                <InputLabel>Talent 1</InputLabel>
                <Select value={talentInfo.talent1Options} onChange={event => talentInfo.setTalent1Options(event.target.value as keyof TalentModifiers)} variant={"filled"}>
                    <MenuItem value={"aura"}>Aura</MenuItem>
                    <MenuItem value={"stamina"}>Stamina</MenuItem>
                </Select>
            </FormControl>}
            {skills.includes(TalentSkills.talent2) && <FormControl variant={"filled"}>
                <InputLabel>Talent 2</InputLabel>
                <Select value={talentInfo.talent2Options} onChange={event => talentInfo.setTalent2Options(event.target.value as keyof TalentModifiers)} variant={"filled"}>
                    <MenuItem value={"agility"}>Agility</MenuItem>
                    <MenuItem value={"function"}>Function</MenuItem>
                </Select>
            </FormControl>}
            {skills.includes(TalentSkills.talent3) && <FormControl variant={"filled"}>
                <InputLabel>Talent 3</InputLabel>
                <Select value={talentInfo.talent3Options} onChange={event => talentInfo.setTalent3Options(event.target.value as keyof TalentModifiers)} variant={"filled"}>
                    <MenuItem value={"willpower"}>Willpower</MenuItem>
                    <MenuItem value={"technique"}>Technique</MenuItem>
                </Select>
            </FormControl>}
            {skills.includes(TalentSkills.talent4) && <FormControl variant={"filled"}>
                <InputLabel>Talent 4</InputLabel>
                <Select value={talentInfo.talent4Options} onChange={event => talentInfo.setTalent4Options(event.target.value as keyof TalentModifiers)} variant={"filled"}>
                    <MenuItem value={"aura"}>Aura</MenuItem>
                    <MenuItem value={"stamina"}>Stamina</MenuItem>
                    <MenuItem value={"agility"}>Agility</MenuItem>
                    <MenuItem value={"function"}>Function</MenuItem>
                    <MenuItem value={"willpower"}>Willpower</MenuItem>
                    <MenuItem value={"technique"}>Technique</MenuItem>
                </Select>
            </FormControl>}
            {level >= 5 && <FormControl variant={"filled"}>
                <InputLabel>Level 5</InputLabel>
                <Select label={"Level 5"} value={talentInfo.level5Talent} onChange={event => talentInfo.setLevel5Talent(event.target.value as keyof TalentModifiers)}>
                    <MenuItem value={"aura"}>Aura</MenuItem>
                    <MenuItem value={"stamina"}>Stamina</MenuItem>
                    <MenuItem value={"agility"}>Agility</MenuItem>
                    <MenuItem value={"function"}>Function</MenuItem>
                    <MenuItem value={"willpower"}>Willpower</MenuItem>
                    <MenuItem value={"technique"}>Technique</MenuItem>
                </Select>
            </FormControl>}
            {skills.includes(VitalitySkills.vitalityEnhance) && <FormControl variant={"filled"}>
                <InputLabel>Vitality Enhance</InputLabel>
                <Select label={"Vitality Enhance"} value={talentInfo.vitalityOptions} onChange={event => talentInfo.setVitalityOptions(event.target.value as "MOV" | "DEF")}>
                    <MenuItem value={"MOV"}>+MOV</MenuItem>
                    <MenuItem value={"DEF"}>+DEF</MenuItem>
                </Select>
            </FormControl>}
        </Stack>
    </>
}