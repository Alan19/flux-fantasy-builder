import {Dialog} from "@base-ui-components/react";
import styles from './index.module.css';
import {clsx} from "clsx";
import {useReadLocalStorage} from "usehooks-ts";
import {OCSaveData} from "../../utils/types/OCSaveData.ts";
import {CharacterManager} from "../../utils/hooks/useOCLocalStorage.ts";

interface CharacterSelectorProps {
    createCharacter: () => void;
    deleteCharacter: (id: string) => void;
    characterList: string[],
}

export function CharacterSelector({createCharacter, deleteCharacter, characterList, setCurrentCharacter, currentCharacter}: Readonly<Omit<CharacterManager, "importCharacter" | "exportCharacter">>) {
    return (
        <Dialog.Root>
            <Dialog.Trigger className={"tertiary"}><i>restart_alt</i> Select Character</Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Backdrop className={styles.Backdrop}/>
                <Dialog.Popup className={clsx(styles.Popup, "surface")}>
                    <Dialog.Title className={styles.Title}>Select Your Character</Dialog.Title>
                    <Dialog.Description className={styles.Description}>
                        {characterList.map((item) => {
                            const characterJSON = localStorage.getItem(item);
                            if (characterJSON) {
                                const ocData = JSON.parse(characterJSON) as OCSaveData;
                                return <article key={item} className={clsx("no-padding small", (currentCharacter === item) && "primary-container")}>
                                    <div className={"grid"}>
                                        <div className="s6" style={{height: "12rem"}}>
                                            <img style={{width: '100%', height: "100%", objectFit: "cover", objectPosition: "top"}} src={ocData.background.characterImageData}/>
                                        </div>
                                        <div className="s6">
                                            <div className="padding">
                                                <h6>{ocData.background.characterName ?? "Unnamed Character"}</h6>
                                                <p>{`${ocData.background.study} ${ocData.background.karmaSpecialty}`}</p>
                                                <nav>
                                                    <button onClick={() => setCurrentCharacter(item)} className="round">Select</button>
                                                    <button className="round border" onClick={() => deleteCharacter(item)}>Delete</button>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </article>;
                            }
                            return <></>
                        })}
                        <button className={"secondary"} onClick={event => createCharacter()}>Create Character</button>
                    </Dialog.Description>
                    <div className={styles.Actions}>
                        <Dialog.Close>Close</Dialog.Close>
                    </div>
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    );
}