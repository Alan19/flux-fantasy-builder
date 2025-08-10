import {DetailedHTMLProps, ReactNode, SelectHTMLAttributes} from "react";
import {InputSize} from "./BeerCSSTextField.tsx";
import {clsx} from "clsx";
import _ from "lodash";

export function BeerCSSSelect(props: DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & { children: ReactNode[] | ReactNode, border?: boolean, round?: boolean, fill?: boolean, suffix?: ReactNode, size?: InputSize, label?: string }) {
    return <div style={{width: "100%"}} className={clsx("field", "suffix", "no-margin", (props.border ?? true) && "border", props.round && "round", props.fill && "fill", props.size, props.label && "label")}>
        <select {..._.omit(props, ["children", "border", "round", "fill", "suffix", "size", "label"])}>
            <option hidden value={""}>Select an option</option>
            {props.children}
        </select>
        {props.label && <label>{props.label}</label>}
        {props.suffix ?? <i>arrow_drop_down</i>}
    </div>;
}