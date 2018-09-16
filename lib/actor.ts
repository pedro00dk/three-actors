import * as Three from 'three'

import { Manager } from './manager'

/**
 * Base class for Actors, Actors are the elements that run actions and manipulate elements in the scene. By default,
 * they have access to the scene and camera through accessor methods.
 */
export class Actor {

    // Getters and setters for scene and camera

    private getScene: () => Three.Scene = () => null

    protected get scene(): Three.Scene {
        return this.getScene()
    }

    private setScene: (scene: Three.Scene) => void = (scene: Three.Scene) => { }

    protected set scene(scene: Three.Scene) {
        this.setScene(scene)
    }

    private getCamera: () => Three.Camera = () => null

    protected get camera(): Three.Camera {
        return this.getCamera()
    }

    private setCamera: (camera: Three.Camera) => void = (camera: Three.Camera) => { }

    protected set camera(camera: Three.Camera) {
        this.setCamera(camera)
    }

    /**
     * Sets the accessors. This method shall not be called, except by the manager.
     * 
     * @param getScene the scene get accessor
     * @param setScene the scene set accessor
     * @param getCamera the camera get accessor
     * @param setCamera the camera set accessor
     */
    setup(
        getScene: () => Three.Scene, setScene: (scene: Three.Scene) => void,
        getCamera: () => Three.Camera, setCamera: (scene: Three.Camera) => void
    ) {
        this.getScene = getScene
        this.setScene = setScene
        this.getCamera = getCamera
        this.setCamera = setCamera
    }

    /**
     * Called once when the manager starts, it is usually used to configure elements.
     */
    start() { }

    /**
     * Called after the manager starts and in every update. 
     * 
     * @param delta delta time in seconds since last update
     */
    update(delta: number) { }
}