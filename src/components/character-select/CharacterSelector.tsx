import {Dialog} from "@base-ui-components/react";
import styles from './index.module.css';
import {clsx} from "clsx";
import {OCSaveData} from "../../utils/types/OCSaveData.ts";
import {CharacterManager} from "../../utils/AssembleLocalStorage.ts";
import {useState} from "react";
import {BeerCSSTextField} from "../ui/beer-css-wrappers/BeerCSSTextField.tsx";

function SelectOCCard(props: Readonly<{ isSelected: boolean, ocData: OCSaveData, onSelect: () => void, onDelete: () => void }>) {
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [textbox, setTextbox] = useState("")
    const {characterName} = props.ocData.background;
    return <div>
        <article className={clsx("no-padding", props.isSelected && "secondary-container")} style={{minHeight: '12rem'}}>
            <div className={"grid"}>
                <div className="s4" style={{height: "12rem"}}>
                    <img style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: "top"}} src={props.ocData.background.characterImageData}/>
                </div>
                <div className="s8">
                    <div className="padding" style={{height: "100%"}}>
                        <h6>{props.ocData.background.characterName || "Unnamed Character"}</h6>
                        <p><b>{props.ocData.background.study}</b> {props.ocData.background.karmaSpecialty}</p>
                        {deleteConfirmation ? <div style={{display: "flex", alignItems: "baseline", gap: '.125rem'}} className={"top-margin"}>
                                <BeerCSSTextField value={textbox} onChange={event => setTextbox(event.target.value)} label={"Enter your character name"} placeholder={props.ocData.background.characterName}/>
                                <nav className={"group connected no-margin"}>
                                    <button className="round error no-round" style={{height: '100%'}} disabled={textbox !== characterName} onClick={props.onDelete}><i>delete_forever</i></button>
                                    <button className="round error-border border error-text right-round" style={{height: '100%'}} disabled={props.isSelected} onClick={() => setDeleteConfirmation(false)}><i>cancel</i></button>
                                </nav>
                        </div> : <>
                            <nav style={{display: "flex", justifyContent: "space-between"}}>
                                <button onClick={props.onSelect} disabled={props.isSelected} className="round">Select</button>
                            </nav>
                            <button style={{position: "absolute", bottom: '1rem', right: '1rem'}} className="transparent circle" disabled={props.isSelected} onClick={() => setDeleteConfirmation(true)}><i>delete</i></button>
                        </>}

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