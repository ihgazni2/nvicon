#!/usr/bin/env node
const yargs = require('yargs');
const {export_svg,group_args} = require("../cli.js")
const efdir = require('efdir')
const path=require('path')
const svg = require("../svg.js")
const cli = require('../cli.js')


var srcfn = "./svg-icons.ts"  //源路径

var args = process.argv.slice(2)
var paramd = group_args(args)
var dstfn
try{
    dstfn = paramd.dst[0]   //指定输出的文件夹X   ./X/...   默认./exported-svg-icons
} catch(err) {
}
dstfn = (dstfn === undefined)? "./exported-svg-icons":dstfn

var full_pl = paramd.path //cfg path-list 默认为[]
full_pl = (full_pl === undefined)?[]:full_pl

cli.export_svg(srcfn,full_pl,dstfn)






