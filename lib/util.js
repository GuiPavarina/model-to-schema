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
const getPrimitiveType = (value, id) => {
    const o = {
        $id: id,
        type: (value === null) ? null : typeof value
    }
    if( typeof value === 'object' && value !== null) {
        o.properties = {}
    }
    return o;
}

module.exports = {
    rootObjectInitializer,
    getPrimitiveType
}
