var FPARSER = {};

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
	this.size=function(){
		return this.stac.length;
	}
	this.print=function(){
		var line = "";
		for (var i = 0; i < this.stac.length; i++) {
			line += this.stac[i].name + " ";
		};
		console.log(line);
	}
}

FPARSER.mul = function(op1, op2, ccounter, scounter) {
	return "\tfloat F" + scounter++ + " = " + op1.name + " * " + op2.name + ";\n";
}

FPARSER.add = function(op1, op2, ccounter, scounter){
	return "\tfloat F" + scounter++ + " = " + op1.name + " + " + op2.name + ";\n";
}

FPARSER.sub = function(op1, op2, ccounter, scounter) {
	return "\tfloat F" + scounter++ + " = " + op1.name + " - " + op2.name + ";\n";
}

FPARSER.pow = function(op1, op2, ccounter, scounter) {
	return "\tfloat F" + scounter++ + " = pow(" + op1.name + ", " + op2.name + ".0);\n";
}

FPARSER.mount = function(op, op1, op2, ccounter, scounter) {
	//console.log(op,op1.type,op1.name,op2.type,op1.name);
	var c = "";
	switch(op){
		case '*': c += FPARSER.mul(op1,op2,ccounter,scounter);
			  break;
		case '+': c += FPARSER.add(op1,op2,ccounter,scounter);
			  break;
		case '-': c += FPARSER.sub(op1,op2,ccounter,scounter);
			  break;
		case '^': c += FPARSER.pow(op1,op2,ccounter,scounter);
			  break;
	}
	return c;
};

FPARSER.parse = function(expression) {
	var header = "float F(float X, float Y)\n{\n";
	var code = "";
	var stack = new Stack();
	var ccounter = 0;
	var scounter = 0;

	var node1 = math.parse(expression);

	node1.traverse(function(node, path, par) {
				switch (node.type) {
					case 'OperatorNode': //console.log(node.type, node.op);
							     node.name = node.op; break;
					case 'ConstantNode': //console.log(node.type, node.value); 
							     node.name = node.value; break;
					case 'SymbolNode':   node.name = node.name.toUpperCase();
							     console.log(node.type, node.name);  
							     if(node.name != 'X' && node.name != 'Y'){
							     	node.type == 'ConstantNode';
							     }
							     break;
					default:             //console.log(node.type, node.name);
				}

				stack.push(node);
				//stack.print();
				var oldSize = -1;
				while(!stack.empty() && stack.size() != oldSize){
					oldSize = stack.size();
					if(stack.size() < 3)
						break;
					var op2 = stack.top(); 
					if(op2.type != 'SymbolNode' && op2.type != 'ConstantNode')
						break;
					stack.pop();
					var op1 = stack.top(); 
					if(op1.type != 'SymbolNode' && op1.type != 'ConstantNode'){
						stack.push(op2);
						break;
					}
					stack.pop();
					var op = stack.top(); stack.pop();
					code += FPARSER.mount(op.name, op1, op2, ccounter, scounter);

					op.type = 'SymbolNode';
					op.name = "F" + scounter++;
					stack.push(op);
				}
				//stack.print();
	});
	
	code += "\treturn F" + (scounter-1) + ";\n}\n";
	//console.log(code);
	return header + code;
};

FPARSER.parseConstants = function(expression) {
	var set = new Set();

	var node1 = math.parse(expression);

	node1.traverse(function(node, path, par) {
				switch (node.type) {
					case 'SymbolNode':   node.name = node.name.toUpperCase();
							     console.log(node.type, node.name);  
							     if(node.name != 'X' && node.name != 'Y'){
							     	set.add(node.name);
							     	node.type == 'ConstantNode';
							     }
							     break;
					default:
				}
	});

	return set;
};