import {StructureModel} from "../../../../data/model/structure/StructureModel";
import {EditorStructureBaseSlug} from "../slug/EditorStructureBaseSlug";
import {StructureTypes} from "../../../../data/model/structure/StructureTypes";
import {EditorStructureSectionSlug} from "../slug/EditorStructureSectionSlug";
import {SectionModel} from "../../../../data/model/structure/system/SectionModel";
import React from "react";
import {EditorStructureChunkSlug} from "../slug/EditorStructureChunkSlug";
import {UUID} from "../../../../data/model/UUID";

export type EditorStructureItemProps = {
    structure: StructureModel;
    isStart: boolean;
    isSelected: boolean;
    onCollapseToggle: () => void;
    onRename: (id: UUID, name: string) => void;
    onSelect: () => void;
    children?: React.ReactNode;
}

export function EditorStructureItem(props: EditorStructureItemProps) {
    const handleCollapseToggle = () => {
        if (props.structure.type === StructureTypes.Section) {
            props.onCollapseToggle();
        }
    }

    const handleRename = (name: string) => {
        props.onRename(props.structure.id, name);
    }

    return (
        <li className={props.isSelected ? "bg-gray-500/10 "  : ""}>
            <div
                onClick={props.onSelect}
                className="flex group hover:bg-gray-500/10 px-4 py-1.5 items-center"
            >
                <div className="grow flex gap-2">
                    {(() => {
                        switch (props.structure.type) {
                            case StructureTypes.Section:
                                return <EditorStructureSectionSlug
                                    structure={props.structure as SectionModel}
                                    onCollapse={handleCollapseToggle}
                                    onExpand={handleCollapseToggle}
                                    onRename={handleRename}
                                />;
                            case StructureTypes.Chunk:
                                return <EditorStructureChunkSlug
                                    structure={props.structure}
                                    isStart={props.isStart}
                                    onRename={handleRename}
                                />;
                            default:
                                return <EditorStructureBaseSlug
                                    structure={props.structure}
                                    onRename={handleRename}
                                />;
                        }
                    })()}
                </div>
            </div>
            {props.children && props.structure.type === StructureTypes.Section && !(props.structure as SectionModel).collapsed && (
                <div className="ml-6">
                    {props.children}
                </div>
            )}
        </li>
    );
}
