import './App.css'
import {CharacterSheet} from "./CharacterSheet.tsx";
import {Route, Router} from "wouter";
import {useHashLocation} from "wouter/use-hash-location";
import {InPlaySheet} from "./InPlaySheet.tsx";
import {Container, Typography} from "@mui/material";

function App() {
    return (
        <>
            <Router hook={useHashLocation}>
                <Route path="/"><CharacterSheet/></Route>
                <Route path={"/sheet"}><InPlaySheet/></Route>
            </Router>
            <Container>
                <footer style={{textAlign: "right", marginTop: 16}}><Typography variant={"subtitle1"}>Copyright © Herohelix, LLC</Typography></footer>
            </Container>
        </>
    )
}

export default App
