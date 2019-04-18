/* eslint-disable no-console */
/* eslint-disable no-undef */
'use strict';

const fs = require('fs');

const readKeys = (obj, result) => {

    // verifying if the content is null and starting the object
    if(result === null)
        result = {
            properties: {}
        };

    const keys = Object.keys(obj);
    
    keys.forEach( (key) => {
        if( typeof obj[key] === 'object') {
            result[key] = {
                properties: {}
            };
            readKeys(obj[key], result[key]);
        } else {
            // testing
            result.properties[key] = '';
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
    const result = readKeys(jsonModel, null);
    // console.log(result);
    writeSchema(result);
}
