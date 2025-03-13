import './App.css'
import {CharacterInfoInput} from "./CharacterInfoInput.tsx";
import {Route, Router} from "wouter";
import {useHashLocation} from "wouter/use-hash-location";
import {RenderedCharacterSheet} from "./RenderedCharacterSheet.tsx";
import {Container, createTheme, CssBaseline, ThemeProvider, Typography} from "@mui/material";
import {CssVarsProvider, extendTheme} from "@mui/material-next";

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

const cssVars = extendTheme({
    ref: {
        palette: {
            "primary": {
                "0": "#000000",
                "10": "#04006D",
                "20": "#0A00AB",
                "30": "#1300ED",
                "40": "#393BFF",
                "50": "#5D63FF",
                "60": "#7E84FF",
                "70": "#9FA3FF",
                "80": "#C0C1FF",
                "90": "#E1E0FF",
                "95": "#F1EFFF",
                "99": "#FFFBFF",
                "100": "#FFFFFF"
            },
            "secondary": {
                "0": "#000000",
                "10": "#2D004F",
                "20": "#4B007D",
                "30": "#6B00B0",
                "40": "#891FD8",
                "50": "#A443F3",
                "60": "#BB6AFF",
                "70": "#CD92FF",
                "80": "#DFB7FF",
                "90": "#F1DAFF",
                "95": "#FAECFF",
                "99": "#FFFBFF",
                "100": "#FFFFFF"
            },
            "tertiary": {
                "0": "#000000",
                "10": "#3B002E",
                "20": "#561745",
                "30": "#712E5D",
                "40": "#8C4676",
                "50": "#A95E90",
                "60": "#C677AA",
                "70": "#E491C6",
                "80": "#FFADE0",
                "90": "#FFD8ED",
                "95": "#FFECF4",
                "99": "#FFFBFF",
                "100": "#FFFFFF"
            },
            "neutral": {
                "0": "#000000",
                "10": "#1C1B1F",
                "17": "#2a292f",
                "20": "#313034",
                "22": "#35343a",
                "30": "#47464A",
                "40": "#5F5E62",
                "50": "#78767A",
                "60": "#929094",
                "70": "#ADAAAF",
                "80": "#C8C5CA",
                "90": "#E5E1E6",
                "92": "#eae7ef",
                "95": "#F3EFF4",
                "96": "#f6f2fa",
                "99": "#FFFBFF",
                "100": "#FFFFFF"
            },
            "neutralVariant": {
                "0": "#000000",
                "10": "#1B1B23",
                "20": "#303038",
                "30": "#46464F",
                "40": "#5E5D67",
                "50": "#777680",
                "60": "#918F9A",
                "70": "#ACAAB4",
                "80": "#C7C5D0",
                "90": "#E4E1EC",
                "95": "#F2EFFA",
                "99": "#FFFBFF",
                "100": "#FFFFFF"
            }
        }
    }
})

function App() {
    return (
        <CssVarsProvider theme={cssVars}>
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
