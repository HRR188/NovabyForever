/**
 * @author qiao / https://github.com/qiao
 * @author mrdoob / http://mrdoob.com
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author erich666 / http://erichaines.com
 */

// This set of controls performs orbiting, dollying (zooming), and panning.
// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
//
//    Orbit - left mouse / touch: one finger move
//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
//    Pan - right mouse, or arrow keys / touch: three finger swipe

import * as THREE from 'three'

//private values
let changeEvent = { type: 'change' };
let startEvent = { type: 'start' };
let endEvent = { type: 'end' };

let STATE = { NONE: - 1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5 };

let state = STATE.NONE;

let EPS = 0.000001;

// current position in spherical coordinates
let spherical = new THREE.Spherical();
let sphericalDelta = new THREE.Spherical();

let scale = 1;
let panOffset = new THREE.Vector3();
let zoomChanged = false;

let rotateStart = new THREE.Vector2();
let rotateEnd = new THREE.Vector2();
let rotateDelta = new THREE.Vector2();

let panStart = new THREE.Vector2();
let panEnd = new THREE.Vector2();
let panDelta = new THREE.Vector2();

let dollyStart = new THREE.Vector2();
let dollyEnd = new THREE.Vector2();
let dollyDelta = new THREE.Vector2();

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

//functions
function getAutoRotationAngle(scope) {

    return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

}

function getZoomScale(scope) {

    return Math.pow( 0.95, scope.zoomSpeed );

}

function rotateLeft( angle ) {

    sphericalDelta.theta -= angle;

}

function rotateUp( angle ) {

    sphericalDelta.phi -= angle;

}

function panLeft(distance, objectMatrix) {

    let v = new THREE.Vector3();

    v.setFromMatrixColumn( objectMatrix, 0 ); // get X column of objectMatrix
    v.multiplyScalar( - distance );

    panOffset.add( v );

}

function panUp(distance, objectMatrix) {

    let v = new THREE.Vector3();

    v.setFromMatrixColumn( objectMatrix, 1 ); // get Y column of objectMatrix
    v.multiplyScalar( distance );

    panOffset.add( v );

}

// deltaX and deltaY are in pixels; right and down are positive
function pan(scope,deltaX, deltaY) {

    let offset = new THREE.Vector3();

    let element = scope.domElement === document ? scope.domElement.body : scope.domElement;

    if ( scope.camera.isPerspectiveCamera ) {

        // perspective
        let position = scope.camera.position;
        offset.copy( position ).sub( scope.target );
        let targetDistance = offset.length();

        // half of the fov is center to top of screen
        targetDistance *= Math.tan( ( scope.camera.fov / 2 ) * Math.PI / 180.0 );

        // we actually don't use screenWidth, since perspective camera is fixed to screen height
        panLeft( 2 * deltaX * targetDistance / element.clientHeight, scope.camera.matrix );
        panUp( 2 * deltaY * targetDistance / element.clientHeight, scope.camera.matrix );

    } else if ( scope.camera.isOrthographicCamera ) {

        // orthographic
        panLeft( deltaX * ( scope.camera.right - scope.camera.left ) / scope.camera.zoom / element.clientWidth, scope.camera.matrix );
        panUp( deltaY * ( scope.camera.top - scope.camera.bottom ) / scope.camera.zoom / element.clientHeight, scope.camera.matrix );

    } else {

        // camera neither orthographic nor perspective
        console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );
        scope.enablePan = false;

    }

}

function dollyIn( dollyScale,scope ) {

    if ( scope.camera.isPerspectiveCamera ) {

        scale /= dollyScale;

    } else if ( scope.camera.isOrthographicCamera ) {

        scope.camera.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.camera.zoom * dollyScale ) );
        scope.camera.updateProjectionMatrix();
        zoomChanged = true;

    } else {

        console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
        scope.enableZoom = false;

    }

}

function dollyOut( dollyScale,scope ) {

    if ( scope.camera.isPerspectiveCamera ) {

        scale *= dollyScale;

    } else if ( scope.camera.isOrthographicCamera ) {

        scope.camera.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.camera.zoom / dollyScale ) );
        scope.camera.updateProjectionMatrix();
        zoomChanged = true;

    } else {

        console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
        scope.enableZoom = false;

    }

}

//
// event callbacks - update the object state
//

function handleMouseDownRotate( event ) {

    //console.log( 'handleMouseDownRotate' );

    rotateStart.set( event.clientX, event.clientY );

}

function handleMouseDownDolly( event ) {

    //console.log( 'handleMouseDownDolly' );

    dollyStart.set( event.clientX, event.clientY );

}

function handleMouseDownPan( event ) {

    //console.log( 'handleMouseDownPan' );

    panStart.set( event.clientX, event.clientY );

}

function handleMouseMoveRotate( event,scope ) {

    //console.log( 'handleMouseMoveRotate' );

    rotateEnd.set( event.clientX, event.clientY );
    rotateDelta.subVectors( rotateEnd, rotateStart );

    let element = scope.domElement === document ? scope.domElement.body : scope.domElement;

    // rotating across whole screen goes 360 degrees around
    rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );

    // rotating up and down along whole screen attempts to go 360, but limited to 180
    rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

    rotateStart.copy( rotateEnd );

    scope.update();

}

function handleMouseMoveDolly( event,scope ) {

    //console.log( 'handleMouseMoveDolly' );

    dollyEnd.set( event.clientX, event.clientY );

    dollyDelta.subVectors( dollyEnd, dollyStart );

    if ( dollyDelta.y > 0 ) {

        dollyIn( getZoomScale(scope),scope );

    } else if ( dollyDelta.y < 0 ) {

        dollyOut( getZoomScale(scope),scope );

    }

    dollyStart.copy( dollyEnd );

    scope.update();

}

function handleMouseUp( event ) {

    // console.log( 'handleMouseUp' );

}

function handleMouseMovePan( event,scope ) {

    //console.log( 'handleMouseMovePan' );

    panEnd.set( event.clientX, event.clientY );

    panDelta.subVectors( panEnd, panStart );

    pan( scope, panDelta.x, panDelta.y );

    panStart.copy( panEnd );

    scope.update();

}

function handleMouseWheel( event,scope ) {

    // console.log( 'handleMouseWheel' );

    if ( event.deltaY < 0 ) {

        dollyOut( getZoomScale(scope),scope );

    } else if ( event.deltaY > 0 ) {

        dollyIn( getZoomScale(scope),scope );

    }

    scope.update();

}

function handleTouchStartRotate( event ) {

    //console.log( 'handleTouchStartRotate' );

    rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

}

function handleTouchStartDolly( event ) {

    //console.log( 'handleTouchStartDolly' );

    let dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
    let dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

    let distance = Math.sqrt( dx * dx + dy * dy );

    dollyStart.set( 0, distance );

}

function handleTouchStartPan( event ) {

    //console.log( 'handleTouchStartPan' );

    panStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

}

function handleTouchMoveRotate( event,scope ) {

    //console.log( 'handleTouchMoveRotate' );

    rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
    rotateDelta.subVectors( rotateEnd, rotateStart );

    let element = scope.domElement === document ? scope.domElement.body : scope.domElement;

    // rotating across whole screen goes 360 degrees around
    rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );

    // rotating up and down along whole screen attempts to go 360, but limited to 180
    rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

    rotateStart.copy( rotateEnd );

    scope.update();

}

function handleTouchMoveDolly( event,scope ) {

    //console.log( 'handleTouchMoveDolly' );

    let dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
    let dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

    let distance = Math.sqrt( dx * dx + dy * dy );

    dollyEnd.set( 0, distance );

    dollyDelta.subVectors( dollyEnd, dollyStart );

    if ( dollyDelta.y > 0 ) {

        dollyOut( getZoomScale() );

    } else if ( dollyDelta.y < 0 ) {

        dollyIn( getZoomScale() );

    }

    dollyStart.copy( dollyEnd );

    scope.update();

}

function handleTouchMovePan( event,scope ) {

    //console.log( 'handleTouchMovePan' );

    panEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

    panDelta.subVectors( panEnd, panStart );

    pan( scope, panDelta.x, panDelta.y );

    panStart.copy( panEnd );

    scope.update();

}

function handleTouchEnd( event ) {

    //console.log( 'handleTouchEnd' );

}

class CustomControl{
    constructor(camera, domElement){

        let scope = this;

        this.camera = camera;
        this.domElement = domElement;
        this.model = {};

        // Set to false to disable this control
        this.enabled = true;

        // "target" sets the location of focus, where the camera orbits around
        this.target = new THREE.Vector3();

        // How far you can dolly in and out ( PerspectiveCamera only )
        this.minDistance = 0;
        this.maxDistance = Infinity;

        // How far you can zoom in and out ( OrthographicCamera only )
        this.minZoom = 0;
        this.maxZoom = Infinity;

        // How far you can orbit vertically, upper and lower limits.
        // Range is 0 to Math.PI radians.
        this.minPolarAngle = 0; // radians
        this.maxPolarAngle = Math.PI; // radians

        // How far you can orbit horizontally, upper and lower limits.
        // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
        this.minAzimuthAngle = - Infinity; // radians
        this.maxAzimuthAngle = Infinity; // radians

        // Set to true to enable damping (inertia)
        // If damping is enabled, you must call controls.update() in your animation loop
        this.enableDamping = false;
        this.dampingFactor = 0.25;

        // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
        // Set to false to disable zooming
        this.enableZoom = true;
        this.zoomSpeed = 1.0;
        // Set to false to disable rotating
        this.enableRotate = true;
        this.rotateSpeed = 1.0;

        // Set to false to disable panning
        this.enablePan = true;

        // Set to true to automatically rotate around the target
        // If auto-rotate is enabled, you must call controls.update() in your animation loop
        this.autoRotate = false;
        this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

        // The four arrow keys
        this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

        // Mouse buttons
        this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };

        // for reset
        this.target0 = this.target.clone();
        this.position0 = this.camera.position.clone();
        this.zoom0 = this.camera.zoom;

        function onMouseWheel( event ) {

            if ( scope.enabled === false || scope.enableZoom === false || ( state !== STATE.NONE && state !== STATE.ROTATE ) ) return;

            event.preventDefault();
            event.stopPropagation();

            handleMouseWheel( event,scope );

            scope.dispatchEvent( startEvent ); // not sure why these are here...
            scope.dispatchEvent( endEvent );

        }
        function onContextMenu( event ) {

            if ( scope.enabled === false ) return;

            event.preventDefault();

        }
        function onDblClick( event ) {
            event.preventDefault();
            mouse.x = ( (event.clientX -  scope.domElement.getBoundingClientRect().left) / scope.domElement.clientWidth ) * 2 - 1;
            mouse.y = - ( (event.clientY - scope.domElement.getBoundingClientRect().top) / scope.domElement.clientHeight ) * 2 + 1;

            raycaster.setFromCamera( mouse, scope.camera );

            let intersects = raycaster.intersectObjects( scope.model.children, true );
            if ( intersects.length > 0 ) {
                scope.target.set(intersects[ 0 ].point.x,intersects[ 0 ].point.y,intersects[ 0 ].point.z);
            }
            else{
                scope.target.set(0,0,0)
            }
        }
        function onMouseDown( event ) {

            if ( scope.enabled === false ){
                return;
            }

            event.preventDefault();

            switch ( event.button ) {

                case scope.mouseButtons.ORBIT:

                    if ( scope.enableRotate === false ) return;

                    handleMouseDownRotate( event,scope );

                    state = STATE.ROTATE;

                    break;

                case scope.mouseButtons.ZOOM:

                    if ( scope.enableZoom === false ) return;

                    handleMouseDownDolly( event );

                    state = STATE.DOLLY;

                    break;

                case scope.mouseButtons.PAN:

                    if ( scope.enablePan === false ) return;

                    handleMouseDownPan( event );

                    state = STATE.PAN;

                    break;

            }

            if ( state !== STATE.NONE ) {

                scope.dispatchEvent( startEvent );

            }

        }
        function onMouseMove( event ) {

            if ( scope.enabled === false ) return;

            event.preventDefault();

            switch ( state ) {

                case STATE.ROTATE:

                    if ( scope.enableRotate === false ) return;

                    handleMouseMoveRotate( event,scope );

                    break;

                case STATE.DOLLY:

                    if ( scope.enableZoom === false ) return;

                    handleMouseMoveDolly( event,scope );

                    break;

                case STATE.PAN:

                    if ( scope.enablePan === false ) return;

                    handleMouseMovePan( event,scope );

                    break;

            }

        }
        function onMouseUp( event ) {

            if ( scope.enabled === false ) return;

            handleMouseUp( event );

            document.removeEventListener( 'mousemove', onMouseMove, false );
            document.removeEventListener( 'mouseup', onMouseUp, false );

            scope.dispatchEvent( endEvent );

            state = STATE.NONE;

        }
        function onTouchStart( event ) {

            if ( scope.enabled === false ) return;

            switch ( event.touches.length ) {

                case 1:	// one-fingered touch: rotate

                    if ( scope.enableRotate === false ) return;

                    handleTouchStartRotate( event,scope );

                    state = STATE.TOUCH_ROTATE;

                    break;

                case 2:	// two-fingered touch: dolly

                    if ( scope.enableZoom === false ) return;

                    handleTouchStartDolly( event,scope );

                    state = STATE.TOUCH_DOLLY;

                    break;

                case 3: // three-fingered touch: pan

                    if ( scope.enablePan === false ) return;

                    handleTouchStartPan( event,scope );

                    state = STATE.TOUCH_PAN;

                    break;

                default:

                    state = STATE.NONE;

            }

            if ( state !== STATE.NONE ) {

                scope.dispatchEvent( startEvent );

            }

        }
        function onTouchMove( event ) {

            if ( scope.enabled === false ) return;

            event.preventDefault();
            event.stopPropagation();

            switch ( event.touches.length ) {

                case 1: // one-fingered touch: rotate

                    if ( scope.enableRotate === false ) return;
                    if ( state !== STATE.TOUCH_ROTATE ) return; // is this needed?...

                    handleTouchMoveRotate( event,scope );

                    break;

                case 2: // two-fingered touch: dolly

                    if ( scope.enableZoom === false ) return;
                    if ( state !== STATE.TOUCH_DOLLY ) return; // is this needed?...

                    handleTouchMoveDolly( event,scope );

                    break;

                case 3: // three-fingered touch: pan

                    if ( scope.enablePan === false ) return;
                    if ( state !== STATE.TOUCH_PAN ) return; // is this needed?...

                    handleTouchMovePan( event,scope );

                    break;

                default:

                    state = STATE.NONE;

            }

        }
        function onTouchEnd( event ) {

            if ( scope.enabled === false ) return;

            handleTouchEnd( event );

            scope.dispatchEvent( endEvent );

            state = STATE.NONE;

        }

        this.domElement.addEventListener( 'wheel', onMouseWheel, false );
        this.domElement.addEventListener( 'contextmenu', onContextMenu, false );
        this.domElement.addEventListener( 'mousedown', onMouseDown, false );
        this.domElement.addEventListener( 'mousemove', onMouseMove, false );
        this.domElement.addEventListener( 'mouseup', onMouseUp, false );
        this.domElement.addEventListener( 'touchstart', onTouchStart, false );
        this.domElement.addEventListener( 'touchend', onTouchEnd, false );
        this.domElement.addEventListener( 'touchmove', onTouchMove, false );
        this.domElement.addEventListener( 'dblclick', onDblClick, false);

        this.dispose = function (){
            this.domElement.removeEventListener( 'wheel', onMouseWheel, false );
            this.domElement.removeEventListener( 'contextmenu', onContextMenu, false );
            this.domElement.removeEventListener( 'mousedown', onMouseDown, false );
            this.domElement.removeEventListener( 'mousemove', onMouseMove, false );
            this.domElement.removeEventListener( 'mouseup', onMouseUp, false );
            this.domElement.removeEventListener( 'touchstart', onTouchStart, false );
            this.domElement.removeEventListener( 'touchend', onTouchEnd, false );
            this.domElement.removeEventListener( 'touchmove', onTouchMove, false );
            this.domElement.removeEventListener( 'dblclick', onDblClick, false);
        };
    }

    setModel(model){
        this.model = model
    }

    dispatchEvent(){
        return THREE.EventDispatcher.prototype
    }

    reset(){
        this.target.copy( this.target0 );
        this.camera.position.copy( this.position0 );
        this.camera.zoom = this.zoom0;

        this.camera.updateProjectionMatrix();
        this.dispatchEvent( changeEvent );

        this.update();
    }

    update(){
        let offset = new THREE.Vector3();

        // so camera.up is the orbit axis
        let quat = new THREE.Quaternion().setFromUnitVectors( this.camera.up, new THREE.Vector3( 0, 1, 0 ) );
        let quatInverse = quat.clone().inverse();

        let lastPosition = new THREE.Vector3();
        let lastQuaternion = new THREE.Quaternion();

        let scope = this;

        let position = scope.camera.position;

        offset.copy( position ).sub( scope.target );

        // rotate offset to "y-axis-is-up" space
        offset.applyQuaternion( quat );

        // angle from z-axis around y-axis
        spherical.setFromVector3( offset );

        if ( scope.autoRotate && state === STATE.NONE ) {

            rotateLeft( getAutoRotationAngle(scope) );

        }

        spherical.theta += sphericalDelta.theta;
        spherical.phi += sphericalDelta.phi;

        // restrict theta to be between desired limits
        spherical.theta = Math.max( scope.minAzimuthAngle, Math.min( scope.maxAzimuthAngle, spherical.theta ) );

        // restrict phi to be between desired limits
        spherical.phi = Math.max( scope.minPolarAngle, Math.min( scope.maxPolarAngle, spherical.phi ) );

        spherical.makeSafe();

        spherical.radius *= scale;

        // restrict radius to be between desired limits
        spherical.radius = Math.max( scope.minDistance, Math.min( scope.maxDistance, spherical.radius ) );

        // move target to panned location
        scope.target.add( panOffset );

        offset.setFromSpherical( spherical );

        // rotate offset back to "camera-up-vector-is-up" space
        offset.applyQuaternion( quatInverse );

        position.copy( scope.target ).add( offset );

        scope.camera.lookAt( scope.target );

        if ( scope.enableDamping === true ) {

            sphericalDelta.theta *= ( 1 - scope.dampingFactor );
            sphericalDelta.phi *= ( 1 - scope.dampingFactor );

        } else {

            sphericalDelta.set( 0, 0, 0 );

        }

        scale = 1;
        panOffset.set( 0, 0, 0 );

        // update condition is:
        // min(camera displacement, camera rotation in radians)^2 > EPS
        // using small-angle approximation cos(x/2) = 1 - x^2 / 8

        if ( zoomChanged ||
            lastPosition.distanceToSquared( scope.camera.position ) > EPS ||
            8 * ( 1 - lastQuaternion.dot( scope.camera.quaternion ) ) > EPS ) {

            scope.dispatchEvent( changeEvent );

            lastPosition.copy( scope.camera.position );
            lastQuaternion.copy( scope.camera.quaternion );
            zoomChanged = false;

            return true;

        }

        return false;

    }
}

export {CustomControl}