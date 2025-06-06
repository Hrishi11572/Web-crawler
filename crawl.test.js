const { normalizeURL , getURLsFromHTML } = require('./crawl.js');
const {test , expect} = require('@jest/globals'); 

// testing 

test('normalizeURL strip protocol' , () =>{
    const input = "https://blog.boot.dev/path"; 
    const actual = normalizeURL(input); 
    const expected = "blog.boot.dev/path"; 

    expect(actual).toEqual(expected); 
});

test('normalizeURL strip trailing slash' , () =>{
    const input = "https://blog.boot.dev/path/"; 
    const actual = normalizeURL(input); 
    const expected = "blog.boot.dev/path"; 

    expect(actual).toEqual(expected); 
});

test('normalizeURL capitals' , () =>{
    const input = "https://BLOG.boot.dev/path/"; 
    const actual = normalizeURL(input); 
    const expected = "blog.boot.dev/path"; 

    expect(actual).toEqual(expected); 
});

test('normalizeURL strip http' , () =>{
    const input = "http://BLOG.boot.dev/path/"; 
    const actual = normalizeURL(input); 
    const expected = "blog.boot.dev/path"; 

    expect(actual).toEqual(expected); 
});


test('getURLsFromHTML absolute' , () =>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href = "https://blog.boot.dev">
                Boot.dev's Blog 
            </a>
        </body>
    </html>
    `; 
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody , inputBaseURL); 
    const expected = ["https://blog.boot.dev/"];
    expect(actual).toEqual(expected); 
});


 test('getURLsFromHTML relative' , () =>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href = "invalid">
                invalid url 
            </a>
        </body>
    </html>
    `; 
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody , inputBaseURL); 
    const expected = [];
    expect(actual).toEqual(expected); 
});


 test('getURLsFromHTML both' , () =>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href = "/path1/">
                Boot.dev's Blog path 1
            </a>
            
            <a href = "https://blog.boot.dev/path2/">
                Boot.dev's Blog path 2 
            </a> 
        </body>
    </html>
    `; 
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody , inputBaseURL); 
    const expected = ["https://blog.boot.dev/path1/" , "https://blog.boot.dev/path2/"];
    expect(actual).toEqual(expected); 
});
