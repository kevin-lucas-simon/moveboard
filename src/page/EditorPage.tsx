import {NewLevel} from "../components/world/NewLevel";
import {Experience} from "../components/Experience";
import {UserControls} from "../components/UserControls";
import {useLevelDownloader} from "../components/world/hook/useLevelDownloader";

export function EditorPage() {
    const downloadedLevel
        = useLevelDownloader("TestLevel");

    return (
        <UserControls>
            {/* TODO Übergreifendes Menü mit Permission-Abfrage -> dann erst <UserControls> einblenden! */}
            <Experience>
                {downloadedLevel && <NewLevel {...downloadedLevel} />}
            </Experience>
        </UserControls>
    );
}
