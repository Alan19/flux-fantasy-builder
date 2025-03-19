import {Typography} from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

export function TypographyWithAdornment(props: Readonly<{ text: string, coloredText?: boolean }>) {
    const {text, coloredText = false} = props;
    return <Typography color={coloredText ? "var(--md-sys-color-primary)" : "var(--md-sys-color-onSurface)"} fontWeight={"bold"} variant={"h5"} style={{lineHeight: '29px'}}><DoubleArrowIcon
        style={{verticalAlign: "bottom", height: '29px'}}/> {text}</Typography>;
}