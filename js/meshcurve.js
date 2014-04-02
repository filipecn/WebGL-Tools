/*'use strict'
var loader = document.getElementById('loader');
showLoader(true);

var presets=[];
var materials=[{name:'dark glass',diffuse:'944_large_remake2.jpg'},{name:'twilight fisheye',diffuse:'TwilightFisheye.jpg'},{name:'jeepster skinmat',diffuse:'jeepster_skinmat2.jpg'},{name:'josh shing matcap',diffuse:'JoshSingh_matcap.jpg'},{name:'dark grey metal',diffuse:'mydarkgreymetal_zbrush_matcap_by_digitalinkrod.jpg'},{name:'green shin metal',diffuse:'mygreenshinmetal_zbrush_matcap_by_digitalinkrod.jpg'},{name:'red metal',diffuse:'myredmetal_zbrush_matcap_by_digitalinkrod.jpg'},{name:'gooch',diffuse:'gooch.jpg'},{name:'smooth',diffuse:'smoothmat.jpg'},{name:'LitSphere',diffuse:'LitSphere_example_4.jpg'},{name:'green',diffuse:'5cad3098d01a8d232b753acad6f39972.jpg'},{name:'bluew2',diffuse:'bluew2.jpg'},{name:'bluew',diffuse:'bluew.jpg'},{name:'blue green',diffuse:'blu_green_litsphere_by_jujikabane.jpg'},{name:'daphz3',diffuse:'daphz3.jpg'},{name:'daphz2',diffuse:'daphz2.jpg'},{name:'daphz1',diffuse:'daphz1.jpg'},{ name:'scooby skin',diffuse:'scooby_skin_mix.jpg'},{name:'litsphere',diffuse:'LitSphere_test_05.jpg'},{name:'litsphere2',diffuse:'LitSphere_test_04.jpg'},{name:'litsphere3',diffuse:'LitSphere_test_03.jpg'},{name:'litsphere3',diffuse:'LitSphere_test_02.jpg'},{name:'litsphere3',diffuse:'LitSphere_example_5.jpg'},{name:'litsphere3',diffuse:'LitSphere_example_3.jpg'},{name:'litsphere3',diffuse:'LitSphere_example_2.jpg'},{name:'litsphere3',diffuse:'matball07.jpg'},{name:'litsphere3',diffuse:'matball04.jpg'},{name:'litsphere3',diffuse:'matball06.jpg'},{name:'litsphere3',diffuse:'matball05.jpg'},{name:'litsphere3',diffuse:'matball03.jpg'},{name:'litsphere3',diffuse:'matball02.jpg'},{name:'litsphere3',diffuse:'matball01.jpg'},{name:'red sphere',diffuse:'redsphere.jpg'},{name:'pink',diffuse:'93e1bbcf77ece0c0f7fc79ecb8ff0d00.jpg'}];var normals=[{name:'243',map:'243-normal.jpg'},{name:'243',map:'wrinkle-normal.jpg'},{name:'243',map:'295-normal.jpg'},{name:'243',map:'879-normal.jpg'},{name:'243',map:'2563-normal.jpg'},{name:'243',map:'brick-normal.jpg'},{name:'243',map:'floor2_ddn.jpg'},{name:'243',map:'forestfloornrmii7.jpg'},{name:'243',map:'normal.jpg'},{name:'243',map:'normalmap_tile_even.jpg'},{name:'243',map:'normalmap1.jpg'},{name:'243',map:'stage7.jpg'},{name:'243',map:'Worn Temple Wall.jpg'},{name:'243',map:'fig29.png'},{name:'243',map:'Wall3_normalmap.jpg'},{name:'243',map:'metal1_normalmap.jpg'},{name:'243',map:'99232450425c8132b17dbccf65da365a.jpg'},{name:'243',map:'4918-normal.jpg'},{name:'243',map:'cr_wallpaper1_NRM.jpg'},{name:'243',map:'stone_wall_normal_map.jpg'},{name:'243',map:'02.jpg'},{name:'243',map:'242-normal.jpg'},{name:'243',map:'7146-normal.jpg'},{name:'243',map:'1324-normal.jpg'},{name:'243',map:'Rock_01_local.jpg'},{name:'243',map:'6624-normal.jpg'}]

var materialList=document.getElementById('materialList');

for(var j in materials){
	var li=document.createElement('li');
	var a=document.createElement('a');
	a.setAttribute('href','#');
	a.setAttribute('title',materials[ j].name);
	a.innerHTML='&nbsp;';
	a.className='button';
	(function(f){
		a.addEventListener('click',function(e){
			material.uniforms.tMatCap.value=THREE.ImageUtils.loadTexture('matcap/'+f);
			e.preventDefault();});})(materials[j].diffuse);
			a.style.backgroundImage='url(matcap/'+encodeURIComponent(materials[j].diffuse)+')';
			a.style.backgroundSize='contain';
			li.appendChild(a);materialList.appendChild(li);
		}
		materialList.appendChild(createDropZone(function(){
			material.uniforms.tMatCap.value=new THREE.Texture(this);
			material.uniforms.tMatCap.value.needsUpdate=true;
		}));

		function isPowerOfTwo(x){return(x&(x-1))==0;}
		function nextHighestPowerOfTwo(x){--x;for(var i=1;i<32;i<<=1){x=x|x>>i;}
		
		return x+1;}

function createNormalButton(map){
	var li=document.createElement('li');
	var a=document.createElement('a');
	a.setAttribute('href','#');
	a.setAttribute('title',normals[ j].name);
	a.innerHTML='&nbsp;';a.className='button';
	if(map==null){
		a.addEventListener('click',function(e){
			material.uniforms.useNormal.value=0.;
			e.preventDefault();});
		a.textContent='None';
		a.style.width='85px';
		a.style.textAlign='center';
	}
	else{
		a.addEventListener('click',function(e){
			var img=new Image();
			img.addEventListener('load',function(e){adjustNormalMap(img);});
			img.src='normal/'+map;
			e.preventDefault();
		});
		a.style.backgroundImage='url(normal/'+encodeURIComponent(map)+')';
	}
	a.style.backgroundSize='contain';
	li.appendChild(a);
	return li;
}
function createDropZone(imgCallback){
	var dropzone=document.createElement('div');
	dropzone.className='dropzone';
	dropzone.textContent='Drop';
	dropzone.addEventListener('dragenter',function(event){this.style.backgroundColor='rgba( 255,255,255,.2 )';},true);
	dropzone.addEventListener('dragleave',function(event){this.style.backgroundColor='transparent';},true);
	dropzone.addEventListener('dragover',function(event){this.style.backgroundColor='rgba( 255,255,255,.2 )';
		event.preventDefault();},true);
	dropzone.addEventListener('drop',function(event){showLoader(true);this.style.backgroundColor='transparent';
		event.preventDefault();
		var allTheFiles=event.dataTransfer.files;
		var reader=new FileReader();
		reader.onload=function(e){try{
			var img=new Image();
			img.onload=imgCallback;
			img.src=e.currentTarget.result;
			showLoader(false);}catch(e){alert('Couldn\'t read that file. Make sure it\'s an mp3 or ogg file (Chrome) or ogg file (Firefox).');}};
			reader.readAsDataURL(allTheFiles[0]);},true);
	return dropzone;
}
var normalList=document.getElementById('normalList');

for(var j in normals){
	normalList.appendChild(createNormalButton(normals[j].map));
}
normalList.appendChild(createNormalButton(null));
normalList.appendChild(createDropZone(function(){adjustNormalMap(this);}));

function adjustNormalMap(img){if(!isPowerOfTwo(img.width)||!isPowerOfTwo(img.height)){
	var canvas=document.createElement("canvas");
	canvas.width=nextHighestPowerOfTwo(img.width);
	canvas.height=nextHighestPowerOfTwo(img.height);
	var ctx=canvas.getContext("2d");
	ctx.drawImage(img,0,0,canvas.width,canvas.height);
	img=canvas;
}
material.uniforms.tNormal.value=new THREE.Texture(img);
material.uniforms.tNormal.value.needsUpdate=true;
material.uniforms.tNormal.value.wrapS=material.uniforms.tNormal.value.wrapT=THREE.RepeatWrapping;material.uniforms.useNormal.value=1.;
}

document.getElementById('pinBtn').addEventListener('click',function(e){
	optionsPinned=!optionsPinned;
	this.classList.toggle('pinned',optionsPinned);
	optionsPanel.classList.toggle('pinned',optionsPinned);
	e.preventDefault();
});

var container=document.getElementById('container');
document.getElementById('screenBlendingBtn').addEventListener('click',function(e){
	material.uniforms.useScreen.value=1-material.uniforms.useScreen.value;
	this.classList.toggle('active',material.uniforms.useScreen.value===1);
	e.preventDefault();
});

document.getElementById('normalValueInput').addEventListener('change',function(e){material.uniforms.normalScale.value=this.value/100;e.preventDefault();});
document.getElementById('normalRepeatInput').addEventListener('change',function(e){material.uniforms.normalRepeat.value=this.value;e.preventDefault();});
document.getElementById('rimValueInput').addEventListener('change',function(e){material.uniforms.useRim.value=this.value/100;e.preventDefault();});
document.getElementById('rimPowerValueInput').addEventListener('change',function(e){material.uniforms.rimPower.value=this.value/20;e.preventDefault();});

[].slice.call(document.querySelectorAll('a[rel=external]'),0).forEach(function(a){
	a.addEventListener('click',function(e){window.open(this.href,'_blank');
	e.preventDefault();},false);
});
*/

var noise=new ImprovedNoise();
var isSafari=/Safari/.test(navigator.userAgent)&&/Apple Computer/.test(navigator.vendor);
var renderer,scene,camera,mesh,fov=120,nfov=45,sphereMaterial,material,start=Date.now(),
onMouseDownMouseX=0,onMouseDownMouseY=0,lon=90,nlon=110,onMouseDownLon=0,lat=0,nlat=17,onMouseDownLat=0,phi=0,
theta=0,renderNoise=.04,nRenderNoise=.04,CSSAntialias=false,useScreenBlend=false,lat=15,isUserInteracting=false,
onPointerDownPointerX,onPointerDownPointerY,onPointerDownLon,onPointerDownLat,optionsPinned=false;




/*
var optionsPanel=document.getElementById('options');
var modelButtons=[].slice.call(document.querySelectorAll('#geometryList li a'),0);
modelButtons.forEach(function(el){
	el.addEventListener('click',function(ev){
		showLoader(true);
		var f=null;modelButtons.forEach(function(i){i.classList.remove('active')});
		switch(el.getAttribute('data-value')){
			case'cube':f=loadCube;break;
			case'blob':f=loadBlob;break;
			case'torusKnot':f=loadTorusKnot;break;
			case'leePerry':f=loadLeePerrySmith;break;
			case'suzanne':f=loadSuzanne;break;
		}

if(f){
	el.classList.add('active');
	setTimeout(function(){f(function(g){
		clearMesh();
		addGeometry(g);});
},250);}});});
*/

document.getElementById('snapshotBtn').addEventListener('click',function(e){
	var name='clicktorelease.com-litSphere-'+Date.now()+'.png';
	var canvas=document.createElement('canvas');
	canvas.width=renderer.domElement.width/(CSSAntialias?2:1);
	canvas.height=renderer.domElement.height/(CSSAntialias?2:1);
	var ctx=canvas.getContext('2d');
	var src=renderer.domElement;
	ctx.drawImage(src,0,0,renderer.domElement.width,renderer.domElement.height,0,0,canvas.width,canvas.height);
	var a=this;
	if(isSafari){
		var data=canvas.toDataURL('image/png');
		window.open(data,name);
		return false;
	}
	else{
		canvas.toBlob(function(blob){
			var url;
			if(window.webkitURL){
				url=window.webkitURL.createObjectURL(blob);
			}
			else{
				url=URL.createObjectURL(blob);
			}

			a.setAttribute('download',name);
			a.setAttribute('href',url);
		});
	}
});

window.addEventListener('load',init);
/*function showLoader(show){
	if(show)loader.classList.add('visible');
	else loader.classList.remove('visible');
}

function loadCube(callback){
	var geometry=new THREE.CubeGeometry(30,30,30,10,10,10);
	var modifier=new THREE.SubdivisionModifier(2);
	modifier.modify(geometry);
	material.uniforms.repeat.value.set(1,1);
	callback(geometry);
}

function loadBlob(callback){function turbulence(x,y,z){
	var t=-.5;
	for(var f=1;f<=100/12;f*=2){
		t+=Math.abs(noise.noise(f*x,f*y,f*z)/f);
	}
	return t;
}

var geometry=new THREE.CubeGeometry(30,30,30,30,30,30);

for(var j=0;j<geometry.vertices.length;j++){
	var v=geometry.vertices[j];
	var n=v.clone();
	n.normalize();
	v.copy(n);
	v.multiplyScalar(30);
	var f=.05;var d=10*noise.noise(f*v.x,f*v.y,f*v.z);
	v.add(n.multiplyScalar(d));
}

material.uniforms.repeat.value.set(1,1);
callback(geometry);
}

function loadTorusKnot(callback){material.uniforms.repeat.value.set(8,1);callback(new THREE.TorusKnotGeometry(20,6,200,100,1,3));}
function loadLeePerrySmith(callback){
	var loader=new THREE.JSONLoader();
	loader.load('LeePerrySmith.js',function(geometry){
		var m=new THREE.Matrix4();
		var s=10;
		m.scale(new THREE.Vector3(s,s,s));
		THREE.GeometryUtils.center(geometry);
		geometry.vertices.forEach(function(v){
			v.applyMatrix4(m);
		});

		geometry.verticesNeedUpdate=true;
		geometry.normalsNeedUpdate=true;
		geometry.uvsNeedUpdate=true;
		geometry.computeCentroids();
		geometry.computeFaceNormals();
		geometry.computeVertexNormals();
		geometry.computeMorphNormals();
		geometry.computeTangents();

		var modifier=new THREE.SubdivisionModifier(1);
		modifier.modify(geometry);
		material.uniforms.repeat.value.set(4,4);
		callback(geometry);});
}
*/
function loadSuzanne(callback){
	var geometry=new THREE.Geometry();
	for(var j=0;j<suzanne.vertices.length;j++){
		var v=new THREE.Vector3(suzanne.vertices[j][0],suzanne.vertices[j][1],suzanne.vertices[j][2]);
		v.multiplyScalar(30);geometry.vertices.push(v);
	}

	for(var j=0;j<suzanne.faces.length;j++){
		var f=new THREE.Face4(suzanne.faces[j][0],suzanne.faces[j][1],suzanne.faces[j][2],suzanne.faces[ j][3]);
		geometry.faces.push(f);
		var uvs=[];
		var ids=[ 'a','b','c','d'];
		for(var i=0;i<3/*ids.length*/;i++){
			var vertex=geometry.vertices[f[ids[i]]].clone();
			var n=vertex.normalize();
			var yaw=.5-Math.atan(n.z,-n.x)/(2.0*Math.PI);
			var pitch=.5-Math.asin(n.y)/Math.PI;var u=yaw,v=pitch;uvs.push(new THREE.Vector2(u,v));
		}
		geometry.faceVertexUvs[0].push(uvs);
	}	
	geometry.verticesNeedUpdate=true;
	geometry.normalsNeedUpdate=true;geometry.uvsNeedUpdate=true;
	geometry.computeCentroids();geometry.computeFaceNormals();	
	geometry.computeVertexNormals();geometry.computeMorphNormals();
	geometry.computeTangents();
	//var modifier=new THREE.SubdivisionModifier(2);
	//modifier.modify(geometry);
	//material.uniforms.repeat.value.set(4,4);
	callback(geometry);
}

function clearMesh(){
	if(mesh) {
		scene.remove(mesh);
		mesh=null;
	}
}

function addGeometry(geometry){
	geometry.verticesNeedUpdate=true;
	geometry.normalsNeedUpdate=true;
	geometry.uvsNeedUpdate=true;
	geometry.computeCentroids();
	geometry.computeFaceNormals();
	geometry.computeVertexNormals();
	geometry.computeMorphNormals();
	geometry.computeTangents();
	mesh=new THREE.Mesh(geometry,material);
	mesh.useQuaternion=true;
	scene.add(mesh);
	//showLoader(false);
}

function setNoise(n){
	material.uniforms.noise.value=sphereMaterial.uniforms.noise.value=n;
}
/*
document.getElementById('antialiasingButton').addEventListener('click',function(e){
	CSSAntialias=!CSSAntialias;this.classList.toggle('active',CSSAntialias);onWindowResize();e.preventDefault();});
*/

function init(){
	scene=new THREE.Scene();
	camera=new THREE.PerspectiveCamera(fov,window.innerWidth/window.innerHeight,10,1000);
	camera.position.z=100;
	camera.target=new THREE.Vector3(0,0,0);
	scene.add(camera);

	material= new THREE.ShaderMaterial({
		uniforms:{tNormal:{type:'t',value:THREE.ImageUtils.loadTexture('images/243-normal.jpg')},
		tMatCap:{ type:'t',value:THREE.ImageUtils.loadTexture('images/jeepster_skinmat2.jpg')},
		time:{ type:'f',value:0},bump:{type:'f',value:0},
		noise:{ type:'f',value:.04},
		repeat:{type:'v2',value:new THREE.Vector2(1,1)},
		useNormal:{ type:'f',value:0},
		useRim:{ type:'f',value:0},
		rimPower:{ type:'f',value:2},
		useScreen:{ type:'f',value:0},
		normalScale:{ type:'f',value:.5},
		normalRepeat:{ type:'f',value:1}},
		vertexShader:document.getElementById('vertexShader').textContent,
		fragmentShader:document.getElementById('fragmentShader').textContent,
		wrapping:THREE.ClampToEdgeWrapping,shading:THREE.SmoothShading,side:THREE.DoubleSide
	});

	material.uniforms.tMatCap.value.wrapS=material.uniforms.tMatCap.value.wrapT=THREE.ClampToEdgeWrapping;
	material.uniforms.tNormal.value.wrapS=material.uniforms.tNormal.value.wrapT=THREE.RepeatWrapping;
	
	sphereMaterial=new THREE.ShaderMaterial(
		{uniforms:{resolution:{ type:'v2',value:new THREE.Vector2(0,0)},
		noise:{ type:'f',value:.04}},
		vertexShader:document.getElementById('sphere-vs').textContent,
		fragmentShader:document.getElementById('sphere-fs').textContent,
		side:THREE.BackSide
	});

	var sphere=new THREE.Mesh(new THREE.IcosahedronGeometry(100,1),sphereMaterial);
	scene.add(sphere);
	renderer=new THREE.WebGLRenderer({
		antialias:true,
		preserveDrawingBuffer:true
	});

	renderer.setSize(window.innerWidth,window.innerHeight);
	container.appendChild(renderer.domElement);
	container.addEventListener('mousedown',onMouseDown,false);
	container.addEventListener('mousemove',onMouseMove,false);
	container.addEventListener('mouseup',onMouseUp,false);
	container.addEventListener('mousewheel',onMouseWheel,false);
	container.addEventListener('DOMMouseScroll',onMouseWheel,false);
	container.addEventListener('touchstart',onTouchStart,false);
	container.addEventListener('touchmove',onTouchMove,false);
	container.addEventListener('touchend',onTouchEnd,false);
	container.addEventListener('touchcancel',onTouchEnd,false);
	window.addEventListener('resize',onWindowResize,false);
	onWindowResize();
	clearMesh();
	loadSuzanne(addGeometry);
	render();
}
/*
var el=document.getElementById('fullscreenBtn');if(el){var c=document.body;el.addEventListener('click',function(e){c.onwebkitfullscreenchange=function(e){c.onwebkitfullscreenchange=function(){};};c.onmozfullscreenchange=function(e){c.onmozfullscreenchange=function(){};};if(c.webkitRequestFullScreen)c.webkitRequestFullScreen();if(c.mozRequestFullScreen)c.mozRequestFullScreen();e.preventDefault();},false);}
*/


function onWindowResize(){
	var s=CSSAntialias?2:1;
	renderer.setSize(s*window.innerWidth,s*window.innerHeight);
	camera.projectionMatrix.makePerspective(fov,window.innerWidth/window.innerHeight,camera.near,camera.far);
	sphereMaterial.uniforms.resolution.value.set(s*window.innerWidth,s*window.innerHeight);
}

function onMouseWheel(event){
	if(event.wheelDeltaY){
		nfov-=event.wheelDeltaY*0.01;
	}else if(event.wheelDelta){
		nfov-=event.wheelDelta*0.05;
	}else if(event.detail){
		nfov+=event.detail*1.0;
	}
}

function onMouseDown(event){
	event.preventDefault();
	isUserInteracting=true;
	onPointerDownPointerX=event.clientX;onPointerDownPointerY=event.clientY;
	onPointerDownLon=lon;
	onPointerDownLat=lat;
}

function onMouseMove(event){
	if(isUserInteracting){
		nlon=(event.clientX-onPointerDownPointerX)*0.1+onPointerDownLon;
		nlat=(event.clientY-onPointerDownPointerY)*0.1+onPointerDownLat;
	}
}

function onMouseUp(event){
	isUserInteracting=false;
}

function onTouchStart(event){
	event.preventDefault();
	var t=event.touches[0];
	isUserInteracting=true;
	container.classList.add('dragging')
onPointerDownPointerX=t.clientX;
onPointerDownPointerY=t.clientY;
onPointerDownLon=lon;onPointerDownLat=lat;
}

function onTouchMove(event){
	var t=event.touches[0];
	nlon=(t.clientX-onPointerDownPointerX)*0.1+onPointerDownLon;
	nlat=(t.clientY-onPointerDownPointerY)*0.1+onPointerDownLat;
}

function onTouchEnd(event){
	isUserInteracting=false;
}

function render(){
	lon+=(nlon-lon)*.2;
	lat+=(nlat-lat)*.2;
	fov+=(nfov-fov)*.2;
	renderNoise+=(nRenderNoise-renderNoise)*.2;
	setNoise(renderNoise);
	camera.projectionMatrix.makePerspective(fov,window.innerWidth/window.innerHeight,camera.near,camera.far);
	lat=Math.max(-85,Math.min(85,lat));
	phi=(90-lat)*Math.PI/180;
	theta=lon*Math.PI/180;
	camera.position.x=100*Math.sin(phi)*Math.cos(theta);
	camera.position.y=100*Math.cos(phi);
	camera.position.z=100*Math.sin(phi)*Math.sin(theta);
	camera.lookAt(camera.target);
	if(mesh){}
	camera.lookAt(scene.position);
	renderer.render(scene,camera);
	requestAnimationFrame(render);
}


// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
// Great success! All the File APIs are supported.
} else {
	alert('The File APIs are not fully supported in this browser.');
}


  var reader;
  var progress = document.querySelector('.percent');

  function abortRead() {
    reader.abort();
  }

  function errorHandler(evt) {
    switch(evt.target.error.code) {
      case evt.target.error.NOT_FOUND_ERR:
        alert('File Not Found!');
        break;
      case evt.target.error.NOT_READABLE_ERR:
        alert('File is not readable');
        break;
      case evt.target.error.ABORT_ERR:
        break; // noop
      default:
        alert('An error occurred reading this file.');
    };
  }

  function updateProgress(evt) {
    // evt is an ProgressEvent.
    if (evt.lengthComputable) {
      var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
      // Increase the progress bar length.
      if (percentLoaded < 100) {
        progress.style.width = percentLoaded + '%';
        progress.textContent = percentLoaded + '%';
      }
    }
  }

  function loadMesh(contents, name){
  	
	if(name.indexOf(".ply") >= 0){
		var loader = new THREE.PLYLoader();
		
		var geometry = loader.parse(contents);
		//var material = new THREE.MeshPhongMaterial( { ambient: 0x0055ff, color: 0x0055ff, specular: 0x111111, shininess: 200 } );
		
		geometry.computeBoundingSphere();
		var s = 10 / geometry.boundingSphere.radius;
		
		for(var j=0;j<geometry.faces.length;j++){
		var uvs=[];
		var ids=[ 'a','b','c'];
		//for(var i=0;i<ids.length;i++){
			var vertex=geometry.vertices[geometry.faces[j].a].clone();
			var n=vertex.normalize();
			var yaw=.5-Math.atan(n.z,-n.x)/(2.0*Math.PI);
			var pitch=.5-Math.asin(n.y)/Math.PI;var u=yaw,v=pitch;uvs.push(new THREE.Vector2(u,v));
			 vertex=geometry.vertices[geometry.faces[j].b].clone();
			 n=vertex.normalize();
			 yaw=.5-Math.atan(n.z,-n.x)/(2.0*Math.PI);
			 pitch=.5-Math.asin(n.y)/Math.PI; u=yaw,v=pitch;uvs.push(new THREE.Vector2(u,v));
			 vertex=geometry.vertices[geometry.faces[j].c].clone();
			 n=vertex.normalize();
			 yaw=.5-Math.atan(n.z,-n.x)/(2.0*Math.PI);
			 pitch=.5-Math.asin(n.y)/Math.PI; u=yaw,v=pitch;uvs.push(new THREE.Vector2(u,v));
		//}
		geometry.faceVertexUvs[0].push(uvs);
	}	

		geometry.verticesNeedUpdate=true;
		geometry.normalsNeedUpdate=true;geometry.uvsNeedUpdate=true;
		geometry.computeCentroids();geometry.computeFaceNormals();	
		geometry.computeVertexNormals();geometry.computeMorphNormals();
		geometry.computeTangents();

		var mesh = new THREE.Mesh( geometry, material );
		mesh.scale.set( s, s, s );
		scene.add( mesh );
	}
	else if(name.indexOf(".obj") >= 0){
		var loader = new THREE.OBJLoader();
		//THREE.Object3D();
		var mesh = loader.parse(contents).children[0];
		mesh.geometry.computeBoundingSphere();
		var s = 10 / mesh.geometry.boundingSphere.radius;
		console.log(s);
		mesh.scale.set( s, s, s );
		scene.add(mesh);
	}
	else if(name.indexOf(".vtk") >= 0){
		var loader = new THREE.VTKLoader();
		var geometry = loader.parse(contents);
		var material = new THREE.MeshPhongMaterial( { ambient: 0x0055ff, color: 0x0055ff, specular: 0x111111, shininess: 200 } );
		var mesh = new THREE.Mesh( geometry, material );

		geometry.computeBoundingSphere();
		var s = 10 / geometry.boundingSphere.radius;
		console.log(s);
		//mesh.position.set( 0, - 0.25, 0 );
		//mesh.rotation.set( 0, - Math.PI / 2, 0 );
		mesh.scale.set( s, s, s );

		//mesh.castShadow = true;
		//mesh.receiveShadow = true;

		scene.add( mesh );
	} 
  }

  function handleFileSelect(evt) {

    // Reset progress indicator on new file selection.
    progress.style.width = '0%';
    progress.textContent = '0%';

    reader = new FileReader();
    reader.onerror = errorHandler;
    reader.onprogress = updateProgress;
    reader.onabort = function(e) {
      alert('File read cancelled');
    };
    reader.onloadstart = function(e) {
      document.getElementById('progress_bar').className = 'loading';
    };
    reader.onload = function(e) {
      // Ensure that the progress bar displays 100% at the end.
      progress.style.width = '100%';
      progress.textContent = '100%';
      setTimeout("document.getElementById('progress_bar').className='';", 2000);

      loadMesh(e.target.result, evt.target.files[0].name);
    }
	
	reader.readAsText(evt.target.files[0]);
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);

function handleFileDropSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

// Reset progress indicator on new file selection.
    progress.style.width = '0%';
    progress.textContent = '0%';

    reader = new FileReader();
    reader.onerror = errorHandler;
    reader.onprogress = updateProgress;
    reader.onabort = function(e) {
      alert('File read cancelled');
    };
    reader.onloadstart = function(e) {
      document.getElementById('progress_bar').className = 'loading';
    };
    reader.onload = function(e) {
      // Ensure that the progress bar displays 100% at the end.
      progress.style.width = '100%';
      progress.textContent = '100%';
      setTimeout("document.getElementById('progress_bar').className='';", 1000);

      loadMesh(e.target.result, files[0].name);
    }
	
	reader.readAsText(files[0]);
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

// Setup the dnd listeners.
  var dropZone = document.getElementById('drop_zone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileDropSelect, false);
