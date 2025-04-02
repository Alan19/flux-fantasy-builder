import Grid from "@mui/material/Grid2";
import {Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Stack, Typography} from "@mui/material";
import {KarmaSkills, karmaSkillTree, personalitySkillTree, SkillName, SkillTreeNode, TalentSkills, talentsSkillTree, useSkillTree, VitalitySkills, vitalitySkillTree} from "./UseSkillTree.ts";
import {isSkillUnlocked} from "./utils.ts";
import {useCharacterSheetFields} from "./UseCharacterSheetFields.ts";
import {TalentModifiers} from "./KarmaSpecialty.ts";

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
                <Select value={talent1Options} onChange={event => setTalent1Options(event.target.value as keyof TalentModifiers)} variant={"filled"}>
                    <MenuItem value={"aura"}>Aura</MenuItem>
                    <MenuItem value={"stamina"}>Stamina</MenuItem>
                </Select>
            </FormControl>}
            {skills.includes(TalentSkills.talent2) && <FormControl variant={"filled"}>
                <InputLabel>Talent 2</InputLabel>
                <Select value={talent2Options} onChange={event => setTalent2Options(event.target.value as keyof TalentModifiers)} variant={"filled"}>
                    <MenuItem value={"agility"}>Agility</MenuItem>
                    <MenuItem value={"function"}>Function</MenuItem>
                </Select>
            </FormControl>}
            {skills.includes(TalentSkills.talent3) && <FormControl variant={"filled"}>
                <InputLabel>Talent 3</InputLabel>
                <Select value={talent3Options} onChange={event => setTalent3Options(event.target.value as keyof TalentModifiers)} variant={"filled"}>
                    <MenuItem value={"willpower"}>Willpower</MenuItem>
                    <MenuItem value={"technique"}>Technique</MenuItem>
                </Select>
            </FormControl>}
            {skills.includes(TalentSkills.talent4) && <FormControl variant={"filled"}>
                <InputLabel>Talent 4</InputLabel>
                <Select value={talent4Options} onChange={event => setTalent4Options(event.target.value as keyof TalentModifiers)} variant={"filled"}>
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
                <Select label={"Level 5"} value={level5Talent} onChange={event => setLevel5Talent(event.target.value as keyof TalentModifiers)}>
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
                <Select label={"Vitality Enhance"} value={vitalityOptions} onChange={event => setVitalityOptions(event.target.value as "MOV" | "DEF")}>
                    <MenuItem value={"MOV"}>+MOV</MenuItem>
                    <MenuItem value={"DEF"}>+DEF</MenuItem>
                </Select>
            </FormControl>}
            {traits.includes("Talented") && <FormControl variant={"filled"}>
                <InputLabel>Talented</InputLabel>
                <Select label={"Talented"} value={talentedTalent} onChange={event => setTalentedTalent(event.target.value as keyof TalentModifiers)}>
                    {aura < 3 && <MenuItem value={"aura"}>Aura</MenuItem>}
                    {stamina < 3 && <MenuItem value={"stamina"}>Stamina</MenuItem>}
                    {agility < 3 && <MenuItem value={"agility"}>Agility</MenuItem>}
                    {functionStat < 3 && <MenuItem value={"function"}>Function</MenuItem>}
                    {willpower < 3 && <MenuItem value={"willpower"}>Willpower</MenuItem>}
                    {technique < 3 && <MenuItem value={"technique"}>Technique</MenuItem>}
                </Select>
            </FormControl>}
        </Stack>
    </>
}