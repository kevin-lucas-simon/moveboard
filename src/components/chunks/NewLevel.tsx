import {deserialize} from "../serializer/serialize";
import {BasicBlock} from "../blocks/BasicBlock";
import * as React from "react";
import {FloorBlock} from "../blocks/FloorBlock";
import {BarrierBlock} from "../blocks/BarrierBlock";
import {WallWithHoleStructure} from "../../data/TestLevel/structure/WallWithHoleStructure";
import {TunnelChunk} from "../../data/TestLevel/chunks/TunnelChunk";
import {BouncerBlock} from "../blocks/BouncerBlock";
import {NewChunk} from "./NewChunk";
import {OrbitControls} from "@react-three/drei";
import {useEffect, useState} from "react";

export type NewLevelProps = {
    start: string,
}

export function NewLevel(props: NewLevelProps) {
    const [chunkData, setChunkData]
        = useState<{[key: string]: string}>({});
    const [chunkObjects, setChunkObjects]
        = useState<{[key: string]: React.ReactNode}>({});

    // TODO eigentlich wäre hier JSON als Grundstruktur für die Serialisierung und Deserialisierung sinnvoll?
    // TODO vlt die Serializer Klasse mit JSON und String Input überladen?
    useEffect(() => {
        fetch(window.location.origin+'/chunk/TestChunk.json')
            .then((response) => response.text())
            .then((data) => {
                console.log("data", data);
                setChunkData({
                    "TestChunk": data
                });
            })
    }, []);

    useEffect(() => {
        console.log(chunkData);
        if (chunkData["TestChunk"]) {
            const TestChunk = deserialize(chunkData["TestChunk"], {
                components: {
                    [BasicBlock.name]: BasicBlock as React.ComponentType,
                    [NewChunk.name]: NewChunk as React.ComponentType,
                    [FloorBlock.name]: FloorBlock as React.ComponentType,
                    [BarrierBlock.name]: BarrierBlock as React.ComponentType,
                    [WallWithHoleStructure.name]: WallWithHoleStructure as React.ComponentType,
                    [TunnelChunk.name]: TunnelChunk as React.ComponentType,
                    [BouncerBlock.name]: BouncerBlock as React.ComponentType,
                }
            })
            console.log(TestChunk);
            setChunkObjects({
                "TestChunk": TestChunk
            });
        }
    }, [chunkData]);


    return (
        <>
            {Object.keys(chunkObjects).map((key) => chunkObjects[key])}

            {/* TODO yoo die Kamera soll einfach die Maße vom aktiven Chunk bekommen und danach sich ausrichten, fertig */}
            <OrbitControls />
        </>
    );
}
