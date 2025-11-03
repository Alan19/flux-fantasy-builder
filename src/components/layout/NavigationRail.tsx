import {Link, useLocation} from "wouter";
import {clsx} from "clsx";
import {ModeToggle} from "./ModeToggle.tsx";
import '../../assets/App.css'
import {useIsMobile} from "../../hooks/useIsMobile.ts";
export function NavigationRail() {
    const location = useLocation()[0];
    const topLevelPath = (location.match(/^\/[^/]*/) ?? [''])[0];
    const isMobile = useIsMobile();

    return <nav className={clsx("surface-container hide-when-printing", !isMobile ? "left" : "bottom")}>
        {/*TODO Add new header*/}
        <Link to={"/"} className={clsx(!isMobile && "top-margin")}>
            <i className={clsx(topLevelPath === "/" && "primary-container", "ripple")}>edit_document</i>
            <span className={clsx(topLevelPath === "/" && "bold")}>Input</span>
        </Link>
        <Link to={"/sheet"}>
            <i className={clsx(topLevelPath === "/sheet" && "primary-container", "ripple")}>contact_page</i>
            <span className={clsx(topLevelPath === "/sheet" && "bold")}>View</span>
        </Link>
        {!useIsMobile() && <div className={"absolute bottom bottom-margin"} style={{display: "flex", gap: ".5rem", flexDirection: "column"}}>
            <ModeToggle/>
        </div>}
    </nav>;
}