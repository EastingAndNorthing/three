import * as THREE from 'three'
import { PointLight } from '../light/PointLight';

export class BaseLightingScene extends THREE.Scene {

    constructor() {
        super();

        const ground = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100), 
            new THREE.MeshPhongMaterial({
                color: 0x444444, 
            })
        );
        ground.rotation.x = -Math.PI / 2;
        ground.position.z = 0;
        this.add( ground )

        const p1 = new PointLight(this, 0xf2ddc5);
        p1.light.castShadow = true;
        p1.light.position.set(7, 10, 3);

        const p2 = new PointLight(this, 0xd6deed);
        p2.light.position.set(-7, 10, -3);

        // const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
        // this.add( directionalLight );

        const ambientLight = new THREE.AmbientLight( 0x404040 );
        this.add( ambientLight );

    }

}
