import {Link, useLocation} from "wouter";
import {clsx} from "clsx";
import {ModeToggle} from "./ModeToggle.tsx";
import '../../assets/App.css'
export function NavigationRail() {
    const location = useLocation()[0];
    const topLevelPath = (location.match(/^\/[^/]*/) ?? [''])[0];

    return <nav className={"m l left surface-container hide-when-printing"}>
        {/*TODO Add new header*/}
        <Link to={"/"} className={"top-margin"}>
            <i className={clsx(topLevelPath === "/" && "primary-container", "ripple")}>edit_document</i>
            <span className={clsx(topLevelPath === "/" && "bold")}>Input</span>
        </Link>
        <Link to={"/sheet"}>
            <i className={clsx(topLevelPath === "/sheet" && "primary-container", "ripple")}>contact_page</i>
            <span className={clsx(topLevelPath === "/sheet" && "bold")}>View</span>
        </Link>
        <div className={"absolute bottom bottom-margin"} style={{display: "flex", gap: ".5rem", flexDirection: "column"}}>
            <ModeToggle />
        </div>
    </nav>;
}