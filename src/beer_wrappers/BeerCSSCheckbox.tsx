import {ReactNode} from "react";
import _ from "lodash";
import {InputSize} from "./BeerCSSTextField.tsx";
import {clsx} from "clsx";

export function BeerCSSCheckbox(props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {label: ReactNode | string, size?: InputSize}) {
    return (
        <label className={clsx("checkbox", props.size)}>
            <input type="checkbox" {..._.omit(props, ['label'])}/>
            <span>{props.label}</span>
        </label>
    );
}