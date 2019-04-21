/* eslint-disable no-console */
/* eslint-disable no-undef */
/**
 * TODO
 */
const rootObjectInitializer = () => {
    return {
        $schema: 'http://json-schema.org/draft-07/schema#',
        $id: 'http://example.com/root.json',
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
        type: (value === null) ? "null" : (Array.isArray(value)) ? 'array' : typeof value
    }
    if( typeof value === 'object' && value !== null && !Array.isArray(value)) {
        o.properties = {}
    } else if (Array.isArray(value)) {
        o.items = {}
    }
    return o;
}

/**
 * 
 * JSON Logger Method
 * 
 * @param {*} identifier 
 * @param {*} json 
 */
const logger = (identifier, json) => {
    console.log(identifier, JSON.stringify(json, null, 2));
}

module.exports = {
    rootObjectInitializer,
    getPrimitiveType,
    logger,
}
