function printReport(pages){
    console.log("============================="); 
    console.log("REPORT"); 
    console.log("============================="); 

        const sortedPages = sortPages(pages);
        for(const sortedPage of sortedPages){
            const url = sortedPage[0]; 
            const hits = sortedPage[1]; 

            console.log(`Found ${hits} links to page: ${url}`);
        }

    console.log("============================="); 
    console.log("END REPORT"); 
    console.log("============================="); 
        
}



function sortPages(pages){
    pagesArray = Object.entries(pages);
    pagesArray.sort((a,b)=>{
        aaHits = a[1]; 
        bHits = b[1]; 

        return b[1] - a[1]; // positive or negative values 
    }) 

    return pagesArray; 
}


module.exports = {
    sortPages, 
    printReport
}