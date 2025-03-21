import {useCharacterSheetFields} from "./UseCharacterSheetFields.ts";
import {usePowerLoadoutSettings} from "./UsePowerLoadoutSettings.ts";
import {useSkillTree} from "./UseSkillTree.ts";
import {Button} from "@mui/material-next";
import {SaveAlt, Upload} from "@mui/icons-material";
import sanitize from "sanitize-filename";

export function ImportExportCharacter() {
    const characterSheetFields = useCharacterSheetFields();
    const powerLoadout = usePowerLoadoutSettings();
    const skillTree = useSkillTree();

    function serializeCharacter() {
        const characterSheetJSON = Object.entries(characterSheetFields)
            .filter(value => typeof value[1] !== "function")
            .reduce((previousValue, currentValue) => ({...previousValue, [currentValue[0]]: currentValue[1]}), {});
        const powerLoadoutJSON = powerLoadout.serializePowerLoadoutState();
        const skillTreeJSON = Object.entries(skillTree)
            .filter(value => typeof value[1] !== "function")
            .reduce((previousValue, currentValue) => ({...previousValue, [currentValue[0]]: currentValue[1]}), {});
        return Object.assign({}, characterSheetJSON, powerLoadoutJSON, skillTreeJSON);
    }

    function exportCharacter() {
        console.log(serializeCharacter())
        const dataStr =
            'data:application/json;charset=utf-8,' +
            encodeURIComponent(JSON.stringify(serializeCharacter(), null, 2));
        const download = document.createElement('a');
        download.setAttribute('href', dataStr);
        download.setAttribute('download', sanitize(characterSheetFields.characterName) + '.json');
        document.body.appendChild(download);
        download.click();
        download.remove();
    }

    return <>
        <Button startIcon={<Upload/>} variant={"outlined"} disabled color={"secondary"}>Import<br/>(coming soon!)</Button>
        <Button onClick={() => exportCharacter()} startIcon={<SaveAlt/>} variant={"outlined"} color={"secondary"}>Export</Button>
    </>;
}