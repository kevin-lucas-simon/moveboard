import {BaseTab} from "../../component/BaseTab";
import {useEditorDispatcher, useEditorActiveStructure} from "../../reducer/EditorProvider";
import {JsonObjectEditor} from "../../component/input/JsonObjectEditor";

export function EditorStructureOverviewPanel() {
    const dispatcher = useEditorDispatcher();
    const structure = useEditorActiveStructure();

    if (!dispatcher || !structure) {
        return <span>No Structure given</span>
    }

    const handleStructureChange = (key: string, value: any) => {
        dispatcher({
            type: "level_patch_structure",
            payload: {
                id: structure.id,
                [key]: value,
            }
        })
    }

    return (
        <BaseTab
            title={structure?.type + " Overview"}
            description={structure?.name && structure.name.trim() !== "" ? (structure.name.length > 30 ? structure.name.slice(0, 30) + "..." : structure.name) : "No name"}
        >
            <ul>
                {Object.entries(structure).map(([key, value]) =>
                    <JsonObjectEditor
                        keyName={key}
                        value={value}
                        onChange={handleStructureChange}
                    />
                )}
            </ul>
        </BaseTab>
    );
}
