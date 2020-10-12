const FUNC_CD_TEM =`
export function get_dict$val_with_pl(d:any,pl:string[]):any {
    for(let i=0;i<pl.length;i++) {
        d = d[pl[i]]
    }
    return(d)
}

export function name_to_internal$name(name:string):string {
    let pl = name.split(".")
    let iname = get_dict$val_with_pl(cfg,pl)
    return(iname)
}

export function get_svg_with_name(svg_icons:any,name:string):string {
    //import * as svg_icons from "./svg-icons"
    //const svg_icons = require("./svg-icons")
    //var svg_inner_html = get_svg_with_name(svg_icons,"role.creater"
    let iname = name_to_internal$name(name)
    return(svg_icons[iname].data)
}`


module.exports = {
    func:FUNC_CD_TEM
}
