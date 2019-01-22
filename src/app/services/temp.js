var fetchedData = [{
    id: 'lagos',
    name: 'food',
    check: 'one'
},
{
    id: 'lagos',
    name: 'food',
    check: 'four'
},
{
    id: 'kaduna',
    name: 'sand',
    check: 'three'
},
{
    id: 'lagos',
    name: 'food',
    check: 'four'
},
];


var flags = [], output = [], l = fetchedData.length, i;
for (i = 0; i < l; i++) {
    if (flags[fetchedData[i].id]) continue;
    flags[fetchedData[i].id] = true;
    output.push(fetchedData[i].id);
}
console.log(output);

// var flags1 = [], output1 = [], l = fetchedData.length, i;
// for (i = 0; i < l; i++) {
//     if (flags1[fetchedData[i].check]) continue;
//     flags1[fetchedData[i].check] = true;
//     output1.push(fetchedData[i].check);
// }
// console.log(output1);

var result1 = [];
output.forEach((key, i) => {
    var count = [], len = fetchedData.length, j;
    for (j = 0; j < len; j++) {
        if (fetchedData[i].id == key) {
            result1[i] = { "name": key, "series": { "name": fetchedData[i].name } }
        }
    }
})
console.log(result1);

var count = [], len = output.length, j;
for (j = 0; j < len; j++) {
    var temp = fetchedData.reduce((acc, cur) => cur.id === output[j] ? ++acc : acc, 0);
    count.push(temp)
}

console.log(count);

var result = [];
output.forEach((op, i) => result[i] = { "name": op, "value": count[i] });
console.log(result);
