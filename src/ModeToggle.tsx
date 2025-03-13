import {Stack, Tooltip} from "@mui/material";
import {Button, useColorScheme} from "@mui/material-next";
import {AutoMode, DarkMode, LightMode} from "@mui/icons-material";

export function ModeToggle() {
    const {mode, setMode} = useColorScheme();
    return <Stack direction={"column"} spacing={1} style={{background: 'var(--md-sys-color-surfaceContainerLow)', padding: 8, borderRadius: 24}}>
        <Tooltip title={"Light"} placement={"left"}>
            <Button variant={mode === 'light' ? 'filled' : 'text'} onClick={() => setMode('light')}><LightMode/></Button>
        </Tooltip>
        <Tooltip title={"Dark"} placement={"left"}>
            <Button variant={mode === 'dark' ? "filled" : 'text'} onClick={() => setMode('dark')}><DarkMode/></Button>
        </Tooltip>
        <Tooltip title={"System"} placement={"left"}>
            <Button variant={mode === 'system' ? "filled" : 'text'} onClick={() => setMode('system')}><AutoMode/></Button>
        </Tooltip>
    </Stack>;
}