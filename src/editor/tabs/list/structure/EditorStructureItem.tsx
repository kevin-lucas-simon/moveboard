import {StructureModel} from "../../../../data/model/structure/StructureModel";
import {EditorStructureSlug} from "./slug/EditorStructureSlug";
import {StructureTypes} from "../../../../data/model/structure/StructureTypes";
import {EditorSectionSlug} from "./slug/EditorSectionSlug";
import {SectionModel} from "../../../../data/model/structure/system/SectionModel";
import React from "react";

export type EditorStructureItemProps = {
    structure: StructureModel;
    isActive: boolean;
    isStart: boolean;
    isSelected: boolean;
    onCollapseToggle: () => void;
    onSelect: () => void;
    children?: React.ReactNode;
}

export function EditorStructureItem(props: EditorStructureItemProps) {
    const handleCollapseToggle = () => {
        if (props.structure.type === StructureTypes.Section) {
            props.onCollapseToggle();
        }
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
                                return <EditorSectionSlug
                                    structure={props.structure as SectionModel}
                                    onCollapse={handleCollapseToggle}
                                    onExpand={handleCollapseToggle}
                                />;
                            default:
                                return <EditorStructureSlug
                                    structure={props.structure}
                                    isStart={props.isStart}
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
