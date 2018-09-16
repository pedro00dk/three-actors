import * as Three from 'three'

import { Actor } from './actor'

/**
 * Configures the Three library, create scene components, start and update functions, listeners and callbacks.
 */
export class Manager {
    private canvas: HTMLCanvasElement
    private context: WebGLRenderingContext

    private renderer: Three.Renderer

    private scene: Three.Scene
    private camera: Three.Camera

    /**
     * Initializes the Manager with the target canvas.
     * 
     * @param canvas renderer target canvas
     * @param options renderer options (canvas option shall be set)
     */
    constructor(options: Three.WebGLRendererParameters) {
        this.canvas = options.canvas
        if (!this.canvas) throw new Error('canvas option shall be set')
        this.context = this.canvas.getContext('webgl')

        this.initialize(options)
    }

    /**
     * Initializes renderer, scene and camera elements and configures the basic Three components and a resize listener
     * 
     * @param options renderer options
     */
    private initialize(options: Three.WebGLRendererParameters) {
        this.renderer = new Three.WebGLRenderer(options)
        this.scene = new Three.Scene()
        this.camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
        this.renderer.setSize(window.innerWidth, window.innerHeight)

        // updates renderer and camera on page resize
        window.addEventListener(
            'resize',
            e => {
                this.renderer.setSize(this.canvas.parentElement.clientWidth, this.canvas.parentElement.clientHeight)
                let camera = this.camera as Three.PerspectiveCamera
                if (camera) {
                    camera.aspect = this.canvas.parentElement.clientWidth / this.canvas.parentElement.clientHeight
                    camera.updateProjectionMatrix()
                }
            }
        )
    }



    /**
     * Initializes and configures all actors then starts to render.
     * 
     * @param actors list of Actors 
     */
    start<T extends Actor>(actors: T[]) {

        actors.forEach(a => a.setup(this.getScene, this.setScene, this.getCamera, this.setCamera))
        let clock = new Three.Clock()

        // creates the update animation frame
        let updateLoop = () => {
            window.requestAnimationFrame(updateLoop)
            let delta = clock.getDelta()
            actors.forEach(a => a.update(delta))
            if (!this.renderer || !this.scene || !this.camera) return
            this.renderer.render(this.scene, this.camera)
        }

        // initializes rendering loop
        actors.forEach(a => a.start())
        updateLoop()
    }

    // Getters and setters for scene and camera

    private getScene = () => this.scene

    private setScene = (scene: Three.Scene) => this.scene = scene

    private getCamera = () => this.camera

    private setCamera = (camera: Three.Camera) => this.camera = camera
}