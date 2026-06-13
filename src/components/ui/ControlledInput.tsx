import React, {useEffect, useState} from 'react';
import type {SaveData} from "../../logic/save-data.ts";
import {db} from "../../logic/data-store.ts";

function ControlledTextarea(props: Readonly<{ dbField: keyof SaveData, initialValue: string, id: string }>) {
    const [fieldValue, setFieldValue] = useState(props.initialValue);

    useEffect(() => {
        db.characters.update(props.id, {[props.dbField]: fieldValue})
    }, [fieldValue, props.dbField, props.id]);
    return <div className="field label border extra">
        <textarea value={fieldValue} onChange={event => setFieldValue(event.target.value)}></textarea>
        <label><i className={"middle"}>double_arrow</i>Background</label>
    </div>

}

export default ControlledTextarea;

