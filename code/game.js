class Game {

    constructor() {
        this.contentLoader = new ContentLoader();
        this.contentLoader.contentRoot = "./game/resources/";

        this.init();
        this.animate();
    }

    init() {
        this.scene = new THREE.Scene();

     //   var camera = new THREE.PerspectiveCamera(75, 400 / 700, .1, 1000 );
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( 700, 700 );

        var ambientLight = new THREE.AmbientLight( 0x40404040, 5 );
        this.scene.add( ambientLight );
        
        this.camera = new THREE.PerspectiveCamera( 100, 1, 0.25, 5000 );
        this.camera.position.set( -2, 0, 4 );

        var controls = new THREE.OrbitControls( this.camera );
        controls.target.set( 0, - 0.2, - 0.2 );
        controls.update();

        document.body.appendChild( this.renderer.domElement );

        
        this.loadContent();
    }

    loadContent() {
        // this.contentLoader.load("cube4.gltf", "/", this.scene)
        // this.contentLoader.load("DamagedHelmet.gltf", "/", this.scene)
        // this.contentLoader.loadObj("male02.obj", this.scene)
        // this.contentLoader.loadCollada("elf.dae", this.scene)
        this.contentLoader.loadCollada("box/box.dae", this.scene)
        // this.contentLoader.loadFbx("Samba Dancing.fbx", this.scene)
        // this.contentLoader.loadFbx("cube8.fbx", this.scene)
    }

    update() {

    }

    draw() {

    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.renderer.render( this.scene, this.camera );
    }
}