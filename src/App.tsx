import './assets/App.css'
import {CharacterInfoInput} from "./components/character/CharacterInfoInput.tsx";
import {Route, Router} from "wouter";
import {useHashLocation} from "wouter/use-hash-location";
import {RenderedCharacterSheet} from "./components/character/RenderedCharacterSheet.tsx";
import {NavigationRail} from "./components/layout/NavigationRail.tsx";
import {CharacterManagementFAB} from "./components/layout/CharacterManagementFAB.tsx";

function App() {
    ui("theme", "#393bff");

    return <>
        <Router hook={useHashLocation}>
            <NavigationRail/>
            <main className={"large-padding center"} style={{maxInlineSize: "95rem"}}>
                <Route path="/"><CharacterInfoInput/></Route>
                <Route path={"/sheet"}><RenderedCharacterSheet/></Route>
                <footer>Copyright © Herohelix, LLC</footer>
            </main>
        </Router>
        <CharacterManagementFAB/>
    </>
}

export default App
