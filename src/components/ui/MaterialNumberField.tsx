import {NumberField} from "@base-ui-components/react/number-field";
import * as React from "react";
import styles from './index.module.css';
import {clsx} from "clsx";
import {CSSProperties, ReactNode} from "react";

export function MaterialNumberField(props: { value: number, onChange: (newVal: number) => unknown, label: string, className?: string, style?: CSSProperties, min?: number, max?: number, inputPrefix?: ReactNode, helperText?: string, endAdornment?: string, decrementButton?: boolean, incrementButton?: boolean }) {
    const id = React.useId();
    return <NumberField.Root value={props.value} id={id} min={props.min ?? 0} max={props.max} style={{display: "flex", alignItems: "center", ...props.style}} className={clsx("top-margin", props.className)}>
        {props.decrementButton && <NumberField.Decrement className={"transparent square border ripple"} style={{marginLeft: 0}} onClick={() => props.onChange(props.value - 1)}>
            <i>remove</i>
        </NumberField.Decrement>}
        <NumberField.Group className={clsx("field", "label", "border", "no-margin", props.inputPrefix && "prefix")} style={{display: "flex", width: "100%"}}>
            {props.inputPrefix}
            <NumberField.Input type={"number"}
                               onChange={event => props.onChange(props.max ? Math.min(Number(event.target.value), props.max) : Number(event.target.value))}
                               className={styles.Input}/>
            <label htmlFor={id}>{props.label}</label>
            {props.endAdornment && <div className={"absolute"} style={{right: '1rem', top: 12}}>{props.endAdornment}</div>}
            {props.helperText && <span className={"helper"}>{props.helperText}</span>}
        </NumberField.Group>
        {props.incrementButton && <NumberField.Increment className={"transparent square border ripple"} style={{marginRight: 0}} onClick={() => props.onChange(props.value + 1)}>
            <i>add</i>
        </NumberField.Increment>}
    </NumberField.Root>;
}