import * as Three from 'three';

/**
 * Main view
 */
export class View
{
    private renderer: Three.WebGLRenderer;
    private scene: Three.Scene; 
    private camera:  Three.PerspectiveCamera;
    private cube?: Three.Mesh;
    private floor?: Three.Mesh;

    constructor(c : HTMLCanvasElement)
    {
        this.renderer = new Three.WebGLRenderer({canvas: c, antialias: true});
        this.renderer.shadowMap.enabled = true;
        this.scene = new Three.Scene();
        this.camera = new Three.PerspectiveCamera(60, c.width / c.height, 1, 10000);
        this.camera.position.set(0, 0, 30);
        this.addCube();
        this.addFloor();
        this.addAmbientLight();
        this.addSpotLight();
        this.render();
    }

    public render()
    {
        if (this.cube) {
            this.cube.rotation.y += 0.01;
        }
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.render());
    }

    public addCube()
    {
        let loader = new Three.TextureLoader();
        loader.load("img/crate.jpg", (texture) => {
            texture.anisotropy = 16;
            
            loader.load("img/crate-relief.jpg", (bumpTexture) => {
                bumpTexture.anisotropy = 16;
                
                let geom = new Three.BoxGeometry(10, 10, 10);
                let matos = new Three.MeshPhongMaterial({
                    map: texture,
                    bumpMap: bumpTexture,
                    bumpScale: 0.3
                });
                
                this.cube = new Three.Mesh(geom, matos);
                this.cube.position.set(0, 0, 0);
                this.cube.rotation.set(0.5, 0.5, 0);
                this.cube.castShadow = true;
                this.scene.add(this.cube);
            });
        });
    }
    
    public addAmbientLight()
    {
        let light = new Three.AmbientLight("#ffffff", 0.3);
        light.castShadow = true;
        this.scene.add(light);
    }

    public addSpotLight()
    {
        let light = new Three.SpotLight("#ffffff", 3000, 100);
        light.position.set(20, 20, 20);
        light.castShadow = true;
        this.scene.add(light);
    }
    
    public addFloor()
    {
        let loader = new Three.TextureLoader(); 
        loader.load("img/floor.jpg", (texture) => {
            texture.anisotropy = 16;
            
            loader.load("img/floor-relief.jpg", (bumpTexture) => {
                bumpTexture.anisotropy = 16;
                
                let geom = new Three.BoxGeometry(80, 1, 80);
                let matos = new Three.MeshPhongMaterial({
                    map: texture,
                    bumpMap: bumpTexture,
                    bumpScale: 0.3
                });
                
                this.floor = new Three.Mesh(geom, matos);
                this.floor.position.y = -10;
                this.floor.receiveShadow = true;
                this.scene.add(this.floor);
            });
        });
    }

}

