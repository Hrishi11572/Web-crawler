const { JSDOM } = require('jsdom'); // allows us to access DOM apis 

async function crawlPage(baseURL , currentURL , pages){
    const baseURLObj = new URL(baseURL); 
    const currentURLObj = new URL(currentURL); 

    if(baseURLObj.hostname !== currentURLObj.hostname){
        return pages; 
    }

    const normalizedCurrentURL = normalizeURL(currentURL); 
    if(pages[normalizedCurrentURL] > 0){
        pages[normalizedCurrentURL]++; 
        return pages; //object 
    }

    pages[normalizedCurrentURL] = 1; 
    console.log(`actively crawling ${currentURL}`); 



    try{
        const resp = await fetch(currentURL); 
        
        if (resp.status > 399){
            console.log(`error in fetch with status code ${resp.status} on page ${currentURL}`);
            return pages; 
        }

        const contentType = resp.headers.get("content-type"); 
        if(!contentType.includes('text/html')){
            console.log(`non html response, content type: ${contentType}, on page: ${currentURL}`); 
            return pages; 
        }
        
        const htmlBody = await resp.text(); 

        const nextURLs = getURLsFromHTML(htmlBody , baseURL); 

        for(const nextURL of nextURLs){
            pages = await crawlPage(baseURL , nextURL , pages); 
        }

    }catch(err){
        console.log(`error in fetch: ${err.message}, on page: ${currentURL}`); 
    }

    return pages; 
}

function getURLsFromHTML(htmlBody , baseURL){
    const urls = [];
    const dom = new JSDOM(htmlBody); 
    const linkElements = dom.window.document.querySelectorAll('a'); 

    for(const linkElement of linkElements){
        if(linkElement.href.slice(0 , 1) == '/'){
            // relative 

            try{
                const urlObject = new URL(`${baseURL}${linkElement.href}`) ; 
                urls.push(urlObject.href);
            }catch(err){
                console.log(`error with relative url: ${err.message}`); 
            }
            
        }else{
            // absolute 
            try{
                const urlObject = new URL(linkElement.href) ; 
                urls.push(urlObject.href);
            }catch(err){
                console.log(`error with absolute url: ${err.message}`); 
            }
        }
    }

    return urls; 
}

function normalizeURL(urlString){
    const urlObject = new URL(urlString); // auto lowercase 
    // strip the last slash if present 
    const hostPath = `${urlObject.hostname}${urlObject.pathname}`;
    if(hostPath.length > 0 && (hostPath.slice(-1) == '/')){
        return hostPath.slice(0,-1); 
    }
    
    return hostPath; 
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}