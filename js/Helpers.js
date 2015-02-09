var HELPERS = {};

HELPERS.cartesianGrid = function(scene, size){
	var gridXZ = new THREE.GridHelper(100, 10);
	gridXZ.setColors( new THREE.Color(0x006600), new THREE.Color(0x006600) );
	gridXZ.position.set( 100,0,100 );
	scene.add(gridXZ);
	
	var gridXY = new THREE.GridHelper(100, 10);
	gridXY.position.set( 100,100,0 );
	gridXY.rotation.x = Math.PI/2;
	gridXY.setColors( new THREE.Color(0x000066), new THREE.Color(0x000066) );
	scene.add(gridXY);

	var gridYZ = new THREE.GridHelper(100, 10);
	gridYZ.position.set( 0,100,100 );
	gridYZ.rotation.z = Math.PI/2;
	gridYZ.setColors( new THREE.Color(0x660000), new THREE.Color(0x660000) );
	scene.add(gridYZ);

	var spritey = LABEL.makeTextSprite( "X", { fontsize: 32, backgroundColor: {r:255, g:100, b:100, a:1} } );
	spritey.position.set(100,0,0);
	scene.add( spritey );
	var spritey = LABEL.makeTextSprite( "Y", { fontsize: 32, backgroundColor: {r:255, g:100, b:100, a:1} } );
	spritey.position.set(0,100,0);
	scene.add( spritey );
	var spritey = LABEL.makeTextSprite( "Z", { fontsize: 32, backgroundColor: {r:255, g:100, b:100, a:1} } );
	spritey.position.set(0,0,100);
	scene.add( spritey );
}