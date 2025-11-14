import {EditorDialogProps} from "../EditorDialogProps";
import {BasicDialog} from "../../../component/dialog/BasicDialog";
import {useLevelOverviewDownloader} from "../../../data/repository/useLevelOverviewDownloader";
import React, {ChangeEvent, useState} from "react";
import {createLevel} from "../../../data/model/world/LevelModel";
import {localEditorDB} from "../../../data/localEditorDB";
import {Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Field, Input, Label} from "@headlessui/react";
import {LevelOverviewModel} from "../../../data/model/world/LevelOverviewModel";
import {serverLevelDB} from "../../../data/serverLevelDB";

export function EditorCreateLevelDialog(props: EditorDialogProps) {
    const serverLevels: LevelOverviewModel[] = useLevelOverviewDownloader() ?? [];

    const [editorName, setEditorName] = useState<string>("New Level");
    const [editorLevel, setEditorLevel] = useState<LevelOverviewModel|null>(null);

    const [query, setQuery] = useState<string>('')

    const filteredServerLevels =
        query === ''
            ? serverLevels
            : serverLevels.filter((serverLevel) => {
                return serverLevel.name.toLowerCase().includes(query.toLowerCase())
            })

    const create = async () => {
        let levelModel = createLevel()
        if (editorLevel) {
            levelModel = await serverLevelDB.getLevel(editorLevel.id) ?? levelModel
        }

        levelModel.name = editorName;

        const editorID = await localEditorDB.create(levelModel)

        document.location.href = "/editor/" + editorID;
        props.onClose();
    }

    return (
        <BasicDialog
            title={"Create Level"}
            isOpen={true}
            submitButton={"Create"}
            onSubmit={create}
            onClose={props.onClose}
        >
            <Field>
                <Label>Level Name</Label>
                <Input
                    type="text"
                    value={editorName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEditorName(e.target.value)}
                    className="w-full p-2 border border-gray-300 bg-transparent rounded"
                    placeholder="Level Name"
                />
            </Field>

            <Field>
                <Label>Server Level Preset</Label>
                <Combobox value={editorLevel} onChange={setEditorLevel} onClose={() => setQuery('')}>
                    <ComboboxInput
                        placeholder="Use no Server Level as Preset"
                        className="w-full p-2 border border-gray-300 bg-transparent rounded"
                        displayValue={(serverLevel: LevelOverviewModel) => serverLevel?.name}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <ComboboxOptions
                        anchor="bottom start"
                        className="z-20 mt-1 min-w-56 max-w-sm text-nowrap origin-top-left rounded-xl bg-white shadow-lg drop-shadow-xl"
                    >
                        {filteredServerLevels.map((serverLevel) => (
                            <ComboboxOption
                                key={serverLevel.id}
                                value={serverLevel}
                                className="p-2 hover:bg-gray-100 data-focus:bg-gray-100 cursor-pointer"
                            >
                                {serverLevel.name}
                            </ComboboxOption>
                        ))}
                    </ComboboxOptions>
                </Combobox>
            </Field>

        </BasicDialog>
    )
}
