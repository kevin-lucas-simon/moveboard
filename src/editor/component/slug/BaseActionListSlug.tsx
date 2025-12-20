import {Popover, PopoverButton, PopoverPanel} from "@headlessui/react";
import {EllipsisVerticalIcon} from "@heroicons/react/24/outline";
import {BasicDropdownItem} from "../../../component/dropdown/BasicDropdownItem";

export function BaseActionListSlug(props: {
    options: {[key: string]: () => void};
}) {
    return (
        <Popover className="relative">
            <PopoverButton className="p-2 rounded-full hover:bg-gray-500/10">
                <EllipsisVerticalIcon className="w-4"/>
            </PopoverButton>
            <PopoverPanel
                anchor="bottom end"
                className="z-20 w-40 rounded-xl bg-white shadow-lg drop-shadow-xl text-nowrap ring-1 ring-black/5 overflow-hidden"
            >
                {Object.keys(props.options).map((key) => (
                    <BasicDropdownItem key={key} onClick={props.options[key]}>
                        {key}
                    </BasicDropdownItem>
                ))}
            </PopoverPanel>
        </Popover>
    );
}
