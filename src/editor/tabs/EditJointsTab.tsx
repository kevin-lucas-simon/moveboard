import {JointModel} from "../../model/JointModel";
import React from "react";
import {ListObjectEditor} from "../input/ListObjectEditor";
import {BaseTab} from "./BaseTab";
import {ChunkReducerActions} from "../reducer/chunkReducer";

export type EditJointsTabProps = {
    joints: JointModel[];
    chunkNames: string[];
    chunkDispatcher: React.Dispatch<ChunkReducerActions>;
}

export function EditJointsTab(props: EditJointsTabProps) {
    const addJoint = (neighbour: string) => {
        props.chunkDispatcher({
            type: 'chunk_add_joint',
            payload: {
                neighbour: neighbour,
                position: {x: 0, y: 0, z: 0},
                dimension: {x: 1, y: 1, z: 1},
                vision: 1,
            } as JointModel,
        });
    }

    const updateJoint = (index: string, value: JointModel) => {
        props.chunkDispatcher({
            type: 'chunk_update_joint',
            payload: {
                index: index,
                joint: value,
            }
        });
    }

    const removeJoint = (index: string) => {
        props.chunkDispatcher({
            type: 'chunk_remove_joint',
            payload: index,
        });
    }

    /**
     * TODO langsam komme ich zur Frage der Gestaltung des Joint Editors, hier brauche ich noch ne Lösung
     * Ich könnte ein Joint erst ohne Chunkname erstellen, der dann als "Failed Object" visuell markiert ist
     * Dann bei der Auswahl vom "neighbour" Parameter wird eine Suchleiste verwendet wie bei der Chunk Auswahl
     * Danach ist die Connection halb fertig, es erkennt die gültige Verbindung, muss aber im nachbarChunk noch eingetragen werden
     * Das könnte über ein Zusatzbutton geschehen, das im NachbarChunk den Joint automatisch einträgt
     * Dies müsste dann im LevelReducer über eine weitere Action geschehen
     *
     * Ich muss zusätzlich meinen Renderer anpassen, da er die Joints komplett lädt und dann erst die Vision prüft
     * Das ist ein großes Problem, da ich zyklische Loops beim Rendering leider erwarte
     * Hier muss ich eine Lösung finden, wie ich die Joints erst lade, wenn die Vision geprüft wurde
     * Ggf wäre eine Loop Funktionalität vom selben Chunk Typen als Nachbar spannend ^^
     * Ich glaube, dass ich beim Renderer dann die key-Logic von React nützlich integrieren kann für Memorization oder so :D
     *
     * An sich muss der Renderer nur zeigen, dass es eine Verbindung gibt und bei Fehlern einen Error geben oder bzw garnichts machen
     * Da ich jz die Macht von Reducern habe, kann ich direkt beim Erstellen des Joints direkt die Gegenseite auch mit Joint verbinden
     * Ebenso müsste das fürs Ändern als auch Löschen von Joints ggf passieren? Auf jeden Fall soll das Handling über Level Reducer Ebene gehen
     * Des Weiteren können die Reducer ggf Error Meldungen schmeißen, wenn zB doch die Gegenseite nicht existiert
     */

    return (
        <BaseTab
            title={"Joints"}
            description={"Connect the chunk to other chunks using joints."}
            addOptions={props.chunkNames}
            onAdd={addJoint}
        >
            <ul>
                {props.joints.map((joint, index) =>
                    <li key={index} className="flex flex-col divide-gray-500/20">
                        <ListObjectEditor
                            key={index}
                            keyName={index.toString()}
                            displayname={joint.neighbour}
                            value={joint}
                            onChange={updateJoint}
                            onDelete={removeJoint}
                        />
                    </li>
                )}
            </ul>
        </BaseTab>
    );
}
