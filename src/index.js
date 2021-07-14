// @ts-check

export { Editmode } from "./Editmode.jsx";
export { Chunk } from "./Chunk.jsx";
export { ChunkCollection } from "./ChunkCollection.jsx";
export { ChunkFieldValue } from "./ChunkFieldValue.jsx";
export { useChunk } from "./useChunk";
export { useGetChunk } from "./useGetChunk";
export { useText } from "./useText";
import EventEmitter from "react-native-eventemitter";

function refreshChunks() {
  EventEmitter.emit("refreshChunk");
}

export { refreshChunks };
