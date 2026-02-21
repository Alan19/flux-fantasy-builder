import './assets/App.css'
import {CharacterInfoInput} from "./pages/CharacterInfoInput.tsx";
import {Route, Router} from "wouter";
import {useHashLocation} from "wouter/use-hash-location";
import {NavigationRail} from "./components/layout/NavigationRail.tsx";
import {CharacterManagementFAB} from "./components/layout/CharacterManagementFAB.tsx";
import {KarmaPowerDetails} from "./pages/KarmaPowerDetails.tsx";

import {useLocalStorage} from "usehooks-ts";
import {useEffect} from "react";
import {OCSaveData} from "./utils/types/OCSaveData.ts";
import {newCharacter} from "./utils/newCharacter.ts";
import {assembleCharacterData, CharacterManager, extracted, OCSaveDataWithState} from "./utils/AssembleLocalStorage.ts";

function useOCLocalStorage(): OCSaveDataWithState & { characters: CharacterManager } {
    const newUUID = crypto.randomUUID();
    const [currentCharacter, setCurrentCharacter] = useLocalStorage<string>("current-character", newUUID)
    const [ocData, setOCData] = useLocalStorage<OCSaveData>(currentCharacter, newCharacter())
    const [characterList, setCharacterList] = useLocalStorage<string[]>("characters", [newUUID])

    console.log("Local Storage Invoked", currentCharacter, ocData, characterList)

    function deleteCurrentCharacter() {
        localStorage.removeItem(currentCharacter);
    }
    // Initialize fields
    // If your current character hasn't been written to storage yet, write it to storage as currentCharacter and characterList has already been updated
    // Setting the OC data is only done if the other keys have already been set
    useEffect(() => {
        console.log(`Processing ${currentCharacter}`)
        if (!localStorage.getItem("current-character")) {
            console.log(`Initializing data for ${currentCharacter}`)
            console.log(currentCharacter, characterList)
            setCurrentCharacter(currentCharacter);
            setOCData(ocData);
            setCharacterList(characterList);
        } else if (!localStorage.getItem(currentCharacter)) {
            console.log(`Initializing data for new character: ${currentCharacter}`)
            console.log(`${localStorage.getItem("current-character")}`, currentCharacter)
            setOCData(newCharacter());
        }
    }, [characterList, currentCharacter, ocData, setCharacterList, setCurrentCharacter, setOCData]);

    return {...extracted(ocData, setOCData), characters: assembleCharacterData(characterList, setCharacterList, setCurrentCharacter, deleteCurrentCharacter, currentCharacter, ocData)};
}


function App() {
    ui("theme", "#393bff");
    const ocData = useOCLocalStorage();
    const characters = ocData.characters;

    return <>
        <Router hook={useHashLocation}>
            <NavigationRail/>
            <main className={"large-padding center"} style={{maxInlineSize: "95rem"}}>
                <Route path="/"><CharacterInfoInput ocData={ocData}/></Route>
                {/*<Route path={"/sheet"}><RenderedCharacterSheet/></Route>*/}
                <Route path={"/powers"}><KarmaPowerDetails ocData={ocData}/></Route>
                <footer>Copyright © Herohelix, LLC</footer>
            </main>
        </Router>
        <CharacterManagementFAB characters={characters}/>
    </>
}

export default App
