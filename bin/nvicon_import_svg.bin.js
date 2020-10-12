#!/usr/bin/env node
const yargs = require('yargs');
const {export_svg,group_args,add_icon} = require("../cli.js")
const efdir = require('efdir')
const path=require('path')
const svg = require("../svg.js")
const cli = require('../cli.js')
const nvjson = require('nvjson')

var dstfn = "./svg-icons.ts"  //源路径

var args = process.argv.slice(2)
var paramd = group_args(args)


var srcfn = paramd.src[0]
srcfn = path.resolve(srcfn)

var d = efdir.dir_to_json(srcfn,{copy_content:true})
var entries = nvjson.flatten_to_entries(d)
entries = entries.filter(r=>(typeof(r[1])==='string'))
var pls = entries.map(r=>JSON.parse(r[0]))


var fns = pls.map(r=>efdir.pl_to_path(r))


var full_pl = paramd.path //cfg path-list 默认为[]
full_pl = (full_pl === undefined)?[]:full_pl
var cfg_path = full_pl.join(path.sep)

fns = fns.map(r=>path.join(cfg_path,r))

var cfg_pls = fns.map(r=>efdir.path_to_pl(r))


cfg_pls.forEach(
    (r,i)=>{
        let data = entries[i][1]
        r[r.length-1] = (r[r.length-1]).split('.')[0]
        data = svg.rm_hw(data)
        add_icon(dstfn,r,data)
    }
)







