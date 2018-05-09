/**
 * Created by harryliu on 10/5/17.
 */
class ThreeObj{
    constructor(model){
        this.modelUrl = model.modelUrl;
        this.textureUrl = model.textureUrl;
        this.type = model.type;
        this.modelPath = model.modelPath;
        this.texturePath = model.texturePath;
    }

    init(){
        let obj = this;
        // Create the scene and set the scene size.
        this.scene = new THREE.Scene();
        let WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight;

        // Create a renderer and add it to the DOM.
        this.renderer = new THREE.WebGLRenderer({antialias:true});
        this.renderer.setSize(WIDTH, HEIGHT);
        document.body.appendChild(this.renderer.domElement);

        // Create a camera, zoom it out from the model a bit, and add it to the scene.
        this.camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
        this.camera.position.set(600,5,0);
        this.scene.add(this.camera);

        obj.windowResize(obj);

        obj.setBackColor(obj);

        obj.addLight(obj);

        obj.addLoading(obj);

        obj.addControl(obj);

        if(this.type === 'json'){
            //Load in the mesh and add it to the scene.
            let loader = new THREE.JSONLoader();
            loader.load( this.modelUrl, function(geometry){
                let material = new THREE.MeshLambertMaterial({color: 0x55B663});
                let mesh = new THREE.Mesh(geometry, material);
                obj.scene.add(mesh);
            });
        }
        else if(this.type === 'obj'){
            //texture
            if(obj.textureUrl){
                let mtlLoader = new THREE.MTLLoader( obj.manager );
                mtlLoader.setPath(obj.texturePath);
                mtlLoader.load( obj.textureUrl, function ( materials ) {
                    materials.preload();
                    // model
                    let objLoader = new THREE.OBJLoader( obj.manager );
                    //objLoader.setMaterials( materials );
                    objLoader.setPath(obj.modelPath);
                    objLoader.load( obj.modelUrl, function ( object ) {
                        object.position.y = - 95;
                        obj.scene.add( object );
                    }, obj.onProgress, obj.onError );
                });
            }
            else{
                let objLoader = new THREE.OBJLoader( obj.manager );
                //objLoader.setMaterials( materials );
                objLoader.setPath(obj.modelPath);
                objLoader.load( obj.modelUrl, function ( object ) {
                    object.position.y = - 95;
                    obj.scene.add( object );
                }, obj.onProgress, obj.onError );
            }

        }
        // else if(this.type === 'fbx'){
        //     let loader = new THREE.FBXLoader( obj.manager );
        //     let mixers = [];
        //     loader.load( 'mht/MHT.fbx', function( object ) {
        //         object.mixer = new THREE.AnimationMixer( object );
        //         mixers.push( object.mixer );
        //         let action = object.mixer.clipAction( object.animations[ 0 ] );
        //         action.play();
        //         obj.scene.add( object );
        //     }, obj.onProgress, obj.onError );
        // }

    }

    windowResize(obj){
        // Create an event listener that resizes the renderer with the browser window.
        window.addEventListener('resize', function() {
            let WIDTH = window.innerWidth,
                HEIGHT = window.innerHeight;
            obj.renderer.setSize(WIDTH, HEIGHT);
            obj.camera.aspect = WIDTH / HEIGHT;
            obj.camera.updateProjectionMatrix();
        });
    }

    setBackColor(obj){
        // Set the background color of the scene.
        obj.renderer.setClearColor(0x333F47, 1);
    }

    addLight(obj){
        let ambient = new THREE.AmbientLight( 0x404040 , 1 );
        obj.scene.add( ambient );
//
////            // Create a light, set its position, and add it to the scene.
//            let directionalLight = new THREE.DirectionalLight( 0xffeedd );
//            directionalLight.position.set( 0, 0, 1 ).normalize();
//            obj.scene.add( directionalLight );
//
//            let directionalLight2 = new THREE.DirectionalLight( 0xffeedd );
//            directionalLight2.position.set( 0, 0, -1 ).normalize();
//            obj.scene.add( directionalLight2 );
//
//            let directionalLight3 = new THREE.DirectionalLight( 0xffeedd );
//            directionalLight3.position.set( 1, 0, 0 ).normalize();
//            obj.scene.add( directionalLight3 );
//
//            let directionalLight4 = new THREE.DirectionalLight( 0xffeedd );
//            directionalLight4.position.set( -1, 0, 0 ).normalize();
//            obj.scene.add( directionalLight4 );


        // LIGHTS

//            let hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
//            hemiLight.color.setHSL( 0.6, 1, 0.6 );
//            hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
//            hemiLight.position.set( 0, 500, 0 );
//            obj.scene.add( hemiLight );

        //

        let dirLight = new THREE.DirectionalLight( 0xffffff, 0.9 );
        dirLight.color.setHSL( 0.1, 1, 0.95 );
        dirLight.position.set( -1, 1.75, 1 );
        dirLight.position.multiplyScalar( 50 );
        obj.scene.add( dirLight );


        let dirLight2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
        dirLight2.color.setHSL( 0.1, 1, 0.95 );
        dirLight2.position.set( 1, -1.75, 1 );
        dirLight2.position.multiplyScalar( 50 );
        obj.scene.add( dirLight2 );
    }

    addLoading(obj){
        // loading
        obj.manager = new THREE.LoadingManager();
        obj.manager.onProgress = function ( item, loaded, total ) {
            console.log( item, loaded, total );
        };
        obj.onProgress = function ( xhr ) {
            if ( xhr.lengthComputable ) {
                let percentComplete = xhr.loaded / xhr.total * 100;
                console.log( Math.round(percentComplete, 2) + '% downloaded' );
            }
        };
        obj.onError = function ( xhr ) {};
    }

    addControl(obj){
        // Add OrbitControls so that we can pan around with the mouse.
        obj.controls = new THREE.OrbitControls(obj.camera, obj.renderer.domElement);
    }

    animate(){
        // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
        requestAnimationFrame(this.animate.bind(this));
        // Render the scene.
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
    }
}

export default ThreeObj;