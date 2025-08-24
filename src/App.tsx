import './App.css'
import {CharacterInfoInput} from "./CharacterInfoInput.tsx";
import {Route, Router} from "wouter";
import {useHashLocation} from "wouter/use-hash-location";
import {RenderedCharacterSheet} from "./RenderedCharacterSheet.tsx";
import {NavigationRail} from "./NavigationRail.tsx";
import {useLocalStorage} from "usehooks-ts";
import {Mode} from "./ModeToggle.tsx";
import {ImportExportCharacter} from "./ImportExportCharacter.tsx";

function App() {
    ui("theme", "#393bff");
    const [colorScheme] = useLocalStorage<Mode>("preferred-color-scheme", "auto");

    ui("mode", colorScheme)

    return <>
        <Router hook={useHashLocation}>
            <NavigationRail/>
            <main className={"top-margin center"} style={{maxInlineSize: "95rem"}}>
                <Route path="/"><CharacterInfoInput/></Route>
                <Route path={"/sheet"}><RenderedCharacterSheet/></Route>
                <footer>Copyright © Herohelix, LLC</footer>
            </main>
        </Router>
        <ImportExportCharacter/>
    </>
}

export default App
