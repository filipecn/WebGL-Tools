// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
// Great success! All the File APIs are supported.
} else {
	alert('The File APIs are not fully supported in this browser.');
}

var MESHLOADER = {};

MESHLOADER.reader = new FileReader();
MESHLOADER.onLoad;

MESHLOADER.abortRead = function() {
  reader.abort();
}

MESHLOADER.errorHandler = function(evt) {
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

MESHLOADER.updateProgress = function(evt) {
  // evt is an ProgressEvent.
  if (evt.lengthComputable) {
    var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
    // Increase the progress bar length.
    if (percentLoaded < 100) {
      this.progress.style.width = percentLoaded + '%';
      this.progress.textContent = percentLoaded + '%';
    }
  }
}

MESHLOADER.loadMesh = function(contents, name){
  var mesh;
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

    mesh = new THREE.Mesh( geometry, material );
    mesh.scale.set( s, s, s );
    //scene.add( mesh );
    //return mesh;
  }
  else if(name.indexOf(".obj") >= 0){
    var loader = new THREE.OBJLoader();
    //THREE.Object3D();
    mesh = loader.parse(contents).children[0];
    mesh.geometry.computeBoundingSphere();
    var s = 10 / mesh.geometry.boundingSphere.radius;
    console.log(s);
    mesh.scale.set( s, s, s );
    //scene.add(mesh);
  }
  else if(name.indexOf(".vtk") >= 0){
    var loader = new THREE.VTKLoader();
    var geometry = loader.parse(contents);
    var material = new THREE.MeshPhongMaterial( { ambient: 0x0055ff, color: 0x0055ff, specular: 0x111111, shininess: 200 } );
    mesh = new THREE.Mesh( geometry, material );

    geometry.computeBoundingSphere();
    var s = 10 / geometry.boundingSphere.radius;
    console.log(s);
    //mesh.position.set( 0, - 0.25, 0 );
    //mesh.rotation.set( 0, - Math.PI / 2, 0 );
    mesh.scale.set( s, s, s );

    //mesh.castShadow = true;
    //mesh.receiveShadow = true;

    //scene.add( mesh );
  } 
  return mesh;
}

MESHLOADER.handleFileSelect = function(evt) {

  // Reset progress indicator on new file selection.
  //this.progress.style.width = '0%';
  //this.progress.textContent = '0%';

  //var reader = new FileReader();
  MESHLOADER.reader.onerror = MESHLOADER.errorHandler;
  MESHLOADER.reader.onprogress = MESHLOADER.updateProgress;
  MESHLOADER.reader.onabort = function(e) {
    alert('File read cancelled');
  };
  MESHLOADER.reader.onloadstart = function(e) {
 //   document.getElementById('progress_bar').className = 'loading';
  };
  MESHLOADER.reader.onload = function(e) {
    // Ensure that the progress bar displays 100% at the end.
  //  this.progress.style.width = '100%';
  //  this.progress.textContent = '100%';
  //  setTimeout("document.getElementById('progress_bar').className='';", 2000);
    var mesh = MESHLOADER.loadMesh(e.target.result, evt.target.files[0].name);
    MESHLOADER.onLoad(mesh);
  }
  MESHLOADER.reader.readAsText(evt.target.files[0]);
}

  

MESHLOADER.handleFileDropSelect = function(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.dataTransfer.files; // FileList object.

// Reset progress indicator on new file selection.
  this.progress.style.width = '0%';
  this.progress.textContent = '0%';

  this.reader = new FileReader();
  this.reader.onerror = errorHandler;
  this.reader.onprogress = updateProgress;
  this.reader.onabort = function(e) {
    alert('File read cancelled');
  };
  this.reader.onloadstart = function(e) {
    document.getElementById('progress_bar').className = 'loading';
  };
  this.reader.onload = function(e) {
    // Ensure that the progress bar displays 100% at the end.
    this.progress.style.width = '100%';
    this.progress.textContent = '100%';
    setTimeout("document.getElementById('progress_bar').className='';", 1000);

    loadMesh(e.target.result, files[0].name);
  }

	this.reader.readAsText(files[0]);
}

MESHLOADER.handleDragOver = function(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Setup the dnd listeners.
//var dropZone = document.getElementById('drop_zone');
//dropZone.addEventListener('dragover', MESHLOADER.handleDragOver, false);
//dropZone.addEventListener('drop', MESHLOADER.handleFileDropSelect, false);
