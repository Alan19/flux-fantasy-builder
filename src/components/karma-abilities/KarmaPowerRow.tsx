import {ChangeEvent} from "react";
import {BeerCSSTextField} from "../ui/beer-css-wrappers/BeerCSSTextField.tsx";

type KarmaPowerRowProps = { powerName: string, onChange: (event: ChangeEvent<HTMLInputElement>) => void, label: string, cost: number, damage?: number, range?: string, effect?: string, isOverPaybackThreshold: boolean };

// TODO Add power descriptions in tooltip on hover
export function KarmaPowerRow(props: Readonly<KarmaPowerRowProps>) {
    const {powerName, cost, damage, onChange, range, effect, isOverPaybackThreshold, label} = props;
    return <tr>
        <td style={{paddingTop: 10}}><BeerCSSTextField value={powerName} onChange={onChange} label={label}/></td>
        <td align="right">
            {cost}{isOverPaybackThreshold && "(⬆)"}
        </td>
        <td align="right">{damage}</td>
        <td align="right">{range}</td>
        <td>{effect}</td>
    </tr>
}