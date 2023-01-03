import { RigidBody } from "./RigidBody";
import { Vec3 } from "./Vec3";

export class ContactSet {
    A: RigidBody;
    B: RigidBody;

    /**
     * Contact point / position
     */
    p = new Vec3(0.0, 0.0, 0.0);

    /**
     * Contact normal
     */
    n = new Vec3(0.0, 0.0, 0.0);

    /**
     * Penetration depth?
     */
    d: number = 0.0;

    /**
     * Relative velocity
     */
    vrel = new Vec3(0.0, 0.0, 0.0);

    /**
     * Normal velocity
     */
    vn: number = 0;

    /**
     *  Coefficient of restitution
     */
    e: number = 0;

    friction: number = 0;

    lambdaN: number = 0;

    constructor(A: RigidBody, B: RigidBody) {
        this.A = A;
        this.B = B;
    }
};