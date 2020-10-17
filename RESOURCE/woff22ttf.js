const fs = require("fs")
src = process.argv[2]

const wawoff = require('wawoff2');
var woff2 = fs.readFileSync(src)
var ttf = wawoff.decompress(woff2)
var p = ttf.then(
    r=> {
        let buf = Buffer.from(r)
        fs.writeFileSync(src.split(".")[0]+".ttf", buf);
    }
).then(r=>console.log(r))

