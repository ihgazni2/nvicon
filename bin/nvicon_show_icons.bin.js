#!/usr/bin/env node
const yargs = require('yargs');
const {show_available_icons} = require("../cli.js")

var fn = "./svg-icons.ts"
var pl = process.argv.slice(2)

show_available_icons(fn,pl)
