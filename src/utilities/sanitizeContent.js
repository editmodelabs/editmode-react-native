export const sanitizeContent = (data, variables, fallbackChunk) => {
  let chunk = {...data};
  const tokens = (chunk.content.match(/\{{(.*?)\}}/g)|| []).map(t => t.substr(2, t.length-4))
  
  let isVariableSafe = true;
  if (tokens) {
    tokens.forEach(function(token) {
      const value = variables && variables[token] || ""
      chunk.content = chunk.content.replace(`{{${token}}}`, value);
      if (!value) isVariableSafe = false;
    });
  }

  if ( !isVariableSafe && fallbackChunk) {
    chunk = sanitizeContent(fallbackChunk, variables, null)
  }

  return chunk
}
