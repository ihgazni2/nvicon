const parse = require('@babel/parser').parse
const _gen = require('@babel/generator').default
const nvjson=require('nvjson')

const {
    set_dflt$cfg_with_pl$and$name,
}  = require("./cmmn.js")



function gen(ast) {
    return(_gen(ast).code)
}


function get_ast$without$loc$info(code_str) {
    let ast= parse(code_str,{sourceType:'module',ranges:false,plugins:['typescript','decorators-legacy']})
    let tree = nvjson.jobj2tree(ast)
    let sdfs = tree.$sdfs()
    sdfs.forEach(
        r=>{
            try {
                delete r.val.loc
                delete r.val.start
                delete r.val.end
            } catch(err) {
            }
        }
    )
    let nast = tree.val
    return(nast.program)
}


function new_global$ast() {
    let d = {
       type: 'Program',
       sourceType: 'module',
       interpreter: null,
       body: [],
       directives: []
    }
    return(d)
}

function creat_string$literal$ast(s) {
    let rs = JSON.stringify(`${s}`)
    let d =  {
        type: 'StringLiteral',
        extra: { rawValue: s, raw: rs },
        value: s
    }
    return(d)
}

function new_icon$name$type$ast(){
    let s = '{"type":"ExportNamedDeclaration","exportKind":"type","specifiers":[],"source":null,"declaration":{"type":"TSTypeAliasDeclaration","id":{"type":"Identifier","name":"IconName"},"typeAnnotation":{"type":"TSUnionType","types":[{"type":"TSLiteralType","literal":{"type":"NumericLiteral","extra":{"rawValue":18446744073709552000,"raw":"18446744073709552000"},"value":18446744073709552000}},{"type":"TSLiteralType","literal":{"type":"NumericLiteral","extra":{"rawValue":18446744073709552000,"raw":"18446744073709552000"},"value":18446744073709552000}}]}}}'
    return(JSON.parse(s))
}


function creat_icon$name$type$ast_with_name$strs(name_strs) {
    let d = new_icon$name$type$ast()
    name_strs = name_strs.map(r=>creat_string$literal$ast(r))
    d.declaration.typeAnnotation.types = d.declaration.typeAnnotation.types.concat(name_strs)
    return(d)
}

function add_type_to_icon$name$type$ast_with_name$str(d,name_str) {
    name_str = creat_string$literal$ast(name_str)
    d.declaration.typeAnnotation.types.push(name_str)
    return(d)
}

function rm_type_from_icon$name$type$ast_with_name$str(d,name$str) {
    d.declaration.typeAnnotation.types = d.declaration.typeAnnotation.types.filter(r=>r.literal.value!==name$str)
    return(d)
}

function new_cfg$type$ast() {
    let d = {"type":"ExportNamedDeclaration","exportKind":"type","specifiers":[],"source":null,"declaration":{"type":"TSTypeAliasDeclaration","id":{"type":"Identifier","name":"Cfg"},"typeAnnotation":{"type":"TSUnionType","types":[{"type":"TSTypeLiteral","members":[{"type":"TSIndexSignature","parameters":[{"type":"Identifier","name":"key","typeAnnotation":{"type":"TSTypeAnnotation","typeAnnotation":{"type":"TSStringKeyword"}}}],"typeAnnotation":{"type":"TSTypeAnnotation","typeAnnotation":{"type":"TSTypeReference","typeName":{"type":"Identifier","name":"Cfg"}}}}]},{"type":"TSStringKeyword"}]}}}
    return(d)
}


function new_icon$intf$ast() {
    let d = {"type":"ExportNamedDeclaration","exportKind":"type","specifiers":[],"source":null,"declaration":{"type":"TSInterfaceDeclaration","id":{"type":"Identifier","name":"IconIntf"},"body":{"type":"TSInterfaceBody","body":[{"type":"TSPropertySignature","key":{"type":"Identifier","name":"name"},"computed":false,"typeAnnotation":{"type":"TSTypeAnnotation","typeAnnotation":{"type":"TSTypeReference","typeName":{"type":"Identifier","name":"IconName"}}}},{"type":"TSPropertySignature","key":{"type":"Identifier","name":"data"},"computed":false,"typeAnnotation":{"type":"TSTypeAnnotation","typeAnnotation":{"type":"TSStringKeyword"}}}]}}}
    return(d)
}


function new_icon$ast() {
    let d = {"type":"ExportNamedDeclaration","exportKind":"value","specifiers":[],"source":null,"declaration":{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"alarm","typeAnnotation":{"type":"TSTypeAnnotation","typeAnnotation":{"type":"TSTypeReference","typeName":{"type":"Identifier","name":"IconIntf"}}}},"init":{"type":"ObjectExpression","properties":[{"type":"ObjectProperty","method":false,"key":{"type":"Identifier","name":"name"},"computed":false,"shorthand":false,"value":{"type":"StringLiteral","extra":{"rawValue":"","raw":"''"},"value":""}},{"type":"ObjectProperty","method":false,"key":{"type":"Identifier","name":"data"},"computed":false,"shorthand":false,"value":{"type":"StringLiteral","extra":{"rawValue":"","raw":"''"},"value":""}}]}}],"kind":"const"}}
    return(d)
}


function creat_icon$ast_with_name$str$and$data$str(name_str,data_str) {
    let d = new_icon$ast()
    d.declaration.declarations[0].id.name = name_str
    d.declaration.declarations[0].init.properties[0].value = creat_string$literal$ast(name_str)
    d.declaration.declarations[0].init.properties[1].value = creat_string$literal$ast(data_str)
    return(d)
}

function new_cfg$ast() {
    let d = {"type":"ExportNamedDeclaration","exportKind":"value","specifiers":[],"source":null,"declaration":{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"cfg","typeAnnotation":{"type":"TSTypeAnnotation","typeAnnotation":{"type":"TSAnyKeyword"}}},"init":{"type":"ObjectExpression","properties":[]}}],"kind":"const"}}
    return(d)
}


function creat() {
    let d = new_global$ast()
    let icon_name_type = creat_icon$name$type$ast_with_name$strs([])
    d.body.push(icon_name_type)
    let icon_intf = new_icon$intf$ast()
    d.body.push(icon_intf)
    let cfg_intf = new_cfg$type$ast()
    d.body.push(cfg_intf)
    let cfg = new_cfg$ast()
    d.body.push(cfg)
    return(d)
}

function get_icon$name$type$ast(d) {
    let icon_name_type = d.body.filter(r=>r.declaration.type==="TSTypeAliasDeclaration")[0]
    return(icon_name_type)
}

function get_icon$index_with_name$str(d,name_str) {
    let index = d.body.findIndex(
        r=>(
            (r.declaration.type==="VariableDeclaration") && 
            (r.declaration.declarations[0].id.typeAnnotation.typeAnnotation.typeName.name === 'IconIntf') &&
            (r.declaration.declarations[0].id.name === name_str) 
        )
    )
    return(index)
}

function get_cfg$ast(d) {
    let cfgnj = d.body.filter(
        r=>(r.declaration.type==="VariableDeclaration") && (r.declaration.declarations[0].id.typeAnnotation.typeAnnotation.type === 'TSAnyKeyword')
    )[0]
    return(cfgnj)
}


function get_cfg$ast$index(d) {
    let index = d.body.findIndex(
        r=>(
            (r.declaration.type==="VariableDeclaration") &&
            (r.declaration.declarations[0].id.typeAnnotation.typeAnnotation.type === 'TSAnyKeyword')
        )
    )
    return(index)
}

function rm_cfg$ast(d) {
    let index = get_cfg$ast$index(d)
    d.body.splice(index,1)
    return(d)
}

function add_icon_to_ast_with_internal$name$str$and$data$str(d,name_str,data_str) {
    let icon = creat_icon$ast_with_name$str$and$data$str(name_str,data_str)
    d.body.push(icon)
    let icon_name_type = get_icon$name$type$ast(d)
    add_type_to_icon$name$type$ast_with_name$str(icon_name_type,name_str)
    return(d)
}

function rm_icon_from_ast_with_internal$name$str(d,internal_name_str) {
    let index = get_icon$index_with_name$str(d,internal_name_str)
    d.body.splice(index,1)
    let icon_name_type = get_icon$name$type$ast(d)
    rm_type_from_icon$name$type$ast_with_name$str(icon_name_type,internal_name_str)
    return(d)
}



function get_cfg_from_ast(ast) {
    let nj = get_cfg$ast(ast).declaration.declarations[0].init
    let cd = gen(nj)
    let d;
    eval('d='+cd)
    return(d)
}

function is_empty_dir(cfg,full_pl) {
    let internal_name;
    let arr;
    try {
        arr = get_all$internal$name$strs_with_full$pl_from_cfg(cfg,full_pl)
    } catch(err) {
        return({cond:true,names:[]})
    }
    if(arr.length === 0) {
        return({cond:true,names:[]})
    } else if(arr.length === 1) {
        return({cond:true,names:arr})
    } else {
        return({cond:false,names:arr})
    }
}

function get_all$internal$name$strs_with_full$pl_from_cfg(cfg,pl) {
    let d = cfg
    for(let i=0;i<pl.length;i++) {
        let k = pl[i]
        d = d[k]
    }
    if(d===undefined) {
        throw('conflict with internal name !')
    } else {
        let sdfs = nvjson.jobj2tree(d).$sdfs()
        let name_strs = sdfs.filter(r=>r.$is_leaf())
        name_strs = name_strs.map(r=>r.val)
        name_strs = name_strs.filter(r=>r!==undefined)
        return(name_strs)
    }
}



function add_icon_to_ast(ast,pl,name_str,data_str) {
    let cfg = get_cfg_from_ast(ast)
    let {cond,names} = is_empty_dir(cfg,pl.concat(name_str))
    if(cond){
        ast= rm_cfg$ast(ast)
        let rslt = set_dflt$cfg_with_pl$and$name(cfg,pl,name_str)
        let internal_name = rslt.curr
        ast = add_icon_to_ast_with_internal$name$str$and$data$str(ast,internal_name,data_str)
        let prev_internal_name = rslt.prev
        if(prev_internal_name!== undefined){
            ast = rm_icon_from_ast_with_internal$name$str(ast,prev_internal_name)
        } else {
        }
        let cfgnj = get_ast$without$loc$info('export const cfg:any ='+JSON.stringify(cfg)).body[0]
        ast.body.push(cfgnj)
        return(ast)
    } else {
        throw('cfg.'+pl.concat(name_str).join('.')+' is a dir ,first remove it')
    }
}

function rm_icon_from_ast(ast,full_pl,force) {
    let cfg = get_cfg_from_ast(ast)
    let {cond,names} = is_empty_dir(cfg,full_pl)
    if(cond || force) {
        ast= rm_cfg$ast(ast)
        let internal_names = names
        let tree = nvjson.jobj2tree(cfg)
        let sdfs = tree.$sdfs()
        for(let i=0;i<internal_names.length;i++){
            let internal_name = internal_names[i]
            ast = rm_icon_from_ast_with_internal$name$str(ast,internal_name)
            let icon_cfg = sdfs.filter(r=>r.$is_leaf() && r.val === internal_name)[0]
            icon_cfg.$disconn()
        }
        cfg = nvjson.tree2jobj(tree)
        let cfgnj = get_ast$without$loc$info('export const cfg:any ='+JSON.stringify(cfg)).body[0]
        ast.body.push(cfgnj)
        return(ast)
    } else {
        throw('cfg.'+full_pl.join('.')+' is a dir ,remove it with --force')
    }
}

function get_svg_from_icon$ast(nj) {
    let svg = declaration.declarations[0].init.properties[1].value.value
    return(svg)
}

function get_all_svg$dict_from_ast(ast) {
    let svgs = ast.body.filter(r=>r.declaration.type==='VariableDeclaration' && r.declaration.declarations[0].id.name !== 'cfg')
    let d = {}
    svgs.forEach(
        r=>{
            let k = r.declaration.declarations[0].init.properties[0].value.value
            let v = r.declaration.declarations[0].init.properties[1].value.value
            d[k] = v
        }
    )
    return(d)
}


function get_svg_from_ast_with_internal$name(ast,internal$name) {
    let svgd = get_all_svg$dict_from_ast(ast)
    return(svgd[internal$name])
}


function get_selector_from_com$str(s){
    try{
        let t = get_ast$without$loc$info(s)
        let selector = t.body[1].declaration.decorators[0].expression.arguments[0].properties[0].value.value
        return(selector)
    } catch(err) {
        return("svg-icons")
    }
}


module.exports = {
    gen,
    get_ast$without$loc$info,
    new_global$ast,
    creat_string$literal$ast,
    new_icon$name$type$ast,
    creat_icon$name$type$ast_with_name$strs,
    add_type_to_icon$name$type$ast_with_name$str,
    rm_type_from_icon$name$type$ast_with_name$str,
    new_cfg$type$ast,
    new_icon$intf$ast,
    new_icon$ast,
    creat_icon$ast_with_name$str$and$data$str,
    new_cfg$ast,
    creat,
    get_icon$name$type$ast,
    get_icon$index_with_name$str,
    get_cfg$ast,
    get_cfg$ast$index,
    rm_cfg$ast,
    get_all$internal$name$strs_with_full$pl_from_cfg,
    add_icon_to_ast_with_internal$name$str$and$data$str,
    rm_icon_from_ast_with_internal$name$str,
    get_cfg_from_ast,
    is_empty_dir,
    add_icon_to_ast,
    rm_icon_from_ast,
    get_svg_from_icon$ast,
    get_all_svg$dict_from_ast,
    get_svg_from_ast_with_internal$name,
    get_selector_from_com$str,
}
