import './App.css'
import {CharacterInfoInput} from "./CharacterInfoInput.tsx";
import {Route, Router} from "wouter";
import {useHashLocation} from "wouter/use-hash-location";
import {RenderedCharacterSheet} from "./RenderedCharacterSheet.tsx";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {CssVarsProvider} from "@mui/material-next";
import {flux} from "./themes.ts";
import {NavigationRail} from "./NavigationRail.tsx";
import {useLocalStorage} from "usehooks-ts";
import {Mode} from "./ModeToggle.tsx";
import {ImportExportCharacter} from "./ImportExportCharacter.tsx";

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

function App() {
    ui("theme", "#393bff");
    const [colorScheme] = useLocalStorage<Mode>("preferred-color-scheme", "auto");

    ui("mode", colorScheme)

    return (
        <CssVarsProvider theme={flux}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>

                <Router hook={useHashLocation}>
                    <NavigationRail/>
                    <main className={"top-margin center"} style={{maxInlineSize: "95rem"}}>
                        <Route path="/"><CharacterInfoInput/></Route>
                        <Route path={"/sheet"}><RenderedCharacterSheet/></Route>
                        <footer>Copyright © Herohelix, LLC</footer>
                    </main>
                </Router>
                <ImportExportCharacter />

            </ThemeProvider>
        </CssVarsProvider>
    )
}

export default App
