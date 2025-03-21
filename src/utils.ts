import {SkillTreeNode} from "./UseSkillTree.ts";
import {Dispatch, SetStateAction} from "react";

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