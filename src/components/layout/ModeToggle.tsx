import {useTernaryDarkMode} from "usehooks-ts";
import {clsx} from "clsx";
import {useEffect} from "react";

export function ModeToggle(props: { className?: string }) {
    const {ternaryDarkMode, toggleTernaryDarkMode} = useTernaryDarkMode()

    // TODO Check if it's possible to detect a night mode switch
    useEffect(() => {
        ui("mode", ternaryDarkMode === 'system' ? 'auto' : ternaryDarkMode)
    }, [ternaryDarkMode]);

    const [iconName, label] = (() => {
        switch (ternaryDarkMode) {
            case "light":
                return ["light_mode", "Light"]
            case "dark":
                return ["dark_mode", "Dark"]
            case "system":
                return ["auto_mode", "System"]
        }
    })()

    return <>
        <button onClick={toggleTernaryDarkMode} className={props.className ?? clsx("circle border extra tertiary-border tertiary-text")}>
            <i>{iconName}</i>
            <span>{label}</span>
        </button>
    </>;
}