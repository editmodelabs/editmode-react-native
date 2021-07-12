import { storeCache, getCachedData, api } from "./utilities";
import { EditmodeContext } from "./EditmodeContext";
import EventEmitter from "react-native-eventemitter";
import { useEffect, useState, useContext } from "react";

export const useGetChunk = (identifier, field = "") => {
  const { projectId } = useContext(EditmodeContext);
  const [project, setProject] = useState(projectId);
  const [chunk, setChunk] = useState(undefined);

  function sendApiRequest(url, cachedChunk) {
    api
      .get(url)
      .then((res) => {
        storeCache(cacheId, res.data);
        if (!cachedChunk) {
          const parsedChunk = sanitizeContent(
            res.data,
            variables,
            fallbackChunk
          );
          setChunk(parsedChunk);
        }
      }) // Store chunk to localstorage
      .catch((error) => {
        console.warn(
          `Something went wrong trying to retrieve chunk data: ${error}. Have you provided the correct Editmode identifier (${
            identifier || contentKey
          }) as a prop to your Chunk component instance?`
        );
      });
  }

  const cacheId = identifier + project + field;

  useEffect(() => {
    if (!project && window && window["chunksProjectIdentifier"]) {
      setProject(window["chunksProjectIdentifier"]);
    }

    const cachedChunk = getCachedData(cacheId);
    if (cachedChunk) setChunk(JSON.parse(cachedChunk));

    let url = `chunks/${identifier}?project_id=${project}`;

    sendApiRequest(url, cachedChunk);
    EventEmitter.on("refreshChunk", () => sendApiRequest(url, null));
  }, [cacheId]);

  if (field && chunk && chunk.chunk_type == "collection_item") {
    field = field.toLowerCase();
    const fieldChunk = chunk.content.find(
      (c) =>
        c.custom_field_identifier.toLowerCase() == field ||
        c.custom_field_name.toLowerCase() == field
    );
    if (fieldChunk) {
      setChunk(fieldChunk);
    } else {
      console.error(
        `We can't find a ${identifier} content with ${field} field`
      );
      return "";
    }
  }

  return (chunk && chunk.content) || "";
};
