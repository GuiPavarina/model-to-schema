/* eslint-disable no-console */
/* eslint-disable no-undef */
'use strict';

const fs = require('fs');

const utils = require('./util');

const readKeys = (obj, result, path) => {

    // verifying if the content is null and starting the object
    if(result === null)
        result = utils.rootObjectInitializer();

    if( path === null)
        path = '#';

    const keys = Object.keys(obj);
   
    keys.forEach( (key) => {
        
        let $id = path + '/properties' + '/' + key

        // since the beginning of JS: null === 'object'
        // weird, but there it is
        if( typeof obj[key] === 'object' && obj[key] !== null) {           
            result.properties[key] = {}
            result.properties[key] = utils.getPrimitiveType(obj[key], $id);
            readKeys(obj[key], result.properties[key], $id);
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
    fs.writeFileSync(process.argv[2].split('.')[0] + '.schema.json', JSON.stringify(schema, null, 2));
}

module.exports = () => {
    const jsonModel = getJsonFile();
    const result = readKeys(jsonModel, null, null);
    // console.log(result);
    writeSchema(result);
}
