

import { storeCache, getCachedData, api } from './utilities'
import { EditmodeContext } from "./EditmodeContext"
import { useEffect, useState, useContext } from 'react'

export const useGetChunk = (identifier, field = "") => {
    const { projectId } = useContext(EditmodeContext);
    const [project, setProject] = useState(projectId)
    const [chunk, setChunk] = useState(undefined);

    const cacheId = identifier + project + field;

    useEffect(() => {
        if (!project && window && window["chunksProjectIdentifier"]) {
            setProject(window["chunksProjectIdentifier"])
        }

        const cachedChunk = getCachedData(cacheId);
        if (cachedChunk) setChunk(JSON.parse(cachedChunk))

        let url = `chunks/${identifier}?project_id=${project}`;

        api
            .get(url)
            .then((res) => {
                const error = res.data.error || res.data.message
                if (!error) {
                    storeCache(cacheId, res.data);
                    if (!cachedChunk) setChunk(res.data)
                }
            })
            .catch((error) => console.error(error, identifier, field)); // Set error state
    }, [cacheId])

    if (field && chunk && chunk.chunk_type == "collection_item") {
        field = field.toLowerCase()
        const fieldChunk = chunk.content.find(c =>
            c.custom_field_identifier.toLowerCase() == field || c.custom_field_name.toLowerCase() == field
        )
        if (fieldChunk) {
            setChunk(fieldChunk)
        } else {
            console.error(`We can't find a ${identifier} content with ${field} field`)
            return ""
        }
    }

    return chunk && chunk.content || ""
}