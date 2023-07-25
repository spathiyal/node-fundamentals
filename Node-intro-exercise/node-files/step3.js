const fs = require('fs');
const axios = require('axios');

function cat(path,outputLine) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`ERROR:Error reading ${path} ${err} `,)
            process.exit(1)
        }
        output(data,outputLine)
    })
}

async function webCat(url) {
    try {
        let res = await axios.get(url);
        output(res.data,outputLine)
    } catch (err) {
        console.log(`Error fetching ${url} - ${err}`);
        process.exit(1)
    }

}

let path;
let outputLine;
if (process.argv[2] === '--out') {
    outputLine = process.argv[3]
    path = process.argv[4]
}
else {
    path = process.argv[2]
}

if (path.slice(0, 4) === 'http') {
    webCat(path, outputLine);
  } else {
    cat(path, outputLine);
  }



function output(line,outputLine){
    if(outputLine){
        fs.writeFile(outputLine,line,'utf8',function(err){
            if(err){
                console.log(`error writing ${outputLine} - ${err}`);
                process.exit(1);
            };
        })
    }else{
        console.log(line)
    }
}