var CLOTH = {};

CLOTH.data = function(){
	return {
			cur: [],
			last: [],
			swap: function() {
					var tmp = this.cur;
					this.cur = this.last;
					this.last = tmp;
				},
			print: function() {
				console.log("last " + this.last);
				console.log("cur " + this.cur);
			}
		};
};



CLOTH.Constraint = function(a, b, r){
	this.a = a;
	this.b = b;
	this.restlength = r;
};

CLOTH.Cloth = function(scene, w, h, l){
	//CLOTH PARAMETERS
	this.L = l || 10;
	this.NW = w || 20;
	this.NH = h || 20;
	this.pivot = [];
	var geometry = new THREE.Geometry();
	for(var x = 0; x < this.NW; x++)
		for(var z = 0; z < this.NH; z++){
			geometry.vertices.push(new THREE.Vector3(x*this.L, 150, z*this.L))
			this.pivot.push([false, new THREE.Vector3(0,0,0)]);
		}

	//SIMULATION DATA
	this.N = geometry.vertices.length;
	this.X = CLOTH.data();
	this.F = CLOTH.data();
	this.M = CLOTH.data();
	this.g = new THREE.Vector3(0,-10.0,0);
	this.timeStep = 0.15;
	for(var i = 0; i < this.N; i++){
		this.F.cur[i] = this.g.clone();
		this.X.cur[i] = geometry.vertices[i].clone();
		this.X.last[i] = geometry.vertices[i].clone();
		this.M.cur[i] = i*0.5;
	}
	this.iterationsNumber = 3;
	this.constraints = [];
	for(var i = 0; i < this.NW; i++)
		for(var j = 0; j < this.NH; j++){
			var d = 1;
			if(i < this.NW - d)
				this.constraints.push(new CLOTH.Constraint(this.index(i,j),this.index(i+d,j),d*this.L));
			if(j < this.NH - d)
				this.constraints.push(new CLOTH.Constraint(this.index(i,j),this.index(i,j+d),d*this.L));
			if(i < this.NW - d && j < this.NH - d)
				this.constraints.push(new CLOTH.Constraint(this.index(i,j),this.index(i+d,j+d),d*this.L*Math.sqrt(2.0)));
			if(i >= 0 + d && j < this.NH - d)
				this.constraints.push(new CLOTH.Constraint(this.index(i,j),this.index(i-d,j+d),d*this.L*Math.sqrt(2.0)));
				
		}

	this.simulationStep = 0;

	var discTexture = THREE.ImageUtils.loadTexture( 'images/disc.png' );

	// values that are constant for all particles during a draw call
	var customUniforms = 
	{
		texture:   { type: "t", value: discTexture },
	};

	// properties that may vary from particle to particle. only accessible in vertex shaders!
	//	(can pass color info to fragment shader via vColor.)
	var customAttributes = 
	{
		customColor:   { type: "c", value: [] },
	};

	// assign values to attributes, one for each vertex of the geometry
	for( var v = 0; v < geometry.vertices.length; v++ ) 
	{
		customAttributes.customColor.value[ v ] = new THREE.Color( 0xffffff * Math.random() );
	}

	var shaderMaterial = new THREE.ShaderMaterial( 
	{
		uniforms: 		customUniforms,
		attributes:		customAttributes,
		vertexShader:   document.getElementById( 'vertexshader' ).textContent,
		fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
		transparent: true, alphaTest: 0.5
	});

	
	this.points = new THREE.ParticleSystem( geometry, shaderMaterial );
	this.points.position.set(0, 0, 0);
	this.points.dynamic = true;
	this.points.sortParticles = true;
	scene.add( this.points );
};

CLOTH.Cloth.prototype.verlet = function(){
	for(var i = 0; i < this.N; i++){
		var tmp = this.X.cur[i].clone();
		this.X.cur[i].x += this.X.cur[i].x-this.X.last[i].x+this.F.cur[i].x*this.timeStep*this.timeStep;
		this.X.cur[i].y += this.X.cur[i].y-this.X.last[i].y+this.F.cur[i].y*this.timeStep*this.timeStep;
		this.X.cur[i].z += this.X.cur[i].z-this.X.last[i].z+this.F.cur[i].z*this.timeStep*this.timeStep;
        this.X.last[i].copy(tmp);
	}
};

CLOTH.Cloth.prototype.accumulateForces = function(){
	for(var i = 0; i < this.N; i++){
		this.F.cur[i].copy(this.g);
	}
};

CLOTH.Cloth.prototype.satisfyConstraints = function(bodies){
	for(var it = 0; it < this.iterationsNumber; it++){
		// BBOX
		for(var i = 0; i < this.N; i++){
			this.X.cur[i].clamp(new THREE.Vector3(-50,-50,-50), new THREE.Vector3(200,200,200));
		}
		// CONSTRAINTS
		for(var i = 0; i < this.constraints.length; i++){
			var x1 = this.X.cur[this.constraints[i].a].clone();
			var x2 = this.X.cur[this.constraints[i].b].clone();
			var r = this.constraints[i].restlength;
			var delta = new THREE.Vector3(x2.x - x1.x,x2.y - x1.y,x2.z - x1.z);

			var deltalength = Math.sqrt(delta.dot(delta));
			var diff = (deltalength-r)/(deltalength);
			this.X.cur[this.constraints[i].a].x += 0.5*delta.x*diff;
			this.X.cur[this.constraints[i].a].y += 0.5*delta.y*diff;
			this.X.cur[this.constraints[i].a].z += 0.5*delta.z*diff;

			this.X.cur[this.constraints[i].b].x -= 0.5*delta.x*diff;
			this.X.cur[this.constraints[i].b].y -= 0.5*delta.y*diff;
			this.X.cur[this.constraints[i].b].z -= 0.5*delta.z*diff;
		}

		for(var b = 0; b < bodies.length; b++){
			for(var i = 0; i < this.N; i++){
				//console.log(this.X.cur[i]);
				//if(i == this.N-1)
					this.X.cur[i].copy(bodies[b].particleCollision(this.X.cur[i]));
			}
		}

		// PIVOTS
		for(var i = 0; i < this.pivot.length; i++){
			if(this.pivot[i][0]){
				this.X.cur[i].copy(this.pivot[i][1]);
			}
		}
	}
};

CLOTH.Cloth.prototype.index = function(x,y){
	return y*this.NW + x;
};

CLOTH.Cloth.prototype.update = function(bodies){
	this.accumulateForces();
	this.verlet();
	this.satisfyConstraints(bodies);

	for(var i = 0; i < this.N; i++)
		this.points.geometry.vertices[i].copy(this.X.cur[i]);
	
	this.points.geometry.verticesNeedUpdate = true;
};

CLOTH.Cloth.prototype.addPivot = function(x, y, pivot){
	this.pivot[this.index(x,y)][0] = true;
	this.pivot[this.index(x,y)][1].copy(pivot);
};