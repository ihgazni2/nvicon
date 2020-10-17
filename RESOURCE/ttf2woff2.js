const fs = require("fs")
src = process.argv[2]
var ttf = fs.readFileSync(src);
const wawoff = require('wawoff2');
var woff2 = wawoff.compress(ttf)
var p = woff2.then(
    r=> {
        let buf = Buffer.from(r)
        fs.writeFileSync(src.split(".")[0]+".woff2", buf);
    }
).then(r=>console.log(r))

