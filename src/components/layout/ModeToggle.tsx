import {useLocalStorage} from "usehooks-ts";
import {clsx} from "clsx";
import {useEffect} from "react";

export type AppTheme = 'Hugo' | 'Marco' | 'Lucky'

export type Mode = 'light' | 'dark' | 'auto';
export function ModeToggle() {
    const [colorScheme, setColorScheme] = useLocalStorage<Mode>("preferred-color-scheme", "auto");

    // TODO Check if it's possible to detect a night mode switch
    useEffect(() => {
        ui("mode", colorScheme)
    }, [colorScheme]);

    return <>
        <button onClick={() => setColorScheme("light")} className={clsx("circle", colorScheme === "light" ? "tertiary" : "border tertiary-text")}>
            <i>light_mode</i>
            <span>Light</span>
        </button>
        <button onClick={() => setColorScheme("dark")} className={clsx("circle", colorScheme === "dark" ? "tertiary" : "border tertiary-text")}>
            <i>dark_mode</i>
            <span>Dark</span>
        </button>
        <button onClick={() => setColorScheme("auto")} className={clsx("circle", colorScheme === "auto" ? "tertiary" : "border tertiary-text")}>
            <i>auto_mode</i>
            <span>System</span>
        </button>
    </>;
}