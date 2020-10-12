#!/usr/bin/env node
const yargs = require('yargs');
const {rm_icon,group_args} = require("../cli.js")

var fn = "./svg-icons.ts"

var args = process.argv.slice(2)
var paramd = group_args(args)

var force = ('force' in paramd)
var full_pl = paramd.path

rm_icon(fn,full_pl,force=force)
