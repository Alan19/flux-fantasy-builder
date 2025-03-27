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
        return {characterBackground: characterSheetJSON, powerLoadout: powerLoadoutJSON, skills: skillTreeJSON}
    }

    function exportCharacter() {
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

    function importCharacter(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            const fileReader = new FileReader();
            fileReader.readAsText(event.target.files[0], "UTF-8");
            fileReader.onload = e => {
                if (e.target !== null && typeof e.target.result === "string") {
                    const data = JSON.parse(e.target.result);
                    if (data.characterBackground) {
                        // TODO add error messages during import
                        characterSheetFields.setPlayerName(data.characterBackground.playerName)
                        characterSheetFields.setCharacterName(data.characterBackground.characterName)
                        characterSheetFields.setCharacterImageURL(data.characterBackground.characterImageURL)
                        characterSheetFields.setGearOfDestinyURL(data.characterBackground.gearOfDestinyURL)
                        characterSheetFields.setAge(data.characterBackground.age)
                        characterSheetFields.setGender(data.characterBackground.gender)
                        characterSheetFields.setHeight(data.characterBackground.height)
                        characterSheetFields.setWeight(data.characterBackground.weight)
                        characterSheetFields.setKarmaSpecialty(data.characterBackground.karmaSpecialty)
                        characterSheetFields.setStudy(data.characterBackground.study)
                        characterSheetFields.setAffiliation(data.characterBackground.affiliation)
                        characterSheetFields.setBackground(data.characterBackground.background)
                        characterSheetFields.setTraits(data.characterBackground.traits)
                        characterSheetFields.setFlaws(data.characterBackground.flaws)
                        characterSheetFields.setAura(data.characterBackground.aura)
                        characterSheetFields.setTechnique(data.characterBackground.technique)
                        characterSheetFields.setStamina(data.characterBackground.stamina)
                        characterSheetFields.setFunction(data.characterBackground.function)
                        characterSheetFields.setWillpower(data.characterBackground.willpower)
                        characterSheetFields.setAgility(data.characterBackground.agility)
                        characterSheetFields.setLevel(data.characterBackground.level)
                        characterSheetFields.setMedKits(data.characterBackground.medKits)
                        characterSheetFields.setMerits(data.characterBackground.merits)
                        characterSheetFields.setConfiguration(data.characterBackground.configuration)
                        characterSheetFields.setPositiveKarma(data.characterBackground.positiveKarma)
                        characterSheetFields.setNegativeKarma(data.characterBackground.negativeKarma)
                        characterSheetFields.setKarmaPool(data.characterBackground.karmaPool)
                        characterSheetFields.setPaybackPoints(data.characterBackground.paybackPoints)
                        characterSheetFields.setCurrentHP(data.characterBackground.currentHP)
                        characterSheetFields.setItems(data.characterBackground.items)
                        characterSheetFields.setOtherSkills(data.characterBackground.otherSkills)
                    }
                    if (data.powerLoadout) {
                        powerLoadout.deserializePowerLoadoutState(JSON.stringify(data.powerLoadout))
                    }
                    if (data.skills) {
                        skillTree.setSkills(data.skills.skills)
                        skillTree.setVitalityOptions(data.skills.vitalityOptions)
                        skillTree.setTalent1Options(data.skills.talent1Options)
                        skillTree.setTalent2Options(data.skills.talent2Options)
                        skillTree.setTalent3Options(data.skills.talent3Options)
                        skillTree.setTalent4Options(data.skills.talent4Options)
                        skillTree.setLevel5Talent(data.skills.level5Talent)
                        skillTree.setTalentedTalent(data.skills.talentedTalent)
                    }
                }
            };
        }
    }

    return <>
        <Button startIcon={<Upload/>} variant={"outlined"} color={"secondary"} component={"label"}>
            Import
            <input
                type="file"
                name={"image"}
                onChange={importCharacter}
                hidden
            />
        </Button>
        <Button onClick={() => exportCharacter()} startIcon={<SaveAlt/>} variant={"outlined"} color={"secondary"}>Export</Button>
    </>;
}