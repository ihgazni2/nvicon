var parser = require("./cssparser/dist/ngcssparser")
var p = new parser.CssParser()
var efdir = require("efdir")
var s = efdir.rfile("./woff2.css")
var ast = p.parse(s).ast
var d = JSON.parse(JSON.stringify(ast))
var nvjson = require("nvjson")
var tree = nvjson.jobj2tree(d)
var sdfs = tree.$sdfs()

var arr= sdfs.filter(r=>r.val)
var arr= arr.filter(r=>r.val.strValue)
var arr= arr.filter(r=>r.val.strValue.includes(`base64`) && !r.val.strValue.includes(`url`))
var arr = arr.map(r=>r.val.strValue)

var dataurl = require("dataurl")

function dcd_dataurl(r) {
    let d = dataurl.parse(r)
    return(d.data)

}

arr = arr.map(dcd_dataurl)
arr.forEach((r,i)=>{fs.writeFileSync("aowsome."+i+".woff2",r)})
