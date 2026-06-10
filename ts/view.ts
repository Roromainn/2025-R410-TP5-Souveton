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

    private cameraTarget: Three.Vector3 = new Three.Vector3(0, 0, 0);

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
        this.initEventListeners(c);
        this.render();
    }

    public render()
    {
        if (this.cube) {
            this.cube.rotation.y += 0.01;
        }
        this.camera.lookAt(this.cameraTarget);
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

    private initEventListeners(canvas: HTMLCanvasElement)
    {
        canvas.tabIndex = 1;
        canvas.style.outline = "none";
        canvas.addEventListener('wheel', (event: WheelEvent) => {
            this.camera.position.z += event.deltaY * 0.05;
            if (this.camera.position.z < 5) 
                this.camera.position.z = 5;
            if (this.camera.position.z > 500) 
                this.camera.position.z = 500;
        });

        canvas.addEventListener('mousemove', (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            const mouseX = ((event.clientX - rect.left) / width)*2-1;
            const mouseY = -((event.clientY - rect.top) / height)*2+1;
            this.cameraTarget.x = mouseX * 20;
            this.cameraTarget.y = mouseY * 20;
        });

        canvas.addEventListener('keydown', (event: KeyboardEvent) => {
            const step = 1.0;

            switch (event.key) {
                case 'ArrowUp':
                case 'z':
                case 'Z':
                    this.camera.position.y += step;
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    this.camera.position.y -= step;
                    break;
                case 'ArrowLeft':
                case 'q':
                case 'Q':
                    this.camera.position.x -= step;
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    this.camera.position.x += step;
                    break;
            }
        });
    }
}