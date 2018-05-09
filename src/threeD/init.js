import {Scene,Clock,WebGLRenderer,PerspectiveCamera,LoadingManager,AnimationMixer,AmbientLight,DirectionalLight,Box3,Vector3,CubeTextureLoader,RGBFormat,Mesh,TextureLoader,Camera,PlaneGeometry,MeshBasicMaterial,Texture} from 'three'
import {GLTFLoader} from './GLTFLoader'
import {CustomControl} from './OrbitControls'

let scene,camera,renderer,controls,mixer,ambient,dirLight;
let model;
let clock;

let backgroundMesh, backgroundScene, backgroundCamera;

let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

let cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

let myReq;

let defaultAngle = Math.PI / 2;

function init(data,loadStatus,transparentBack,disableAnimate){
    // Create the scene and set the scene size.
    clock = new Clock();
    scene = new Scene();

    let container = document.getElementById('container');
    let canvas = document.getElementById('canvas');
    let WIDTH = container.offsetWidth,
        HEIGHT = container.offsetHeight;

    // Create a renderer and add it to the DOM.
    renderer = new WebGLRenderer({
        antialias:true,
        preserveDrawingBuffer: true,
        alpha: true
    });
    renderer.setSize(WIDTH, HEIGHT);
    if(transparentBack){
        renderer.setClearColor(0x000000, 0);
    }
    else{
        renderer.setClearColor(0x575761, 1);
    }
    renderer.autoClear = false;
    canvas.appendChild(renderer.domElement);

    // Create a camera, zoom it out from the model a bit, and add it to the scene.
    camera = new PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
    camera.position.set(500,5,0);
    scene.add(camera);

    window.addEventListener('resize',changed,false);

    //todo:simplify code
    document.addEventListener("fullscreenchange", changed);
    document.addEventListener("webkitfullscreenchange", changed);
    document.addEventListener("mozfullscreenchange", changed);
    document.addEventListener("MSFullscreenChange", changed);
    function changed(){
        let WIDTH = container.offsetWidth,
            HEIGHT = container.offsetHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
    }

    let percentComplete = 0;
    let onProgress = ( xhr ) => {
        if(xhr.total){
            percentComplete = xhr.loaded / xhr.total * 100;
        }
        else{
            percentComplete = xhr.loaded / data.model_url.size * 100;
        }
        // console.log( Math.round(percentComplete) + '% downloaded' );
        loadStatus.loadPercent = percentComplete - 1
    };
    let onError = function ( xhr ) {};

    let manager = new LoadingManager();
    manager.onProgress =  ( item, loaded, total ) => {
        // console.log( item, loaded, total );
        if(loaded === total){
            loadStatus.loadPercent = 100;
            loadStatus.loadCom = true
        }
    };

    let loader = new GLTFLoader( manager );
    loader.load(data.model_url.dir + data.model_url.file,model => {
        let animations = model.animations;
        if ( animations && animations.length && disableAnimate ) {
            mixer = new AnimationMixer( model.scene );
            for ( let i = 0; i < animations.length; i ++ ) {
                let animation = animations[ i ];
                mixer.clipAction( animation ).play();
            }
        }
        let envMap = getEnvMap();
        // scene.background = envMap;
        model.scene.traverse( function( node ) {
            if ( node.material && ( node.material.isMeshStandardMaterial || ( node.material.isShaderMaterial && node.material.envMap !== undefined ) ) ) {
                node.material.envMap = envMap;
                node.material.needsUpdate = true;
            }
        } );
        initModel(model.scene,data.edit)
    },onProgress,onError);

    controls = new CustomControl(camera, renderer.domElement);
    controls.target.set(0,0,0);
    controls.enableDamping = true;
    controls.enableZoom = true;

    addLight();

    backgroundScene = new Scene();
    backgroundCamera = new Camera();
    backgroundScene.add( backgroundCamera );
}

function addLight(){
    // add light
    ambient = new AmbientLight( 0xffffff , 2 );
    scene.add( ambient );

    dirLight = new DirectionalLight( 0xffffff, 0.9 );
    dirLight.color.setHSL( 0.1, 1, 0.95 );
    dirLight.position.set( -1, 1.75, 1 );
    dirLight.position.multiplyScalar( 50 );
    scene.add( dirLight );

    // let dirLight2 = new DirectionalLight( 0xffffff, 1 );
    // dirLight2.color.setHSL( 0.1, 1, 0.95 );
    // dirLight2.position.set( 1, -1.75, 1 );
    // dirLight2.position.multiplyScalar( 50 );
    // scene.add( dirLight2 );
}

function animate() {
    renderer.clear();
    if(backgroundCamera instanceof Camera){
        renderer.render( backgroundScene, backgroundCamera );
    }
    renderer.render(scene, camera);
    if (mixer) {
        mixer.update(clock.getDelta());
    }
    controls.update();
    myReq = requestAnimationFrame(animate);
}

function initModel(modelData,editData){
    model = modelData;
    controls.setModel(model);
    let box = new Box3().setFromObject( model );
    model.scale.copy(new Vector3(100 / box.max.x, 100 / box.max.x, 100 / box.max.x));
    box = new Box3().setFromObject( model );
    model.position.set(0,-box.max.y / 2,0);

    if(editData.scene){
        let keys = Object.keys(editData.scene.straighten);
        keys.forEach(key => {
            let value = editData.scene.straighten[key];
            if(value !== 0){
                for(let i = 0;i<Math.abs(value / 1);i++){
                    rotateModel(key,value > 0?1:-1)
                }
            }
        });
    }
    if(editData.scene){
        let type = editData.scene.background.style;
        let value = editData.scene.background.value;
        changeBackground({type,value})
    }
    if(editData.light){
        changeLight(editData.light.brightness)
    }

    scene.add(model);
}

function getEnvMap(url = 'https://model-static.oss-cn-shanghai.aliyuncs.com/dev/skybox/') {
    let format = '.jpg';
    let urls = [
        url + 'px' + format, url + 'nx' + format,
        url + 'py' + format, url + 'ny' + format,
        url + 'pz' + format, url + 'nz' + format
    ];
    let envMap = new CubeTextureLoader().load( urls );
    envMap.format = RGBFormat;
    return envMap;
}

function rotateModel(direction,value){
    switch(direction){
        case 'x':
            model.rotation.x = model.rotation.x + defaultAngle * value;
            break;
        case 'y':
            model.rotation.y = model.rotation.y + defaultAngle * value;
            break;
        case 'z':
            model.rotation.z = model.rotation.z + defaultAngle * value;
            break;
        default:
            break;
    }
}

function getCanvasImage() {
    return renderer.domElement.toDataURL()
}

function start(data,loadStatus,transparentBack,disableAnimate){
    init(data,loadStatus,transparentBack,disableAnimate);
    animate()
}

function disposeNode (parentObject) {
    parentObject.traverse(function (node) {
        if (node instanceof Mesh) {
            if (node.geometry) {
                node.geometry.dispose();
            }
            if (node.material) {
                node.material.dispose()
            }
        }
    });
}

function stop() {
    cancelAnimationFrame(myReq);
    controls.dispose();
    scene.remove(model);
    disposeNode(model);
    model = null;
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.context=undefined;
    renderer.domElement.remove();
}

function clearAllBack(){
    renderer.setClearColor(0x000000, 0);
    scene.background = '';
    if(backgroundMesh){
        backgroundScene.remove(backgroundMesh);
    }
}

function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function changeBackground({type,value}) {
    switch (type){
        case 'none':
            clearAllBack();
            break;
        case 'image':
            clearAllBack();
            // let image = new Image();
            // image.crossOrigin = "Anonymous";
            // image.onload = function () {
            //     let texture = new Texture( this );
            //     texture.needsUpdate = true;
            //     backgroundMesh = new Mesh(
            //         new PlaneGeometry(2, 2, 0),
            //         new MeshBasicMaterial({
            //             map: texture
            //         })
            //     );
            //
            //     backgroundMesh.material.depthTest = false;
            //     backgroundMesh.material.depthWrite = false;
            //
            //     backgroundScene.add( backgroundMesh );
            // };
            // image.src = value;
            let loader = new TextureLoader();
            loader.setCrossOrigin('anonymous');
            loader.load(value,(image)=>{
                backgroundMesh = new Mesh(
                    new PlaneGeometry(2, 2, 0),
                    new MeshBasicMaterial({
                        map: image
                    })
                );

                backgroundMesh.material.depthTest = false;
                backgroundMesh.material.depthWrite = false;

                backgroundScene.add( backgroundMesh );
            });

            break;
        case 'color':
            clearAllBack();
            let _value = hexToRgb(value);
            renderer.setClearColor(`rgb(${_value.r}, ${_value.g}, ${_value.b})`, 1);
            break;
        case 'environment':
            clearAllBack();
            let envMap = getEnvMap(value);
            scene.background = envMap;
            break;
        default:
            break;
    }
}

function changeLight(value){
    ambient.intensity = value;
    dirLight.intensity = value
}

function showWireframe(value){
    console.log(value)
    model.traverse(node => {
        if(node instanceof Mesh){
            node.material.wireframe = value;
        }
    })
}

export {getCanvasImage,start,stop,rotateModel,changeBackground,changeLight,showWireframe}