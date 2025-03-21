import {Stack, Tooltip, useMediaQuery, useTheme} from "@mui/material";
import {Button, Divider, useColorScheme} from "@mui/material-next";
import {AutoMode, DarkMode, LightMode} from "@mui/icons-material";
import {useLocalStorage} from "usehooks-ts";
import {useEffect} from "react";
import {ImportExportCharacter} from "./ImportExportCharacter.tsx";

export type AppTheme = 'Hugo' | 'Marco' | 'Lucky'

export function ModeToggle() {
    type Mode = 'light' | 'dark' | 'system';
    const {mode, setMode} = useColorScheme();
    const [colorScheme, setColorScheme] = useLocalStorage<Mode>("preferred-color-scheme", "system");
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('xl'));

    useEffect(() => {
        setMode(colorScheme)
    }, [colorScheme])

    return <Stack direction={matches ? "column" : "row"} spacing={1} style={{background: 'var(--md-sys-color-surfaceContainerLow)', padding: 8, borderRadius: 24}}>
        <Tooltip title={"Light"} placement={"left"}>
            <Button variant={mode === 'light' ? 'filled' : 'text'} onClick={() => setColorScheme('light')}><LightMode/></Button>
        </Tooltip>
        <Tooltip title={"Dark"} placement={"left"}>
            <Button variant={mode === 'dark' ? "filled" : 'text'} onClick={() => setColorScheme('dark')}><DarkMode/></Button>
        </Tooltip>
        <Tooltip title={"System"} placement={"left"}>
            <Button variant={mode === 'system' ? "filled" : 'text'} onClick={() => setColorScheme('system')}><AutoMode/></Button>
        </Tooltip>
        <Divider orientation={matches ? "horizontal" : "vertical"} flexItem/>
        <ImportExportCharacter/>
    </Stack>;
}