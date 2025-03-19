import './App.css'
import {CharacterInfoInput} from "./CharacterInfoInput.tsx";
import {Route, Router} from "wouter";
import {useHashLocation} from "wouter/use-hash-location";
import {RenderedCharacterSheet} from "./RenderedCharacterSheet.tsx";
import {Container, createTheme, CssBaseline, ThemeProvider, Typography} from "@mui/material";
import {CssVarsProvider} from "@mui/material-next";
import {useLocalStorage} from "usehooks-ts";
import {AppTheme, getTheme} from "./ModeToggle.tsx";

const theme = createTheme({
    typography: {
        fontFamily: [
            'Oxanium',
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
    const [appTheme] = useLocalStorage<AppTheme>("app-theme", "Lucky");

    return (
        <CssVarsProvider theme={getTheme(appTheme)}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Router hook={useHashLocation}>
                    <Route path="/"><CharacterInfoInput/></Route>
                    <Route path={"/sheet"}><RenderedCharacterSheet/></Route>
                </Router>
                <Container>
                    <footer style={{textAlign: "right", marginTop: 16}}><Typography variant={"subtitle1"}>Copyright © Herohelix, LLC</Typography></footer>
                </Container>
            </ThemeProvider>
        </CssVarsProvider>
    )
}

export default App
