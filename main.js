const { crawlPage } = require('./crawl.js'); 
const { printReport } = require('./report.js'); 

async function main(){
    if(process.argv.length < 3){
        console.log("no website provided"); 
        process.exit(1); // error code 
    }

    if(process.argv.length > 3){
        console.log("too many command line args"); 
        process.exit(1); 
    }

    const baseURL = process.argv[2]; 
    // for(const arg of process.argv){
    //     console.log(arg); 
    // }

    console.log(`starting crawl of ${baseURL}`); 
    const pages = await crawlPage(baseURL , baseURL , {}); 
    //print the report 
    printReport(pages); 
}

main()