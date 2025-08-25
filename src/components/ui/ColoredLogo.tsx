import fluxFantasyLogo from "../../assets/ff_logo_transparent_cropped.png";

function colorImage(color: string) {
    return {filter: `drop-shadow(0px 1000px 0 ${color}`, transform: 'translateY(-1000px)'}
}

export function ColoredLogo() {
    return <img src={fluxFantasyLogo} style={{width: "100%", ...colorImage("var(--primary)")}} alt={'The logo of Flux Fantasy, consisting of a stylized version of the text "Flux Fantasy"'}/>;
}