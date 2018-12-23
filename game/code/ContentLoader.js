class ContentLoader {


    constructor() {
        this.contentRoot = ''
        this.object = null;
    }

    loadGLTF(resource, path, scene) {

        new THREE.GLTFLoader()
            .setPath(`${this.contentRoot}/${path}/`)
            .load(resource,
                function ( gltf ) {
                    scene.add(gltf.scene)
                },
                function() {},
                function(error) {
                    console(error);
                }
            );
    }

    loadObj(resource, scene) {


        var manager = new THREE.LoadingManager( () => {
            
            // for (var child of this.object.children) {
            //     if ( child.isMesh ) {
            //         child.material.map = this.texture;
            //     }

            // }

            this.object.traverse( ( child ) => {
                if ( child.isMesh ) 
                {
                    child.material.map = this.texture;
                }
            } );
            
            this.object.position.y = - 95;
            scene.add( this.object );
        } );

        var textureLoader = new THREE.TextureLoader( manager );
        this.texture = textureLoader.load(this.contentRoot + 'UV_Grid_Sm.jpg' );


        var loader = new THREE.OBJLoader( manager );
        loader.load(this.contentRoot + resource, ( obj ) => {
            this.object = obj;
        }, () => {}, (error) => {
            console.log(error)
        } );
    }

    loadCollada(resource, scene) {
        var manager = new THREE.LoadingManager( () => {
            scene.add( this.object );
        } );

        var loader = new THREE.ColladaLoader( manager );
            loader.load(this.contentRoot + resource, ( collada ) => {
                this.object = collada.scene;
            }
        );
    }

    loadFbx(resource, scene) {
        var loader = new THREE.FBXLoader();
        loader.load(this.contentRoot + resource, function ( object ) {
            scene.add( object );
        } );
    }
}
