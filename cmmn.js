function dcp(o) {
    return(JSON.parse(JSON.stringify(o)))
}


function gen_guid() {
    return(
        '$xxxxxxxx$xxxx$4xxx$yxxx$xxxxxxxxxxxx'.replace(
            /[xy]/g,
            function(c) {
                let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8)
                return(v.toString(16))
            }
         )
    )
}



function set_dflt$cfg_with_pl$and$name(cfg,pl,name) {
    let cond = (typeof(name) === 'string')
    if(cond){
        let d = cfg
        for(let i=0;i<pl.length;i++) {
            let k = pl[i]
            if(typeof(k) === 'string') {
                let cond = (d[k] !== undefined)
                if(cond) {
                    d = d[k]
                    if(typeof(d) !== 'string'){
                        
                    } else {
                        throw('cfg.'+pl.slice(0,i+1).join('.')+' is already a icon')
                    }
                } else {
                    d[k] = {}
                    d= d[k]
                }
            } else {
                throw('key must be string')
            }
        }
        let prev = d[name]
        d[name] = gen_guid()
        return({prev:prev,curr:d[name],path:pl.concat([name])})
    } else {
        throw('name must be string')
    }
}


function get_with_pl(cfg,pl) {
    let d = cfg
    for(let i=0;i<pl.length;i++) {
        d = d[pl[i]]
    }
    return(d)
}

module.exports = {
    dcp,
    gen_guid,
    get_with_pl,
    set_dflt$cfg_with_pl$and$name,
}
