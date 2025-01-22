import './App.css'
import {CharacterSheet} from "./CharacterSheet.tsx";
import {Route, Router} from "wouter";
import {useHashLocation} from "wouter/use-hash-location";
import {InPlaySheet} from "./InPlaySheet.tsx";

function App() {
    return (
        <Router hook={useHashLocation}>
            <Route path="/"><CharacterSheet /></Route>
            <Route path={"/sheet"}><InPlaySheet /></Route>
        </Router>
    )
}

export default App
