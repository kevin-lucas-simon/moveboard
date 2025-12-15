import {useLiveQuery} from "dexie-react-hooks";
import {localEditorDB} from "../data/localEditorDB";
import {EditorMainMenu} from "../editor/layout/menu/EditorMainMenu";
import {Link} from "react-router-dom";
import {EditorLeaveDialog} from "../editor/dialog/levelOverview/EditorLeaveDialog";
import {EditorCreateLevelDialog} from "../editor/dialog/levelOverview/EditorCreateLevelDialog";
import React, {useState} from "react";
import {
    PlusCircleIcon,
} from "@heroicons/react/24/outline";
import {LinkButton} from "../component/button/LinkButton";
import {EditorContextMenu} from "../editor/layout/menu/EditorContextMenu";
import { EditorDeleteDialog } from "../editor/dialog/levelOverview/EditorDeleteDialog";

export function PageEditorOverview() {
    const overviewLocalEditors = useLiveQuery(() => localEditorDB.list()) ?? [];
    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <div className="w-full h-full flex flex-col gap-4">
            <EditorMainMenu
                collapsed={false}
                dialogs={{
                    "Leave Editor": EditorLeaveDialog,
                }}
            />

            <h2 className="text-xl font-semibold truncate mx-4 shrink-0">
                Recent Edits
            </h2>

            <ul className="flex flex-col -my-2.5 overflow-y-auto empty:hidden">
                {overviewLocalEditors && overviewLocalEditors.map((localEditor) => (
                    <li
                        key={localEditor.id}
                        className="max-w-xs flex flex-row justify-between items-center gap-2 px-4 py-2.5 rounded-r-2xl group hover:bg-gray-500/10"
                    >
                        <Link to={"/editor/" + localEditor.id} className="grow">
                            <div className="hover:underline truncate">
                                <div className="text-lg">
                                    {localEditor.level.name}
                                </div>
                                <div className="text-sm">
                                    {new Date(localEditor.updatedAt).toLocaleString("de-DE", { dateStyle: 'medium', timeStyle: 'short' })}
                                </div>
                            </div>
                        </Link>

                        <EditorContextMenu dialogs={{
                            "Delete Level": <EditorDeleteDialog id={localEditor.id} onClose={() => {}} />,
                        }}/>
                    </li>
                ))}
            </ul>

            <div className="mx-3 mt-2 mb-4">
                <LinkButton onClick={() => setModalOpen(true)}>
                    <PlusCircleIcon className="w-6"/>
                    <span>Create Level</span>
                </LinkButton>
            </div>

            {isModalOpen && <EditorCreateLevelDialog
                onClose={() => setModalOpen(false)}
            />}
        </div>
    );
}
