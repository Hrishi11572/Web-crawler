const { sortPages } = require('./report.js');
const { test , expect } = require('@jest/globals'); 

// testing 
test('sortPages' , () =>{
    const input = {
        'https://wagslane.dev': 3 ,
        'https://wagslane.dev/path0': 10, 
        'https://wagslane.dev/path1': 2,
        'https://wagslane.dev/path2': 9,
        'https://wagslane.dev/path3': 4,
    }; 
    const actual = sortPages(input); 
    const expected = [
        ['https://wagslane.dev/path0' , 10],
        ['https://wagslane.dev/path2', 9],
        ['https://wagslane.dev/path3', 4],
        ['https://wagslane.dev' , 3],
        ['https://wagslane.dev/path1', 2]
    ];  

    expect(actual).toEqual(expected); 
});