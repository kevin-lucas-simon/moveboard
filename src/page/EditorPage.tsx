import {NewLevel} from "../components/world/NewLevel";
import {Experience} from "../components/Experience";
import {UserControls} from "../components/UserControls";

export function EditorPage() {
    return (
        <UserControls>
            {/* TODO Übergreifendes Menü mit Permission-Abfrage -> dann erst <UserControls> einblenden! */}
            <Experience>
                <NewLevel startChunk={"FirstChunk"} />
            </Experience>
        </UserControls>
    );
}
