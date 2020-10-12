#!/usr/bin/env node
const yargs = require('yargs');
const {add_icon,group_args} = require("../cli.js")
const efdir = require('efdir')
const path=require('path')
const svg = require("../svg.js")
const  https=require("https");
const  http=require("http");

var fn = "./svg-icons.ts"

var args = process.argv.slice(2)

var paramd = group_args(args)
var name = paramd.name      //指定文件名 用作cfg leaf-key 
var full_pl = paramd.path  //cfg  path-list
var data = paramd.svg[0]   //svg  源
var type = 'file'          //data svg 源类型默认是 文件路径
try {
    type = paramd.type[0]
} catch(err) {

}

if(name !== undefined) {
    full_pl = full_pl.concat(name) //非默认文件名 用作cfg leaf-key
} else {
    //没有指定name
    if(type === "str") {
        //如果类型是字符串
        //那么full_pl 中的最后一个就是name
        //此时不需要任何额外操作
        //比如 -path role creater -svg "<svg>...</svg>"
        //cfg path full_pl [role,creater]
    } else {
        //data文件名
        //输入路径中不包括svg文件名
        //例如 -path role  -svg /x/y/creater.svg
        //此时full_pl = [role]
        //data = /x/y/zzz.svg
        //所以要得到文件名
        //然后拼接成 cfg path full_pl [role,creater]
        name = path.basename(data).split('.')[0] 
        full_pl = full_pl.concat(name)
    }
}
/*
if(type === "str") {
    //data直接就是数据
} else {
    //data为svg文件路径,读取svg
    data = efdir.rfile(data)
}

data = svg.rm_hw(data)  //格式化

add_icon(fn,full_pl,data)

*/

function run(fn,data,full_pl) {
    try {
        var urld = new URL(data)
        var hget = (urld.protocol === "http")?http.get:https.get
        hget(data,function(res){
            var rslt = ""
            res.on("data",function(r){//
                let s = r.toString()
                rslt = rslt +s
            })
            res.on("end",function(r){//
                rslt = svg.rm_hw(rslt)
                add_icon(fn,full_pl,rslt)
            })
        });
    } catch (err) {
        if(type === "str") {
            //data直接就是数据
        } else {
            //data为svg文件路径,读取svg
            data = efdir.rfile(data)
            data = svg.rm_hw(data)
            add_icon(fn,full_pl,data)
        }
    }
}

run(fn,data,full_pl)
