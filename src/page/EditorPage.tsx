import {Level} from "../experience/world/Level";
import {Environment} from "../experience/Environment";
import {useLevelDownloader} from "../experience/world/hook/useLevelDownloader";
import {JsonObjectEditor} from "../component/editor/JsonObjectEditor";

export function EditorPage() {
    const editorLevel = "TestLevel";
    const editorChunk = "FirstChunk";

    const downloadedLevel = useLevelDownloader(editorLevel);
    const downloadedChunk = downloadedLevel?.chunks[editorChunk];

    if (!downloadedLevel || !downloadedChunk) {
        return <></>;
    }

    return (
        <div className="flex h-full">
            <div className="flex-none w-96 bg-gray-400 overflow-y-scroll">
                <h1>
                    <span className="text-3xl font-semibold">
                        {downloadedChunk.name}
                    </span>
                    <span className="text-lg">
                        {downloadedLevel.name}
                    </span>
                </h1>

                <ul>
                    {downloadedChunk.elements.map(element =>
                        <li className="mt-2">
                            {Object.entries(element).map(([key, value]) => (
                                <JsonObjectEditor keyword={key} value={value} />
                            ))}
                        </li>
                    )}
                </ul>
            </div>
            <div className="grow">
                <Environment>
                    {downloadedLevel &&
                        <Level {...downloadedLevel} start={editorChunk} />
                    }
                </Environment>
            </div>
        </div>
    );
}
