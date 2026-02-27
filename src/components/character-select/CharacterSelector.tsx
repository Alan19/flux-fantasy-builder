import {Dialog} from "@base-ui-components/react";
import styles from './index.module.css';
import {clsx} from "clsx";
import {OCSaveData} from "../../utils/types/OCSaveData.ts";
import {CharacterManager} from "../../utils/AssembleLocalStorage.ts";

function SelectOCCard(props: Readonly<{ isSelected: boolean, ocData: OCSaveData, onSelect: () => void, onDelete: () => void }>) {
    return <div>
        <article className={clsx("no-padding small", props.isSelected && "secondary-container")}>
            <div className={"grid"}>
                <div className="s4" style={{height: "12rem"}}>
                    <img style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: "top"}} src={props.ocData.background.characterImageData}/>
                </div>
                <div className="s8">
                    <div className="padding">
                        <h6>{props.ocData.background.characterName || "Unnamed Character"}</h6>
                        <p><b>{props.ocData.background.study}</b> {props.ocData.background.karmaSpecialty}</p>
                        <nav>
                            <button onClick={props.onSelect} className="round">Select</button>
                            <button className="round error-border border error-text" onClick={props.onDelete}>Delete</button>
                        </nav>
                    </div>
                </div>
            </div>
        </article>
    </div>;
}

export function CharacterSelector({createCharacter, deleteCharacter, characterList, setCurrentCharacter, currentCharacter}: Readonly<Omit<CharacterManager, "importCharacter" | "exportCharacter">>) {
    return (
        <Dialog.Root>
            <Dialog.Trigger className={"tertiary"}><i>restart_alt</i> Select Character</Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Backdrop className={styles.Backdrop}/>
                <Dialog.Popup className={clsx(styles.Popup, "surface-container")}>
                    <Dialog.Title className={styles.Title}>Select Your Character</Dialog.Title>
                    <div style={{blockSize: '32rem', overflowY: 'scroll', display: 'flex', flexDirection: 'column'}}>
                            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                                {characterList.map((item) => {
                                    const characterJSON = localStorage.getItem(item);
                                    if (characterJSON) {
                                        const ocData = JSON.parse(characterJSON) as OCSaveData;
                                        return <SelectOCCard key={item} isSelected={item === currentCharacter} ocData={ocData} onSelect={() => setCurrentCharacter(item)} onDelete={() => deleteCharacter(item)}/>;
                                    }
                                    return <></>
                                })}
                            </div>
                    </div>
                    <div className={styles.Actions}>
                        <div style={{display: "flex", alignItems: "baseline", justifyContent: "space-between", width: "100%"}}>
                            <button className={"secondary-border border secondary-text top-margin"} onClick={() => createCharacter()}>Create Character</button>
                            <Dialog.Close className={"border"}>Close</Dialog.Close>
                        </div>
                    </div>
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    );
}