import './App.css'
import {db} from "./logic/data-store.ts";
import {useLiveQuery} from "dexie-react-hooks";
import {CharacterSheet} from "./components/sheet/CharacterSheet.tsx";


function App() {
    ui('theme', '#4b19c8')
    ui('mode', 'light')

    const activeCharacterID = () => db.characters.where('id').above(0).first();
    const character = useLiveQuery(() => db.characters.where('id').above(0).first())

    console.log(character)
    const powerKit = useLiveQuery(async () => {
        return activeCharacterID().then(value => {
            if (value?.id) {
                return db.powers.where('characterID').equals(value.id).toArray();
            } else {
                return undefined;
            }
        })
    })

    function changeName(event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) {
        if (character?.id) {
            db.characters.update(character.id, {characterName: event.target.value});
        }
    }

    return <div className={"top-margin"}>
        {/*<button onClick={event => createEntry()}>Add</button>*/}
        {character && powerKit && <CharacterSheet saveData={character} powerKit={powerKit}/>}

    </div>
}

export default App
