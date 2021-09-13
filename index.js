const _ = require('lodash');

function stringTypeCheck(...args){
    for (const value of args) {
        if(typeof value !== 'string') return false;
    }
    return true;
}

function transformStringToSortedEntries(str){
    // 'base:124, 123 ;test:1234' => [ [ 'test', '1234' ], [ 'base', '124', '123' ] ]
    return str.split(';')
              .filter(el => el !== '')
              .map(el => el.split(/[,:]/g).map(el => el.trim()))
              .sort((a,b) => a.length - b.length);
}

function mappingObjFromEntries(arr){
    //[ [ 'test', '1234' ], [ 'base', '124', '123' ] ] => { test: [ '1234' ], base: [ '124', '123' ] }
    return _.mapValues(_.groupBy(arr, 0),
    outerList => outerList.flatMap(innerList => innerList.slice(1)));
}

function createObjFromSring(str){
    return mappingObjFromEntries(transformStringToSortedEntries(str));
}

function fetchGracePeriodLogicFromMapping (cardId, mapping) {
    if(!stringTypeCheck(cardId,mapping)) return null;

    const mappingObj = createObjFromSring(mapping);
    for (const key in mappingObj) {
        if(mappingObj[key].includes(cardId)){
            return key;
        }
    }
    return null
}

module.exports = fetchGracePeriodLogicFromMapping
