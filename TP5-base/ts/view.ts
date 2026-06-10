import * as Three from 'three';

/**
 * Main view
 */
export class View
{
    private renderer: Three.WebGLRenderer;
    private scene: Three.Scene; 
    private camera:  Three.PerspectiveCamera;
    private cube!: Three.Mesh;

    constructor(c : HTMLCanvasElement)
    {
        this.renderer = new Three.WebGLRenderer({canvas: c});
        this.scene = new Three.Scene();
        this.camera = new Three.PerspectiveCamera(60, c.width / c.height, 1, 10000);
        this.camera.position.set(0, 0, 30);
        this.addCube();
        this.addAmbientLight();
        this.addSpotLight();
        this.render();

    }

    public render()
    {
        this.cube.rotation.y += 0.01;
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.render());
    }

    public addCube()
    {
        let geom = new Three.BoxGeometry(10, 10, 10);
        let matos = new Three.MeshPhongMaterial({color: "#2bfb4e"});
        this.cube = new Three.Mesh(geom, matos);
        this.cube.position.x = 0 ;
        this.cube.position.y = 0 ;
        this.cube.position.z = 0 ;
        this.cube.rotation.x = 0.5 ;
        this.cube.rotation.y = 0.5 ;
        this.scene.add(this.cube);
    }  
    
    public addAmbientLight()
    {
        let light = new Three.AmbientLight("#ffffff", 0.3);
        this.scene.add(light);
    }

    public addSpotLight()
    {
        let light = new Three.SpotLight("#ffffff", 1000);
        light.position.set(20, 20, 20);
        this.scene.add(light);
    }


}

