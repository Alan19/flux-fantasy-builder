import * as React from "react";
import {ReactNode} from "react";
import _ from "lodash";
import {clsx} from "clsx";

export type InputSize = "small" | "medium" | "large" | "extra";

interface CommonProps {
    label?: string,
    inputSize?: InputSize,
    inputPrefix?: ReactNode,
    inputSuffix?: ReactNode,
    variant?: "filled" | "outlined",
    addMargin?: boolean,
    helperText?: string,
}

type InputProps = {
    multiline?: false;
} & React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> &
    CommonProps;

type TextareaProps = {
    multiline: true;
} & React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
> &
    CommonProps;


export function BeerCSSTextField(props: InputProps | TextareaProps) {
    const className = clsx("field",
        props.multiline && "textarea",
        !props.addMargin && "no-margin",
        (props.variant ?? "outlined") === "outlined" ? "border" : "fill",
        props.label && "label",
        props.inputPrefix && "prefix",
        props.inputSuffix && "suffix",
        props.inputSize,
        'auto-height');

    return <div className={className}>
        {props.inputPrefix}
        {props.multiline ? <textarea {..._.omit(props, ['label', 'inputSize', 'inputPrefix', 'inputSuffix', 'addMargin', 'helperText'])} className={clsx(props.className, props.placeholder && "active")}/> : <input {..._.omit(props, ['label', 'inputSize', 'inputPrefix', 'inputSuffix', 'addMargin', 'helperText'])} className={clsx(props.className, props.placeholder && "active")}/>}
        {"type" in props && props.type === 'file' && <input type={"text"}/>}
        <label className={clsx(props.placeholder && "active")}>{props.label}</label>
        {props.inputSuffix}
        {props.helperText && <span className={"helper"}>{props.helperText}</span>}
    </div>
}