import React from "react";
import {useEditorActiveStructure} from "../reducer/EditorProvider";
import {EditorPanelComponents, EditorPanelComponentTypes} from "./EditorPanelComponents";

export type EditorPanelsProps = {
    panelOverride?: EditorPanelComponentTypes|undefined;
}

export function EditorPanelCanvas(props: EditorPanelsProps) {
    const structure = useEditorActiveStructure();
    const panel = props.panelOverride ?? structure?.type;
    if (!panel) {
        return <></>;
    }

    const overviewPanel = React.createElement(
        EditorPanelComponents[panel]?.overviewPanel
    );

    const mainView = React.createElement(
        EditorPanelComponents[panel]?.mainPanel
    );

    const inspectorDefinition = EditorPanelComponents[panel]?.detailPanel
    const inspectorComponent = inspectorDefinition
        ? React.createElement(inspectorDefinition)
        : undefined;

    return (
        <EditorPanelCanvasLayout
            leftMenu={overviewPanel}
            rightMenu={inspectorComponent}
            mainView={mainView}
        />
    );
}

type EditorPanelCanvasLayoutProps = {
    leftMenu: React.ReactNode;
    rightMenu?: React.ReactNode;
    mainView: React.ReactNode;
}
function EditorPanelCanvasLayout(props: EditorPanelCanvasLayoutProps) {
    return (
        <div className="grow h-full flex overflow-hidden z-10">
            {(props.leftMenu || props.rightMenu) &&
                <div className="h-full flex py-4">
                    <div className="shrink-0 -mr-4 rounded-2xl bg-white z-10 drop-shadow flex">
                        {props.leftMenu &&
                            <div className="w-56">
                                {props.leftMenu}
                            </div>
                        }
                        {props.rightMenu &&
                            <div className="w-56 shadow-xl rounded-2xl">
                                {props.rightMenu}
                            </div>
                        }
                    </div>
                </div>
            }
            <div className="grow rounded-l-3xl overflow-hidden">
                {props.mainView}
            </div>
        </div>
    );
}