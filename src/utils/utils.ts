import {SkillTreeNode} from "../components/skills/SkillTreeInfo.ts";
import {ChangeEvent} from "react";

export function isSkillUnlocked(value: SkillTreeNode, enabledSkills: string[], level: number): boolean {
    return (value.prerequisites?.every(skill => enabledSkills.includes(skill)) ?? true) &&
        (value.links?.some(skill => enabledSkills.includes(skill)) ?? true) &&
        (!value.level || level >= value.level);
}
export function setFileBase64(event: ChangeEvent<HTMLInputElement>, updaterFunction: (data: string) => void) {
    const file = event.target.files?.[0]
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        const base64String = reader.result as string;
        updaterFunction(base64String);
    };
    reader.readAsDataURL(file); // convert file to Base64
}