const fs = require('fs');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`ERROR:Error reading ${path} ${err} `,)
            process.exit(1)
        }
        console.log("DATA", data)
    })
}


cat(process.argv[2]);