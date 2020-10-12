var nvhtml = require('nvhtml')
var efdir=require('efdir')
var path = require('path')
var https=require("https");
var http=require("http");


var word = process.argv[2]







function creat_entry_url(n) {
    let tem = `https://www.flaticon.com/search/${n}?word=${word}`
    return(tem)
}

function get_total_page_num(sdfs){
    let ele = sdfs.filter(r=>r.attribs.id==="pagination-total")[0]
    let text = ele.$children()[0].text.trim()
    return(parseInt(text))
}


function get_dld_arr(sdfs) {
    var imgs = sdfs.filter(r => (r.tag === "img"))
    imgs = imgs.filter(
        r=> {
            let cond = false
            for(let k in r.attribs) {
                if(r.attribs[k].includes('svg')){cond = true}
            }
            return(cond)
        }
    )
    imgs = imgs.filter(r=>r.attribs.srcset)
    
    var arr = imgs.map(
        r=>{
            let src = r.attribs.srcset
            src = src.split(' ')[0]
            let title = r.attribs.title || r.attribs.alt
            title = title.split(/[ ]+/g).filter(r=>(r.toLowerCase()!=="icon" && r.toLowerCase()!=="free" && r.toLowerCase()!=="bear")).join('_').toLowerCase()
            return({
                src,
                cls:title,
                id: path.parse(path.parse(src).dir).name + '_' + path.parse(src).name
            })
        }
    )
    return(arr)
}

function dld_one_page(n) {
    let url = creat_entry_url(n)
    
    https.get(url,function(res){
        var html_txt = ""
        res.on("data",function(r){//
            let s = r.toString()
            html_txt = html_txt +s
        })
        res.on("end",function(r){//
            var tree = new nvhtml.Html(html_txt)
            var sdfs = tree.$sdfs()
            var arr = get_dld_arr(sdfs)
            efdir.wjson(n+'.json',arr)
        })
    });
}


function dld_all_pages() {
    let url = creat_entry_url(1)
    https.get(url,function(res){
        var html_txt = ""
        res.on("data",function(r){//
            let s = r.toString()
            html_txt = html_txt +s
        })
        res.on("end",function(r){//
            var tree = new nvhtml.Html(html_txt)
            var sdfs = tree.$sdfs()
            var n = get_total_page_num(sdfs)
            for(let i =0;i<n;i++){
                dld_one_page(i)
            }
        })
    });
}

dld_all_pages()
