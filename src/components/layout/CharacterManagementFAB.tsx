import {usePrintRoute} from "../../utils/hooks/usePrintRoute.ts";
import {CharacterManager} from "../../utils/hooks/useOCLocalStorage.ts";
import {CharacterSelector} from "../character-select/CharacterSelector.tsx";

interface CharacterManagementFABProps {
    characters: CharacterManager
}

export function CharacterManagementFAB({characters}: Readonly<CharacterManagementFABProps>) {
    const print = usePrintRoute();
    const {importCharacter, createCharacter, deleteCharacter, characterList, exportCharacter, setCurrentCharacter, currentCharacter} = characters
    return <div className={"fixed bottom right large-margin hide-when-printing"}>
        <button className="extra circle tertiary-container">
            <i>home_storage</i>
        </button>
        <menu className="top transparent no-wrap left right-align no-margin">
            <li>
                <button className={"tertiary"}><i>upload</i> Import<input type="file" name={"image"} onChange={importCharacter}/></button>
            </li>
            <li>
                <button onClick={() => exportCharacter()} className={"tertiary"}><i>save_alt</i> Export</button>
            </li>
            <li>
                <CharacterSelector currentCharacter={currentCharacter} setCurrentCharacter={setCurrentCharacter} createCharacter={createCharacter} deleteCharacter={deleteCharacter} characterList={characterList}/>
            </li>
            <li>
                <button onClick={() => print("/sheet")} className={"tertiary"}><i>print</i> Print</button>
            </li>
        </menu>
    </div>;
}