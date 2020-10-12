var ast=require("./ast.js")
var data = "<svg></svg>"
var d=ast.creat()
console.log(ast.gen(d))
d = ast.add_icon_to_ast(d,['arrow'],'left',data)
d = ast.add_icon_to_ast(d,['arrow'],'right',data)
d = ast.add_icon_to_ast(d,['arrow'],'up',data)
d = ast.add_icon_to_ast(d,['arrow'],'down',data)
console.log(ast.gen(d))

d = ast.add_icon_to_ast(d,['creature','animal'],'tiger',data)
d = ast.add_icon_to_ast(d,['creature','animal'],'lion',data)
console.log(ast.gen(d))


d = ast.add_icon_to_ast(d,['creature',],'animal',data)
d = ast.add_icon_to_ast(d,[],'creature',data)
