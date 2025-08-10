import * as React from "react";
import {InputHTMLAttributes, ReactNode} from "react";
import _ from "lodash";
import {clsx} from "clsx";

type InputProps = React.DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export type InputSize = "small" | "medium" | "large" | "extra";

export function BeerCSSTextField(props: InputProps & { label?: string, inputSize?: InputSize, inputPrefix?: ReactNode, inputSuffix?: ReactNode, border?: boolean, round?: boolean, fill?: boolean}) {
    const className = clsx("field no-margin", (props.border ?? true) && 'border', props.round && "round", props.fill && "fill", props.label && "label", props.inputPrefix && "prefix", props.inputSuffix && "suffix", props.inputSize);

    return <div className={className}>
        {props.inputPrefix}
        <input {..._.omit(props, ['label', 'inputSize', 'inputPrefix', 'inputSuffix'])}/>
        {props.type === 'file' && <input type={"text"}/>}
        <label>{props.label}</label>
        {props.inputSuffix}
    </div>
}