const _ = require('lodash')

function stringTypeCheck(...args){
    for (const value of args) {
        if(typeof value !== 'string') return false;
    }
    return true;
}

function fetchGracePeriodLogicFromMapping(cardId, mapping) {
    if (!stringTypeCheck(cardId, mapping)) return null;
    const mappingArr = mapping.split(';').reverse();

    for (const value of mappingArr) {
        const temp = value.split(':');
        if (temp.length > 1) {
            const mappingKey = temp[0].trim();
            const ids = temp[1].split(',');
            if (ids.find(id => id.trim() === cardId)) {
                return mappingKey;
            }
        }
    }
    return null;
}

module.exports = fetchGracePeriodLogicFromMapping
