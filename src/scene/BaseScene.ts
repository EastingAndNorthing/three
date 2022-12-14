import * as THREE from 'three'
// import { OrbitControls } from '@three-ts/orbit-controls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RigidBody } from '../physics/RigidBody';
import { Vec3 } from '../physics/Vec3';
import { World } from '../physics/World';

export interface SceneInterface {
    onActivate(): void;
    onDeactivate(): void;
    init(): void;
    update(time: number, dt: number, keys: Record<string, boolean>): void;
}

export class BaseScene implements SceneInterface {

    public active: boolean = true;

    public scene:  THREE.Scene;
    public camera: THREE.PerspectiveCamera;
    public orbitControls: OrbitControls;

    protected meshes: Array<THREE.Mesh> = [];

    public world = new World();

    constructor() {
        this.scene  = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(70, 1, 0.1, 5000);

        this.orbitControls = new OrbitControls(this.camera, document.getElementById('canvas') as HTMLCanvasElement);

        if (localStorage.getItem('cam')) {
            const state = JSON.parse(localStorage.getItem('cam')!);
            this.camera.position.copy(state.pos);
            this.orbitControls.target.copy(state.target);
            this.orbitControls.update();
        } else {
            this.camera.position.set(2, 5, 1);
        }
        // World
        // this.world.broadphase = new CANNON.SAPBroadphase(this.world);
        // this.world.defaultContactMaterial.friction = 0;

        // y-up -> z up
        // THREE.Object3D.DefaultUp.set( 0, 0, 1 );
        // this.camera.up.set( 0, 0, 1 );

        document.addEventListener('mouseup', () => {
            localStorage.setItem('cam', JSON.stringify({
                pos: this.camera.position,
                target: new Vec3(0, 1, 0)
            }))
        })
    }

    protected insert(otherScene: THREE.Scene) {
        this.scene.add(otherScene);
        this.scene.fog = otherScene.fog; // Nice hack
        this.scene.background = otherScene.background; // Nice hack
    }

    public onResize(width: number, height: number) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

    public onActivate() {}
    public onDeactivate() {}

    public init() {}
    public update(time: number, dt: number, keys: Record<string, boolean>) {}

    public updatePhysics(dt: number, enabled = true) {
        if (enabled)
            this.world.update(dt);
    }

    public addBody(body: RigidBody) {
        body.addTo(this);
    }

    public draw(renderer: THREE.WebGLRenderer) {
        renderer.render(
            this.scene,
            this.camera
        );
    }

}