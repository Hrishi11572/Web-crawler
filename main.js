const { crawlPage } = require('./crawl.js'); 

function main(){
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
    crawlPage(baseURL); 
}

main()