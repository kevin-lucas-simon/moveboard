import {Dialog, DialogBackdrop, DialogPanel, DialogTitle} from '@headlessui/react'
import React from 'react'
import {BasicButton} from "../button/BasicButton";

export type EditorDialogProps = {
    isOpen: boolean,
    title: string,
    closeButton?: string,
    submitButton?: string,
    onClose: () => void,
    onSubmit?: () => void,
    isDisabled?: boolean,
    children: React.ReactNode,
}
export function BasicDialog(props: EditorDialogProps) {
    return (
        <Dialog open={props.isOpen} as="div" className="relative z-10 focus:outline-none" onClose={props.onClose}>
            <DialogBackdrop className="fixed inset-0 bg-black/50" />
            <form>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-6">
                        <DialogPanel
                            transition
                            className="w-full max-w-lg rounded-xl bg-gray-50 p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-xl mb-2">
                                {props.title}
                            </DialogTitle>
                            <div className="text-sm space-y-2">
                                {props.children}
                            </div>
                            <div className="mt-4 space-x-2 text-right">
                                <BasicButton variant={!props.submitButton ? "primary" : "secondary"}
                                             onClick={props.onClose}>
                                    {props.closeButton ?? "Close"}
                                </BasicButton>
                                {props.submitButton &&
                                    <BasicButton
                                        variant={"primary"}
                                        type={"submit"}
                                        onClick={props.onSubmit}
                                        disabled={props.isDisabled}
                                    >
                                        {props.submitButton}
                                    </BasicButton>
                                }
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </form>
        </Dialog>
    )
}
