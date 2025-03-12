import {SkillTreeNode} from "./UseSkillTree.ts";

export function isSkillUnlocked(value: SkillTreeNode, enabledSkills: string[], level: number): boolean {
    return (value.prerequisites?.every(skill => enabledSkills.includes(skill)) ?? true) &&
        (value.links?.some(skill => enabledSkills.includes(skill)) ?? true) &&
        (!value.level || level >= value.level);
}