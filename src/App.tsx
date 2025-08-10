import './App.css'
import {CharacterInfoInput} from "./CharacterInfoInput.tsx";
import {Route, Router} from "wouter";
import {useHashLocation} from "wouter/use-hash-location";
import {RenderedCharacterSheet} from "./RenderedCharacterSheet.tsx";
import {createTheme, CssBaseline, ThemeProvider, Typography} from "@mui/material";
import {CssVarsProvider} from "@mui/material-next";
import {flux} from "./themes.ts";

const theme = createTheme({
    typography: {
        fontFamily: [
            'Oxanium Variable',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    palette: {
        primary: {
            main: '#d1bcfd',
        },
    },
})

function NavigationRail() {
    return <nav className={"left"}>
        <header>
            <button className="extra circle transparent">
                <i>menu_open</i>
            </button>
            <button className="extend square round">
                <i>widgets</i>
                <span>Explore</span>
            </button>
        </header>
        <a>
            <i>arrow_back</i>
            <span>Left</span>
        </a>
        <a>
            <i>arrow_forward</i>
            <span>Right</span>
        </a>
        <a>
            <i>checklist_rtl</i>
            <span>RTL</span>
        </a>
        <a>
            <i>checklist</i>
            <span>LTR</span>
        </a>
        <a>
            <i>code</i>
            <span>Code</span>
        </a>
    </nav>;
}

function App() {
    ui("theme", "#2a0066");

    return (
        <CssVarsProvider theme={flux}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>

                <Router hook={useHashLocation}>
                    <NavigationRail/>
                    <main className={"responsive"}>
                        <Route path="/"><CharacterInfoInput/></Route>
                        <Route path={"/sheet"}><RenderedCharacterSheet/></Route>
                    </main>
                </Router>
                <footer style={{textAlign: "right", marginTop: 16}}><Typography variant={"subtitle1"}>Copyright © Herohelix, LLC</Typography></footer>
            </ThemeProvider>
        </CssVarsProvider>
    )
}

export default App
