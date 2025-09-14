import React from "react";

export type EditorContentBarType = {
    leftMenu: React.ReactNode;
    rightMenu?: React.ReactNode;
    mainView: React.ReactNode;
}

export function EditorContentBar(props: EditorContentBarType) {
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
