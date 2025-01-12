import React from "react";

export type BaseTabProps = {
    children?: React.ReactNode;
    title: string;
    description?: string;
    button?: React.ReactNode|string;
    onButtonClick?: () => void;
}
export function BaseTab(props: BaseTabProps) {
    return (
        <div className="w-full h-full flex flex-col">
            <h2 className="text-xl pt-4 px-4">Test Play</h2>
            <div className="grow h-0 overflow-y-auto">
                {props.description &&
                    <p className="text-sm px-4 py-2">
                        {props.description}
                    </p>
                }
                {props.children}
            </div>
            {props.button &&
                <button
                    className="flex w-full hover:bg-gray-500/10 px-4 py-2 gap-2 border-t border-gray-500/10 items-center"
                    onClick={props.onButtonClick}
                >
                    {props.button}
                </button>
            }
        </div>
    );
}
