import {Stack, Tooltip} from "@mui/material";
import {Button, Divider, useColorScheme} from "@mui/material-next";
import {Android, AutoMode, Brush, DarkMode, LightMode, SettingsSuggest} from "@mui/icons-material";
import {useLocalStorage} from "usehooks-ts";
import {useEffect} from "react";
import {flux, hugold, marco} from "./themes.tsx";

export type AppTheme = 'Hugo' | 'Marco' | 'Lucky'

export function getTheme(theme: AppTheme) {
    switch (theme) {
        case "Hugo":
            return hugold
        case "Marco":
            return marco;
        case "Lucky":
            return flux;
    }
}

export function ModeToggle() {
    type Mode = 'light' | 'dark' | 'system';
    const {mode, setMode} = useColorScheme();
    const [colorScheme, setColorScheme] = useLocalStorage<Mode>("preferred-color-scheme", "system");
    const [appTheme, setAppTheme] = useLocalStorage<AppTheme>("app-theme", "Lucky");


    useEffect(() => {
        setMode(colorScheme)
    }, [colorScheme])

    return <Stack direction={"column"} spacing={1} style={{background: 'var(--md-sys-color-surfaceContainerLow)', padding: 8, borderRadius: 24}}>
        <Tooltip title={"Light"} placement={"left"}>
            <Button variant={mode === 'light' ? 'filled' : 'text'} onClick={() => setColorScheme('light')}><LightMode/></Button>
        </Tooltip>
        <Tooltip title={"Dark"} placement={"left"}>
            <Button variant={mode === 'dark' ? "filled" : 'text'} onClick={() => setColorScheme('dark')}><DarkMode/></Button>
        </Tooltip>
        <Tooltip title={"System"} placement={"left"}>
            <Button variant={mode === 'system' ? "filled" : 'text'} onClick={() => setColorScheme('system')}><AutoMode/></Button>
        </Tooltip>
        <Divider/>
        <Tooltip title={"HuGOLD"} placement={"left"}>
            <Button variant={appTheme === 'Hugo' ? 'filled' : 'text'} onClick={() => setAppTheme('Hugo')}><SettingsSuggest/></Button>
        </Tooltip>
        <Tooltip title={"Marco Magenta"} placement={"left"}>
            <Button variant={appTheme === 'Marco' ? "filled" : 'text'} onClick={() => setAppTheme('Marco')}><Brush/></Button>
        </Tooltip>
        <Tooltip title={"Lucky Purple"} placement={"left"}>
            <Button variant={appTheme === 'Lucky' ? "filled" : 'text'} onClick={() => setAppTheme('Lucky')}><Android/></Button>
        </Tooltip>
    </Stack>;
}