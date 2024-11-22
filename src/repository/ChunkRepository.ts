import {ReactComponentSerializer} from "../service/ReactComponentSerializer";
import {allBlocks} from "../components/blocks/allBlocks";
import {Chunk, ChunkProps} from "../components/chunks/Chunk";
import React from "react";

export class ChunkRepository {
    private baseUrl = window.location.origin + '/chunk/';
    private serializer = new ReactComponentSerializer();

    // TODO add IndexedDB logic https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
    // TODO vlt wäre Dexie sinnvoll? https://dexie.org/

    async get(name: string): Promise<React.ReactElement<ChunkProps>> {
        // fetch data
        const responseRaw = await fetch(this.baseUrl + name + '.json');
        const responseText = await responseRaw.text();

        // deserialize the component
        const serializedComponent = this.serializer.deserializeComponent(responseText, {
            components: {
                ...allBlocks,
                [Chunk.name]: Chunk as React.ComponentType,
            }
        });

        return serializedComponent;
    }

    // TODO add save method with IndexedDB

    // TODO add upload method with IndexedDB clear
}
