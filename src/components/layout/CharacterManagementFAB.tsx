import {useCharacterSheetFields} from "../../hooks/useCharacterSheetFields.ts";
import {usePowerLoadoutSettings} from "../../hooks/usePowerLoadoutSettings.ts";
import {useSkillTree} from "../../hooks/useSkillTree.ts";
import sanitize from "sanitize-filename";
import {usePrintRoute} from "../../hooks/usePrintRoute.ts";

export function CharacterManagementFAB() {
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
        const dataStr = `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(serializeCharacter(), null, 2))}`;
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
                        characterSheetFields.setCharacterImageData(data.characterBackground.characterImageURL)
                        characterSheetFields.setGearOfDestiny(data.characterBackground.gearOfDestinyURL)
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

    function resetCharacter() {
        if (window.confirm('Are you sure you want to reset your character? Please backup your character using the "Export" button if you want to restore them!')) {
            characterSheetFields.setPlayerName("")
            characterSheetFields.setCharacterName("")
            characterSheetFields.setCharacterImageData("")
            characterSheetFields.setGearOfDestiny("")
            characterSheetFields.setAge("")
            characterSheetFields.setGender("")
            characterSheetFields.setHeight("")
            characterSheetFields.setWeight("")
            characterSheetFields.setKarmaSpecialty(undefined)
            characterSheetFields.setStudy(undefined)
            characterSheetFields.setAffiliation(undefined)
            characterSheetFields.setBackground("")
            characterSheetFields.setTraits([])
            characterSheetFields.setFlaws([])
            characterSheetFields.setAura(1)
            characterSheetFields.setTechnique(1)
            characterSheetFields.setStamina(1)
            characterSheetFields.setFunction(1)
            characterSheetFields.setWillpower(1)
            characterSheetFields.setAgility(1)
            characterSheetFields.setLevel(1)
            characterSheetFields.setMedKits(2)
            characterSheetFields.setMerits(20)
            characterSheetFields.setConfiguration("")
            characterSheetFields.setPositiveKarma(0)
            characterSheetFields.setNegativeKarma(0)
            characterSheetFields.setKarmaPool(0)
            characterSheetFields.setPaybackPoints(0)
            characterSheetFields.setCurrentHP(0)
            characterSheetFields.setItems("")
            characterSheetFields.setOtherSkills("")
            powerLoadout.deserializePowerLoadoutState(JSON.stringify({}))
            skillTree.setSkills([])
            skillTree.setVitalityOptions(undefined)
            skillTree.setTalent1Options(undefined)
            skillTree.setTalent2Options(undefined)
            skillTree.setTalent3Options(undefined)
            skillTree.setTalent4Options(undefined)
            skillTree.setLevel5Talent(undefined)
            skillTree.setTalentedTalent(undefined)
        }
    }

    const print = usePrintRoute();

    return <div className={"fixed bottom right large-margin hide-when-printing"}>
        <button className="extra circle tertiary-container">
            <i>home_storage</i>
        </button>
        <menu className="top transparent no-wrap left right-align no-margin">
            <li>
                <button className={"tertiary"}><i>upload</i> Import<input type="file" name={"image"} onChange={importCharacter}/></button>
            </li>
            <li>
                <button onClick={exportCharacter} className={"tertiary"}><i>save_alt</i> Export</button>
            </li>
            <li>
                <button onClick={resetCharacter} className={"tertiary"}><i>restart_alt</i> Reset</button>
            </li>
            <li>
                <button onClick={() => print("/sheet")} className={"tertiary"}><i>print</i> Print</button>
            </li>
        </menu>
    </div>;
}