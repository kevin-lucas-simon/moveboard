import {BasePanel} from "../../component/BasePanel";
import {useEditorDispatcher, useEditorActiveStructure} from "../../reducer/EditorProvider";
import {EditorForm} from "../../form/EditorForm";
import {StructureDefault, StructureModel} from "../../../data/model/structure/StructureModel";

export function EditorStructureOverviewPanel() {
    const dispatcher = useEditorDispatcher();
    const structure = useEditorActiveStructure();

    if (!dispatcher || !structure) {
        return <span>No Structure given</span>
    }

    const updateStructure = (structure: StructureModel) => {
        dispatcher({
            type: "level_patch_structure",
            payload: structure,
        })
    }

    return (
        <BasePanel
            title={structure.name.trim() !== "" ? structure.name.trim() : structure.type}
            description={structure.type}
        >
            <EditorForm
                itemValue={structure}
                itemDefault={StructureDefault}
                onChange={updateStructure}
            />
        </BasePanel>
    );
}
