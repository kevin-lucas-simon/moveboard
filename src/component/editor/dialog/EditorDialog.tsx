import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import React from 'react'

export type EditorDialogProps = {
    title: string,
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode,
}
export function EditorDialog(props: EditorDialogProps) {
    return (
        <>
            <Dialog open={props.isOpen} as="div" className="relative z-10 focus:outline-none" onClose={props.onClose}>
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
                            <div className="mt-4">
                                <Button
                                    onClick={props.onClose}
                                    className="inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm text-white bg-gray-700 hover:bg-gray-600 open:bg-gray-700"
                                >
                                    Close
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
