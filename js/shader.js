var SHADER = {};

SHADER.fromScript = function(gl, id){
	var shaderScript = document.getElementById(id);
	if (!shaderScript)
		throw("Error: bad script" + id);
	
	var shaderSource = "";
	shaderSource = shaderScript.text;

  	var shaderType;
	if (shaderScript.type == "x-shader/x-vertex")
		shaderType = gl.VERTEX_SHADER;
	else if (shaderScript.type == "x-shader/x-fragment")
		shaderType = gl.FRAGMENT_SHADER;
	else {
		throw("*** Error: unknown shader type");
		return null;
	}

    	var shader = gl.createShader(shaderType);
    	gl.shaderSource(shader, shaderSource);
    	gl.compileShader(shader);
    	
	var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    	if (!compiled) {
    		var error = gl.getShaderInfoLog(shader);
    		throw("*** Error compiling shader '" + shader + "':" + error);
    		gl.deleteShader(shader);
    		return null;
    	}
    
    	return shader;
}

SHADER.fromSource = function(gl, shaderSource, shaderType){
    	var shader = gl.createShader(shaderType);
    	gl.shaderSource(shader, shaderSource);
    	gl.compileShader(shader);
    	
	var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    	if (!compiled) {
    		var error = gl.getShaderInfoLog(shader);
    		throw("*** Error compiling shader '" + shader + "':" + error);
    		gl.deleteShader(shader);
    		return null;
    	}
    
    	return shader;
}

SHADER.Shader = function(gl, vs_source, fs_source){
	//var vertexShader = SHADER.fromScript(gl, vs_source);
	//var fragmentShader = SHADER.fromScript(gl, fs_source);
	var vertexShader = SHADER.fromSource(gl, vs_source, gl.VERTEX_SHADER);
	var fragmentShader = SHADER.fromSource(gl, fs_source, gl.FRAGMENT_SHADER);
	this.program = createProgram(gl, [vertexShader, fragmentShader]);
};

SHADER.ShaderFromFile = function(gl, vs_source, fs_source){
	var vertexShader = SHADER.fromSource(gl, vs_source, gl.VERTEX_SHADER);
	var fragmentShader = SHADER.fromSource(gl, fs_source, gl.FRAGMENT_SHADER);
	this.program = createProgram(gl, [vertexShader, fragmentShader]);
}

SHADER.Shader.prototype.loadText = function(gl, vs_source, fs_source){
	var vertexShader = SHADER.fromSource(gl, vs_source, gl.VERTEX_SHADER);
	var fragmentShader = SHADER.fromSource(gl, fs_source, gl.FRAGMENT_SHADER);
	this.program = createProgram(gl, [vertexShader, fragmentShader]);
}

SHADER.Shader.prototype.getLocation = function(gl, attr){
	return gl.getAttribLocation(this.program, attr);
};

SHADER.Shader.prototype.start = function(gl){
	gl.useProgram(this.program);
};

SHADER.Shader.prototype.stop = function(gl){
	gl.useProgram(null);
};

SHADER.Shader.prototype.setUniform2f = function(gl, name, v){
	var l = gl.getUniformLocation(this.program, name);
	gl.uniform2f(l, v[0], v[1]);
};


SHADER.Shader.prototype.setUniform1f = function(gl, name, v){
	var l = gl.getUniformLocation(this.program, name);
	gl.uniform1f(l, v);
};
