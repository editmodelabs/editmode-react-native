export const sanitizeContent = (data, variables, fallbackChunk) => {
  const parsedChunk = { ...data, content: data.content };
  const tokens = (chunk.content.match(/\{{(.*?)\}}/g)|| []).map(t => t.substr(2, t.length-4))
  
  let isVariableSafe = true;
  if (tokens) {
    tokens.forEach(function(token) {
      const value = variables && variables[token] || ""
      parsedChunk.content = parsedChunk.content.replace(`{{${token}}}`, value);
    });

    if (!value) isVariableSafe = false;
  }

  if ( !isVariableSafe && fallbackChunk) {
    parsedChunk.content = fallbackChunk.content
  }

  return parsedChunk
}
