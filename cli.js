const fs = require('fs')
const efdir = require('efdir')
const ast=require("./ast.js")
const cmmn=require('./cmmn.js')
const nvjson=require('nvjson')
const tem = require('./tem')


function get_selector_from_com$file(ts_fn) {
    let s = efdir.rfile(ts_fn)
    let selector = ast.get_selector_from_com$str(s)
    return(selector)
}


function creat_component(fn) {
    let cls_name = fmt_component_name(fn)
    let ts_fn = fn+".component.ts"
    selector = get_selector_from_com$file(ts_fn) 
    let tem=`
import {
    Component,
    OnInit,
    ElementRef,
    ChangeDetectionStrategy,
    Input,
    ViewChild,
    AfterViewInit,
    Renderer2,
} from '@angular/core';

import * as svg_icons  from "./svg-icons"

@Component({
    selector: '${selector}',
    template: "<div #svg></div>",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ${cls_name} implements OnInit,AfterViewInit {
    @Input() name:string;
    @Input() width:string;
    @Input() height:string;
    @ViewChild('svg') svg_div:ElementRef
    constructor(
        private render:Renderer2
    ){}
    ngOnInit(): void {}
    ngAfterViewInit() {
        this.svg_div.nativeElement.innerHTML = svg_icons.get_svg_with_name(svg_icons,this.name) || null;
        this.render.setStyle(this.svg_div.nativeElement,'width',this.width);
        this.render.setStyle(this.svg_div.nativeElement,'height',this.height);
    }
}
`
    return(tem)
}

function load_ast_from_code(s) {
    let d = ast.get_ast$without$loc$info(s)
    return(d)
}

function load_ast_from_file(fn) {
    let s = efdir.rfile(fn)
    let d = load_ast_from_code(s)
    return(d)
}

function creat_ast_and_write(fn) {
    let d=ast.creat()
    let s = ast.gen(d)
    efdir.wfile(fn,tem.func + '\n' +s)
}

function add_icon(fn,full_pl,data) {
    let d = load_ast_from_file(fn)
    let pl = full_pl.slice(0,full_pl.length-1)
    let name = full_pl[full_pl.length-1]
    d = ast.add_icon_to_ast(d,pl,name,data)
    let s = ast.gen(d)
    efdir.wfile(fn,s)
}
function rm_icon(fn,full_pl,force) {
    let d = load_ast_from_file(fn)
    d = ast.rm_icon_from_ast(d,full_pl,force)
    let s = ast.gen(d)
    efdir.wfile(fn,s)
}


function export_svg(srcfn,full_pl,dstfn) {
    let d = load_ast_from_file(srcfn)
    let svgd = ast.get_all_svg$dict_from_ast(d)
    let cfg = ast.get_cfg_from_ast(d)
    let subcfg = cmmn.get_with_pl(cfg,full_pl)
    let entries = nvjson.flatten_to_entries(subcfg)
    entries.forEach(
        r => {
            let cond = (typeof(r[1]) === 'string')
            if(cond) {
                let pls = JSON.parse(r[0])
                pls[pls.length -1] = pls[pls.length -1]+'.svg' 
                r[0] = JSON.stringify(pls)
                r[1] = svgd[r[1]]
            }
        }
    )
    let jcfg = nvjson.deflatten_from_entries(entries)
    efdir.json_to_dir(jcfg,dstfn)
    return(jcfg)
}




function show_available_icons(fn,pl) {
    let d = load_ast_from_file(fn)
    let cfg = ast.get_cfg_from_ast(d)
    let entries = nvjson.flatten_to_entries(cfg)
    let leafs = entries.filter(r=>(typeof(r[1])==='string'))
    let ks = leafs.map(r=>r[0])
    ks = ks.map(r=>JSON.parse(r).join("."))
    let path = pl.join('.')
    if(pl.length===0){

    } else {
        ks = ks.filter(
            s=>(
                s.substr(0,path.length)===path && 
                (s[path.length] === '.' || s.length === path.length)
            )
        )
    }
    console.log(ks)
}

function upper_initial(s) {
    s = s[0].toUpperCase()+s.substr(1)
    return(s)
}

function fmt_component_name(fn){
    let arr = fn.split('-')
    arr = arr.map(
        r=> upper_initial(r)
    )
    return(arr.join("")+'Component')
}

function group_args(args) {
    let d = {}
    let curr = undefined;
    for(let i=0;i<args.length;i++) {
        let k = args[i]
        if(k[0]=='-') {
            k = k.replace(/^[\-]+/g,'')
            d[k] = []
            curr = d[k]
        } else {
            curr.push(k)
        }
    }
    return(d)
}


function str_to_bool(s) {
    s = s[0].toLowerCase()
    if(s==='t' || s==='y') {
        return(true)
    } else {
        return(false)
    }
}



module.exports = {
    get_selector_from_com$file,
    creat_component,
    load_ast_from_code,
    load_ast_from_file,
    creat_ast_and_write,
    add_icon,
    rm_icon,
    show_available_icons,
    upper_initial,
    fmt_component_name,
    group_args,
    str_to_bool,
    export_svg,
}
