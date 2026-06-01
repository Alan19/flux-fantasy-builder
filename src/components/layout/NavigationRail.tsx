import {Link, useLocation} from "wouter";
import {clsx} from "clsx";
import {ModeToggle} from "./ModeToggle.tsx";
import '../../assets/App.css'
import {useIsMobile} from "../../utils/hooks/useIsMobile.ts";
export function NavigationRail() {
    const location = useLocation()[0];
    const topLevelPath = (new RegExp(/^\/[^/]*/).exec(location) ?? [''])[0];
    const isMobile = useIsMobile();

    return <nav className={clsx("surface-container hide-when-printing", isMobile ? "bottom" : "left")}>
        {/*TODO Add new header*/}
        <Link to={"/"} className={clsx(!isMobile && "top-margin")}>
            <i className={clsx(topLevelPath === "/" && "secondary-container", "ripple")}>edit_document</i>
            <span className={clsx(topLevelPath === "/" && "bold")}>Setup</span>
        </Link>
        <Link to={"/sheet"}>
            <i className={clsx(topLevelPath === "/sheet" && "secondary-container", "ripple")}>contact_page</i>
            <span className={clsx(topLevelPath === "/sheet" && "bold")}>View</span>
        </Link>
        <Link to={"/powers"}>
            <i className={clsx(topLevelPath === "/powers" && "secondary-container", "ripple")}>swords</i>
            <span className={clsx(topLevelPath === "/powers" && "bold")}>Powers</span>
        </Link>
        <Link to={"/skill-tree"}>
            <i className={clsx(topLevelPath === "/skill-tree" && "secondary-container", "ripple")}>dynamic_form</i>
            <span className={clsx(topLevelPath === "/skill-tree" && "bold")}>Skills</span>
        </Link>
        {!useIsMobile() && <div className={"absolute bottom bottom-margin"} style={{display: "flex", gap: ".5rem", flexDirection: "column"}}>
            <ModeToggle/>
        </div>}
    </nav>;
}