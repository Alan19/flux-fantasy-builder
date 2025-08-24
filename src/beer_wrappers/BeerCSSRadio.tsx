import {ReactNode} from "react";
import {InputSize} from "./BeerCSSTextField.tsx";
import _ from "lodash";
import {clsx} from "clsx";

export function BeerCSSRadio(props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {label: ReactNode | string, size?: InputSize}) {
    return <label className={clsx("radio", props.size)}>
        <input {..._.omit(props, ['label'])} type="radio"/>
        <span>{props.label}</span>
    </label>;
}