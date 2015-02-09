// copyright &copy; 2013 Jaanga authors ~ MIT License

// Thank you, Saqoosha ~ http://saqoo.sh/a/

var BVH = {};

BVH.scene; 

BVH.xmlhttp;
BVH.Bvh = {};
BVH.points = [];

BVH.init = function(scene){
	BVH.scene = scene;
}

BVH.readText = function( that ){
	if ( that.files && that.files[0] ){
		var reader = new FileReader();
		reader.onload = function (event) {
			if ( BVH.scene.children.length > 1 ) {
			//	BVH.scene.remove( BVH.scene.children[2] );
			}
			var data = event.target.result;
			BVH.Bvh.parseData( data );
			BVH.ready();
		};
		reader.readAsText(that.files[0]);
	}
}

BVH.requestFile = function( fname ) {
	dataPlay = false;
	BVH.xmlhttp = new XMLHttpRequest();
	BVH.xmlhttp.open( 'GET', fname, true );
	BVH.xmlhttp.onreadystatechange = callbackFile;
	BVH.xmlhttp.send( null );
	callbackCount = 0;
}

BVH.callbackFile = function() {
	if ( BVH.xmlhttp.readyState == 4  ) {
		if ( BVH.scene.children.length > 1 ) {
			BVH.scene.remove( BVH.scene.children[2] );
		}
		var data = BVH.xmlhttp.responseText;
		textarea.value = data;
		Bvh.parseData ( data );
	} else {
// console.log('waiting...');
	}
}

BVH.Bvh.parseData = function ( data ) {
	var _this = BVH.Bvh;
	_this.data = data.split(/\s+/g);
	_this.channels = [];
	done = false;
	while (!done) {
		switch (_this.data.shift()) {
		case 'ROOT':
			_this.root = _this.parseNode(_this.data);
			BVH.scene.add(_this.root);
			break;
		case 'MOTION':
			_this.data.shift();
			_this.numFrames = parseInt( _this.data.shift() );
			_this.data.shift();
			_this.data.shift();
			_this.secsPerFrame = parseFloat(_this.data.shift());
			done = true;
		}
	}
	_this.root.material = new THREE.MeshBasicMaterial({ color: 0xff0000});
	_this.startTime = Date.now();
	BVH.animate();
}


BVH.Bvh.animate = function( frame ) {
	//console.log(BVH.Bvh.root.children[0].position);
	var ch, frame, n, torad, ref;
	n = frame % this.numFrames * this.channels.length;
	torad = Math.PI / 180;
	ref = this.channels;
	for ( var i = 0, len = ref.length; i < len; i++) {
		ch = ref[ i ];
		switch ( ch.prop ) {
			case 'Xrotation':
				ch.node.rotation.x = (parseFloat(this.data[n])) * torad;
				break;
			case 'Yrotation':
				ch.node.rotation.y = (parseFloat(this.data[n])) * torad;
				break;
			case 'Zrotation':
				ch.node.rotation.z = (parseFloat(this.data[n])) * torad;
				break;
			case 'Xposition':
				ch.node.position.x = ch.node.offset.x + parseFloat(this.data[n]);
				break;
			case 'Yposition':
				ch.node.position.y = ch.node.offset.y + parseFloat(this.data[n]);
				break;
			case 'Zposition':
				ch.node.position.z = ch.node.offset.z + parseFloat(this.data[n]);
		}
		n++;
	}
};	

BVH.animate = function() {
	BVH.Bvh.root.updateMatrixWorld();
	//BVH.scene.updateMatrixWorld();
	//if ( Bvh.play.checked ) { 
		var frame = ( (Date.now() - BVH.Bvh.startTime ) / BVH.Bvh.secsPerFrame / 1000) | 0; 
		BVH.Bvh.animate( frame ); 
}	

BVH.Bvh.parseNode = function( data ) {
	var name, geometry, material, n, node, t, done;
	var bodyBitsSmall = [ 'leftEye', 'rightEye',
		'rThumb1', 'rThumb2', 'rIndex1', 'rIndex2', 'rMid1', 'rMid2', 'rRing1', 'rRing2', 'rPinky1', 'rPinky2',
		'lThumb1', 'lThumb2', 'lIndex1', 'lIndex2', 'lMid1', 'lMid2', 'lRing1', 'lRing2', 'lPinky1', 'lPinky2'
	];
	var radius = 3;
	name = data.shift();
	material = new THREE.MeshBasicMaterial( {color: 0x9944ff} );
	if ( name === 'Site' ) {
		geometry = new THREE.SphereGeometry(15);
		node = new THREE.Mesh(geometry, material);
		
		// node = new THREE.Object3D();

	} else if ( bodyBitsSmall.indexOf( name ) > -1 ){
		geometry = new THREE.CubeGeometry( 1, 1, 1 );
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 0 ) );
		node = new THREE.Mesh(geometry, material);
		
		//node = new THREE.Object3D();

	} else if ( name === 'head' ) {
		geometry = new THREE.CubeGeometry( 12, 20, 15 );
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 8, 0 ) );
		node = new THREE.Mesh(geometry, material);
		

	} else if ( name === 'neck' ) {
		geometry = new THREE.SphereGeometry(radius);
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 0 ) );
		node = new THREE.Mesh(geometry, material);
		

	} else if ( name === 'lCollar' ) {
		geometry = new THREE.SphereGeometry(radius);
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 0 ) );
		node = new THREE.Mesh(geometry, material);
		
	} else if ( name === 'rCollar' ) {
		geometry = new THREE.SphereGeometry(radius);
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 0 ) );
		node = new THREE.Mesh(geometry, material);
		

	} else if ( name === 'lShldr' ) {
		geometry = new THREE.SphereGeometry(radius);
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 0 ) );
		node = new THREE.Mesh(geometry, material);
		

		geometry = new THREE.CubeGeometry( 30, 3, 3 );
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 15, 0, 0 ) );
		mesh = new THREE.Mesh(geometry, material);
		node.add( mesh );

	} else if ( name === 'rShldr' ) {
		geometry = new THREE.SphereGeometry(radius);
		node = new THREE.Mesh(geometry, material);
		

		geometry = new THREE.CubeGeometry( 30, 3, 3 );
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( -15, 0, 0 ) );
		mesh = new THREE.Mesh(geometry, material);
		node.add( mesh );

	} else if ( name === 'lForeArm' ) {
		geometry = new THREE.SphereGeometry(radius);
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 0 ) );
		node = new THREE.Mesh(geometry, material);
		

		geometry = new THREE.CubeGeometry( 30, 3, 3 );
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 15, 0, 0 ) );
		mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial( {color: 0xffff00} ) );
		node.add( mesh );

	} else if ( name === 'rForeArm' ) {
		geometry = new THREE.SphereGeometry(radius);
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 0 ) );
		node = new THREE.Mesh(geometry, material);
		

		geometry = new THREE.CubeGeometry( 30, 3, 3 );
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( -15, 0, 0 ) );
		mesh = new THREE.Mesh(geometry, material);
		node.add( mesh );

	} else if ( name === 'lHand') {
		geometry = new THREE.SphereGeometry(radius);
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 0 ) );
		node = new THREE.Mesh(geometry, material);
		

	} else if ( name === 'rHand' ) {
		geometry = new THREE.SphereGeometry(radius);
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 0 ) );
		node = new THREE.Mesh(geometry, material);
		

	} else if ( name === 'chest' ) {
		geometry = new THREE.SphereGeometry(radius);
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 0 ) );
		node = new THREE.Mesh(geometry, material);
		

		geometry = new THREE.CubeGeometry( 3, 20, 3 );
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 10, 0 ) );
		mesh = new THREE.Mesh(geometry, material);
		node.add( mesh );

	} else if ( name === 'abdomen' ) {
		geometry = new THREE.SphereGeometry(radius);
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 0 ) );
		node = new THREE.Mesh(geometry, material);
		

		geometry = new THREE.CubeGeometry( 3, 40, 3 );
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 0 ) );
		mesh = new THREE.Mesh(geometry, material);
		node.add( mesh );

	} else if ( name === 'lButtock') {
		geometry = new THREE.SphereGeometry(radius);
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 0 ) );
		node = new THREE.Mesh(geometry, material);
		


	} else if ( name === 'rButtock') {
		geometry = new THREE.SphereGeometry(radius);
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 0 ) );
		node = new THREE.Mesh(geometry, material);
		

	} else if ( name === 'rThigh' ||  name === 'lThigh') {
		geometry = new THREE.SphereGeometry(radius);
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 0 ) );
		node = new THREE.Mesh(geometry, material);
		

		geometry = new THREE.CubeGeometry( 3, 40, 3 );
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, -20, 0 ) );
		mesh = new THREE.Mesh(geometry, material);
		node.add( mesh );

	} else if ( name === 'lShin' || name === 'rShin' ) {
		geometry = new THREE.SphereGeometry(radius);
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 0 ) );
		node = new THREE.Mesh(geometry, material);
		

		geometry = new THREE.CubeGeometry( 3, 40, 3 );
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, -20, 0 ) );
		mesh = new THREE.Mesh(geometry, material);
		node.add( mesh );

	} else if ( name === 'lFoot' || name === 'rFoot' ) {
		geometry = new THREE.SphereGeometry(radius);
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 0 ) );
		node = new THREE.Mesh(geometry, material);
		

		geometry = new THREE.CubeGeometry( 5, 3, 16 );
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 8 ) );
		mesh = new THREE.Mesh(geometry, material);
		node.add( mesh );

	} else {
		geometry = new THREE.CubeGeometry( 5, 5, 5);
		material = new THREE.MeshNormalMaterial();
		node = new THREE.Mesh(geometry, material);
		
	}
	node.name = name; 
	node.geometry.computeBoundingSphere();
	node.rotation.order = 'ZXY';
	done = false;
	while ( !done ) {
		switch (t = data.shift()) {
			case 'OFFSET':
				node.position.set( parseFloat(data.shift()), parseFloat(data.shift()), parseFloat(data.shift()) );
				node.offset = node.position.clone();
				break;
			case 'CHANNELS':
				n = parseInt( data.shift());
				for ( var i = 0;  0 <= n ? i < n : i > n;  0 <= n ? i++ : i-- ) {  // OMG, Saqoo, I don't even begin to understand...
					this.channels.push({
						node: node,
						prop: data.shift()
					});
				}
				break;
			case 'JOINT':
			case 'End':
				node.add( this.parseNode(data) );
				break;
			case '}':
				done = true;
		}
	}
	return node;
};	

BVH.Bvh.particleCollision = function(particle){
	var newP = particle.clone();

	BVH.Bvh.root.traverse(function(child){
		if(child.name !='Site') return;
		child.parent.updateMatrixWorld();
		var r = child.geometry.radius;
		var p = child.position.clone();
		child.localToWorld(p);
		var delta = particle.clone();
		delta.sub(p);
			
		if(delta.dot(delta) <= r*r){
			delta.setLength(r);
			delta.add(p);
			newP.copy(delta);
		}
	});
	return newP;
}