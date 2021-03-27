export function addTransactionData(obj, parentKey, key, val) {
    if(obj[parentKey] == null){
        obj[parentKey] = {}
    }
    obj[parentKey][key] = val
}
