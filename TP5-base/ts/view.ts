import * as Three from 'three';

/**
 * Main view
 */
export class View
{
    private renderer: Three.WebGLRenderer;
    private scene: Three.Scene; 
    private camera:  Three.PerspectiveCamera;
    
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
        this.renderer.render(this.scene, this.camera);
    }

    public addCube()
    {
        let geom = new Three.BoxGeometry(10, 10, 10);
        let matos = new Three.MeshPhongMaterial({color: "#2bfb4e"});
        let obj = new Three.Mesh(geom, matos);
        obj.position.x = 0 ;
        obj.position.y = 0 ;
        obj.position.z = 0 ;
        obj.rotation.x = 0.5 ;
        obj.rotation.y = 0.5 ;
        this.scene.add(obj);
    }  
    
    public addAmbientLight()
    {
        let light = new Three.AmbientLight("#ffffff", 0.3);
        this.scene.add(light);
    }

    public addSpotLight()
    {
        let light = new Three.SpotLight("#ffffff", 1);
        light.position.set(20, 20, 20);
        light.decay = 0.1;
        this.scene.add(light);
    }


}

