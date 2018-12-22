class ContentLoader {

    constructor() {
        this.loader = new THREE.GLTFLoader();
    }

    load(resource, scene) {
        this.loader.load(
            this.contentRoot + resource,
            function ( gltf ) {
                var scale = 5.6;

                var bus = {};

                bus.body = gltf.scene.children[0];
                bus.body.name = "body";
                bus.body.rotation.set(0);
                bus.body.scale.set(0);
                bus.body.position.set (0);
                bus.body.castShadow = true;
                bus.frame.add(bus.body);

                scene.add(bus)
            },
            function() {},
            function(error) {
                console(error);
            }
        );
    }
}
