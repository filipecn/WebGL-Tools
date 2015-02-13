var IAPARSER = {};

function Stack() {
	this.stac=new Array();
	this.pop=function(){
		return this.stac.pop();
	}
	this.push=function(item){
		this.stac.push(item);
	}
	this.top=function(){
		return this.stac[this.stac.length-1];
	}
	this.empty=function(){
		return this.stac.length == 0;
	}
}

IAPARSER.mul = function(op1, op2, vcounter) {
	if(op1.type == 'ConstantNode' && op2.type == 'ConstantNode')
		return "\tfloat C" + vcounter++ + " = " + op1.name + "*" + op2.name + ";\n";
	if(op1.type == 'SymbolNode' && op2.type == 'SymbolNode')
		return "\tInterval R" + vcounter++ + " = Imul(" + op1.name + ", " + op2.name + ");\n";
	if(op1.type == 'SymbolNode' && op2.type == 'ConstantNode')
		return "\tInterval R" + vcounter++ + " = " + op1.name + " * vec2(" + op2.name + "," + op2.name + ");\n";
	return "\tInterval R" + vcounter++ + " = vec2(" + op1.name + "," + op1.name + ") * " + op2.name + ";\n";
}

IAPARSER.mount = function(op, op1, op2, vcounter) {
	console.log(op,op1.type,op1.name,op2.type,op1.name);
	var c = "";
	switch(op){
		case '*': c += IAPARSER.mul(op1,op2,vcounter);
			  break;
		case '/': c += "Idiv(" + op1.name + ", " + op2.name + ");\n";
			  break;
		case '^': c += "Isqr(" + op2.name + ");\n";
			  break;
	}
	return c;
};

IAPARSER.parse = function(expression) {
	var header = "Interval F(float x, float y, float w, float h)\n{\n";
	header += "\tInterval X = Interval(x-w,x+w);\n";
	header += "\tInterval Y = Interval(y-w,y+w);\n";
	var code = "";
	var stack = new Stack();
	var vcounter = 0;

	var node1 = math.parse(expression);

	node1.traverse(function(node, path, par) {
				switch (node.type) {
					case 'OperatorNode': //console.log(node.type, node.op);
							     node.name = node.op; break;
					case 'ConstantNode': //console.log(node.type, node.value); 
							     node.name = node.value; break;
					case 'SymbolNode':   node.name = node.name.toUpperCase();
							     //console.log(node.type, node.name);  
							     break;
					default:             //console.log(node.type, node.name);
				}

				if(node.type == 'ConstantNode' || node.type == 'SymbolNode'){
					if(!stack.empty()){
						var top = stack.top(); 
						if(top.type == 'ConstantNode' || top.type == 'SymbolNode'){
							stack.pop();
							var op = stack.top();  stack.pop();
							code += IAPARSER.mount(op.name, node, top, vcounter);
							
							node.type = 'SymbolNode';
							node.name = "R" + vcounter++;
						}
					}
				}
				stack.push(node);
	});

	while(!stack.empty()){
		var node = stack.top(); stack.pop();
		if(stack.empty()) break;
		var top = stack.top(); stack.pop();
		var op = stack.top(); stack.pop();

		code += IAPARSER.mount(op.name, node, top, vcounter);

		node.type = 'SymbolNode';
		node.name = "R" + vcounter++;
		stack.push(node);
	}

	code += "\treturn R" + (vcounter-1) + ";\n}\n";
	console.log(code);
	return header + code;
};
