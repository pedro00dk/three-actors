import * as Three from 'three';
/**
 * Base class for Actors, Actors are the elements that run actions and manipulate elements in the scene. By default,
 * they have access to the scene and camera through accessor methods.
 */
export declare class Actor {
    private getScene;
    protected scene: Three.Scene;
    private setScene;
    private getCamera;
    protected camera: Three.Camera;
    private setCamera;
    /**
     * Sets the accessors. This method shall not be called, except by the manager.
     *
     * @param getScene the scene get accessor
     * @param setScene the scene set accessor
     * @param getCamera the camera get accessor
     * @param setCamera the camera set accessor
     */
    setup(getScene: () => Three.Scene, setScene: (scene: Three.Scene) => void, getCamera: () => Three.Camera, setCamera: (scene: Three.Camera) => void): void;
    /**
     * Called once when the manager starts, it is usually used to configure elements.
     */
    start(): void;
    /**
     * Called after the manager starts and in every update.
     *
     * @param delta delta time in seconds since last update
     */
    update(delta: number): void;
}
