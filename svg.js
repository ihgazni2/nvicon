const nvhtml = require('nvhtml')

function rm_hw(s) {
    s=s.replace(/[\r\n]/g,'')
    let rt = new nvhtml.Html(s)
    let sdfs = rt.$sdfs()
    let svg = sdfs.filter(r=>r.tag==='svg')[0]
    try {
        delete svg.attribs.width
        delete svg.attribs.height
    } catch(err) {
    }
    svg =svg.stringify()
    //svg=svg.replace(/[\r\n]/g,'')
    //escape
    //svg = JSON.stringify(svg)
    return(svg)
}


module.exports = {
    rm_hw
}
