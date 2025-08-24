export function TypographyWithAdornment(props: Readonly<{ text: string, coloredText?: boolean }>) {
    const {text, coloredText = false} = props;
    return <h5 style={{lineHeight: '29px', fontWeight: "bold", color: coloredText ? "var(--primary)" : "inherit"}}>
        <i style={{verticalAlign: "bottom", height: '29px', fontWeight: "bold"}}>keyboard_double_arrow_right</i>{text}
    </h5>;
}