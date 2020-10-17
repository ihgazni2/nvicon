const fs=require("fs")
const opentype = require('opentype.js');
fn = process.argv[2]
t = opentype.loadSync(fn)
fs.writeFileSync(fn.split(".")[0]+".name.json",t.glyphNames.names)
