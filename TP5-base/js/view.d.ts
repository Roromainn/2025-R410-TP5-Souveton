/**
 * Main view
 */
export declare class View {
    private renderer;
    private scene;
    private camera;
    private cube;
    constructor(c: HTMLCanvasElement);
    render(): void;
    addCube(): void;
    addAmbientLight(): void;
    addSpotLight(): void;
    addFloor(): void;
}
//# sourceMappingURL=view.d.ts.map