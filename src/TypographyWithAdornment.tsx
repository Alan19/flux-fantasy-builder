import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

export function TypographyWithAdornment(props: Readonly<{ text: string, coloredText?: boolean }>) {
    const {text, coloredText = false} = props;
    return <h5 style={{lineHeight: '29px', fontWeight: "bold", color: coloredText ? "var(--primary)" : "inherit"}}>
        <DoubleArrowIcon style={{verticalAlign: "bottom", height: '29px'}}/> {text}
    </h5>;
}