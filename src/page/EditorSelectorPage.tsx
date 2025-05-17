import {useLevelOverviewDownloader} from "../repository/useLevelOverviewDownloader";

export function EditorSelectorPage() {
    const levelOverview = useLevelOverviewDownloader();

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">
                Editor Selection Screen
            </h1>
            {levelOverview && levelOverview.map((level) => (
                <div key={level.id}>
                    <a href={`/editor/${level.id}`} className="hover:underline">
                        {level.name}
                    </a>
                </div>
            ))}
            {/* new */}
            <div className="mt-4">
                <a href="/editor/NewLevel" className="hover:underline">
                    Create New Level
                </a>
            </div>
        </>
    );
}
