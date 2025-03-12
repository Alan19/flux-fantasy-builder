import {Typography} from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

export function TypographyWithAdornment(props: Readonly<{ text: string }>) {
    const {text} = props;
    return <Typography fontWeight={"bold"} variant={"h5"} style={{lineHeight: '29px'}}><DoubleArrowIcon style={{verticalAlign: "bottom", height: '29px'}}/> {text}</Typography>;
}