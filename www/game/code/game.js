class Game {

    constructor() {
        this.contentLoader = new ContentLoader();
        this.contentLoader.contentRoot = "../";

        this.init();
    }

    init() {
        this.scene = new THREE.Scene();

        var camera = new THREE.PerspectiveCamera( 75, 400 / 700, .1, 1000 );
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( 400, 700 );
        
        document.body.appendChild( renderer.domElement );

        this.loadContent();
    }

    loadContent() {
        this.contentLoader.load("bus_body_red.glb", this.scene)
    }

    update() {

    }

    draw() {

    }
}