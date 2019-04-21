/* eslint-disable no-undef */
'use strict';

const fs = require('fs');

const utils = require('./util');

/**
 * 
 * @param {*} obj 
 * @param {*} result 
 * @param {*} path 
 */
const readKeys = (obj, result, path) => {

    // verifying if the content is null and starting the object
    if(result === null)
        result = utils.rootObjectInitializer();

    // starting root path
    if( path === null)
        path = '#';

    const keys = Object.keys(obj);
    
    keys.forEach( (key) => {
        
        const isArray = Array.isArray(obj[key]);

        let $id = path +  '/properties' + '/' + key;

        if( typeof obj[key] === 'object' && obj[key] !== null) {    
                
            result.properties[key] = {}
            result.properties[key] = utils.getPrimitiveType(obj[key], $id);
            
            if(isArray) {
                $id = $id + '/items'
                result.properties[key].items = utils.getPrimitiveType(obj[key][0], $id);
            }
            
            readKeys(
                isArray ? obj[key][0] : obj[key],
                isArray ? result.properties[key].items : result.properties[key],
                $id
            );


        } else {
            result.properties[key] = utils.getPrimitiveType(obj[key], $id );
        }
    });

    return result;
}

/**
 * TODO
 */
const getJsonFile = () => {

    let jsonModel = {};
    try {
        const raw = fs.readFileSync(process.argv[2]);
        jsonModel = JSON.parse(raw);
    } catch (error) {
        throw `${process.argv[2]} was not found :(`;
    }
    return jsonModel;
}

/**
 * TODO
 * @param {*} schema 
 */
const writeSchema = (schema) => {
    const file = process.argv[2].split('/');
    fs.writeFileSync(file[file.length-1].split('.')[0] + '.schema.json', JSON.stringify(schema, null, 2));
}

/**
 * Main function
 */
const generateSchema = () => {
    const result = readKeys(getJsonFile(), null, null);
    writeSchema(result);
}

module.exports = () => {
    generateSchema();
}
