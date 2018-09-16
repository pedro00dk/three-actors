import * as Three from 'three';
import { Actor } from './actor';
/**
 * Configures the Three library, create scene components, start and update functions, listeners and callbacks.
 */
export declare class Manager {
    private canvas;
    private context;
    private renderer;
    private scene;
    private camera;
    /**
     * Initializes the Manager with the target canvas.
     *
     * @param canvas renderer target canvas
     * @param options renderer options (canvas option shall be set)
     */
    constructor(options: Three.WebGLRendererParameters);
    /**
     * Initializes renderer, scene and camera elements and configures the basic Three components and a resize listener
     *
     * @param options renderer options
     */
    private initialize;
    /**
     * Initializes and configures all actors then starts to render.
     *
     * @param actors list of Actors
     */
    start<T extends Actor>(actors: T[]): void;
    private getScene;
    private setScene;
    private getCamera;
    private setCamera;
}
