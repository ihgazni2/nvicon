#!/usr/bin/env node
const yargs = require('yargs');
const fs = require('fs')
const path = require("path");
const efdir = require('efdir')
const cli = require('../cli')


////初始化svg-icons.ts
var svg_fn = "./svg-icons.ts"
cli.creat_ast_and_write(svg_fn)



var fns = efdir.walkdir("./",efdir.WALK_FILTERS['only-file'])
fns = fns.map(r=>path.basename(r))
fns = fns.map(r=>r.split('.'))

function group_fns(fns) {
    //按照当前文件夹下文件名分组
    let d = {}
    for(let i=0;i<fns.length;i++) {
        let fn = fns[i]
        let k = fn[0]
        if(k in d){
            d[k].push(fn)
        } else {
            d[k] = [fn]
        }
    }
    for(k in d) {
        let v = d[k]
        v = v.filter(r=>r.includes('component'))
        if(v.length>2){

        } else {
            delete d[k]
        }
    }
    return(d)
}

fns = group_fns(fns)
var fn;
try{
    //取第一组
    fn = Object.keys(fns)[0]
} catch (err) {
    fn = "svg-icons"
}
fn = fn?fn:"svg-icons"

//删除不必要的html 和 css
var html_fn = fn +'.component.html'
var css_fn = fn + '.component.css'
try {
    fs.unlinkSync(html_fn)
    fs.unlinkSync(css_fn)
} catch (err) {
}
//////////////////////////

//创建component模板
if(Object.keys(fns).length>0){
    var ts_fn = fn +'.component.ts'
    var ts = cli.creat_component(fn) 
    fs.writeFileSync(ts_fn,ts)
}


