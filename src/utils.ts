import {SkillTreeNode} from "./UseSkillTree.ts";
import {ChangeEvent, Dispatch, SetStateAction} from "react";

export function isSkillUnlocked(value: SkillTreeNode, enabledSkills: string[], level: number): boolean {
    return (value.prerequisites?.every(skill => enabledSkills.includes(skill)) ?? true) &&
        (value.links?.some(skill => enabledSkills.includes(skill)) ?? true) &&
        (!value.level || level >= value.level);
}

export function toggleInArray<T>(value: T, setState: Dispatch<SetStateAction<T[]>>) {
    setState((prevArray) =>
        prevArray.includes(value)
            ? prevArray.filter((item) => item !== value) // Remove if exists
            : [...prevArray, value] // Add if not exists
    );
}

export function createToggleFunction<T>(setState: Dispatch<SetStateAction<T[]>>) {
    return (value: T) => toggleInArray(value, setState);
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