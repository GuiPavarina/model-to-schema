/**
 * TODO
 */
const rootObjectInitializer = () => {
    return {
        $schema: 'http://json-schema.org/draft-07/schema#',
        type: 'object',
        properties: {}
    }
}

/**
 * TODO
 * @param {} value 
 */
const getPrimitiveType = (value) => {
    const o = {
        type: typeof value
    }
    if( typeof value === 'object') {
        o.properties = {}
    }
    return o;
}

module.exports = {
    rootObjectInitializer,
    getPrimitiveType
}
