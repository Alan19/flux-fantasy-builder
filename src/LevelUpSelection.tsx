import Grid from "@mui/material/Grid2";
import {Card, CardContent, Checkbox, FormControlLabel, FormGroup, Typography} from "@mui/material";
import {TypographyWithAdornment} from "./TypographyWithAdornment.tsx";
import {fullSkillTree, SkillName, useSkillTree} from "./UseSkillTree.ts";
import {isSkillUnlocked} from "./IsSkillUnlocked.tsx";
import {useState} from "react";

enum EditStatus {
    none,
    remove,
    full
}

export function LevelUpCard(props: Readonly<{ level: number, editStatus: EditStatus }>) {
    const {skills, toggleSkill, getEnabledSkills} = useSkillTree();
    const [selectedSkills, setSelectedSkills] = useState<Set<SkillName>>(new Set());

    const skillPointsForLevel = props.level === 4 ? 3 : 2;

    function onClick(skillName: SkillName) {
        toggleSkill(skillName);
        setSelectedSkills(prevState => {
            const clonedSet = new Set(prevState);
            if (prevState.has(skillName)) {
                clonedSet.delete(skillName);
            } else {
                clonedSet.add(skillName);
            }
            return clonedSet;
        })
    }

    function getDisabledState(isSkillSelected: boolean, editStatus: EditStatus, skillName: SkillName) {
        const isPrerequisitePickedInThisLevel = Array.from(selectedSkills).some(skill => fullSkillTree[skill].prerequisites?.includes(skillName) || fullSkillTree[skill].links?.includes(skillName));
        switch (editStatus) {
            case EditStatus.full:
                // If any of the skills selected in this level uses this skill as a prerequisite, check if the list of prerequisites only has 1 requirement, and if it does, disable it
                return isPrerequisitePickedInThisLevel;

            case EditStatus.remove:
                return !isSkillSelected || isPrerequisitePickedInThisLevel;
            default:
                return true;
        }
    }

    function isSkillDisplayed(isSkillUnlocked: boolean, isSkillSelected: boolean, isSkillSelectedAtThisLevel: boolean) {
        if (props.editStatus !== EditStatus.full) {
            return isSkillSelectedAtThisLevel;
        } else {
            return (isSkillUnlocked || isSkillSelectedAtThisLevel) && (isSkillSelectedAtThisLevel || !isSkillSelected);
        }
    }

    return <Card>
        <CardContent>
            <TypographyWithAdornment text={"Level " + props.level}/>
            <Typography variant={"subtitle1"}>{skillPointsForLevel} skill points</Typography>
            <FormGroup>
                {Object.entries(fullSkillTree)
                    .filter(([key, value]) => isSkillDisplayed(isSkillUnlocked(value, getEnabledSkills(), props.level), getEnabledSkills().includes(key), selectedSkills.has(key as SkillName)))
                    .map(([key]) => {
                        const skillName = key as SkillName;
                        return <FormControlLabel control={<Checkbox/>}
                                                 checked={skills[skillName]}
                                                 onChange={() => onClick(skillName)}
                                                 disabled={getDisabledState(getEnabledSkills().includes(key), props.editStatus, skillName)}
                                                 label={key}
                                                 key={key}/>;
                    })}
            </FormGroup>
        </CardContent>
    </Card>
}

export function LevelUpSelection() {
    const {skills, toggleSkill, getEnabledSkills} = useSkillTree();

    // TODO Hide skills chosen on previous levels
    // Skill selection is disabled based on the number of skills picked

    function getEditStatus(level: number): EditStatus {
        const skillCount = getEnabledSkills().length;
        let maxSkillPointsForLevel = (level - 1) * 2;
        if (level >= 4) {
            maxSkillPointsForLevel += 1;
        }
        let minSkillPointsForLevel = (level - 2) * 2;
        if (level > 4) {
            minSkillPointsForLevel += 1;
        }
        if (skillCount < maxSkillPointsForLevel && skillCount >= minSkillPointsForLevel) {
            return EditStatus.full
        } else if (skillCount === maxSkillPointsForLevel) {
            return EditStatus.remove;
        } else {
            return EditStatus.none;
        }
    }

    return [2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => {
        return <Grid size={{md: 4}} key={"Level " + value}>
            <LevelUpCard level={value} editStatus={getEditStatus(value)}/>
        </Grid>
    })
}