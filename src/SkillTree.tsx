import Grid from "@mui/material/Grid2";
import {Checkbox, FormControlLabel, FormGroup, Paper, Typography} from "@mui/material";
import {KarmaSkills, karmaSkillTree, personalitySkillTree, SkillName, SkillTreeNode, talentsSkillTree, useSkillTree, vitalitySkillTree} from "./UseSkillTree.ts";
import {isSkillUnlocked} from "./IsSkillUnlocked.tsx";
import {useCharacterSheetFields} from "./UseCharacterSheetFields.ts";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SkillTree(_props: Readonly<{ readOnly?: boolean }> = {readOnly: false}) {
    const {skills, toggleSkill} = useSkillTree();
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
    return <Paper style={{padding: 16, backgroundColor: "var(--md-sys-color-surfaceContainerHigh)"}}>
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
    </Paper>
}