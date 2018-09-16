import { WebGLRenderer, Scene, PerspectiveCamera, Clock } from 'three';

/**
 * Base class for Actors, Actors are the elements that run actions and manipulate elements in the scene. By default,
 * they have access to the scene and camera through accessor methods.
 */
var Actor = /** @class */ (function () {
    function Actor() {
        // Getters and setters for scene and camera
        this.getScene = function () { return null; };
        this.setScene = function (scene) { };
        this.getCamera = function () { return null; };
        this.setCamera = function (camera) { };
    }
    Object.defineProperty(Actor.prototype, "scene", {
        get: function () {
            return this.getScene();
        },
        set: function (scene) {
            this.setScene(scene);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Actor.prototype, "camera", {
        get: function () {
            return this.getCamera();
        },
        set: function (camera) {
            this.setCamera(camera);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the accessors. This method shall not be called, except by the manager.
     *
     * @param getScene the scene get accessor
     * @param setScene the scene set accessor
     * @param getCamera the camera get accessor
     * @param setCamera the camera set accessor
     */
    Actor.prototype.setup = function (getScene, setScene, getCamera, setCamera) {
        this.getScene = getScene;
        this.setScene = setScene;
        this.getCamera = getCamera;
        this.setCamera = setCamera;
    };
    /**
     * Called once when the manager starts, it is usually used to configure elements.
     */
    Actor.prototype.start = function () { };
    /**
     * Called after the manager starts and in every update.
     *
     * @param delta delta time in seconds since last update
     */
    Actor.prototype.update = function (delta) { };
    return Actor;
}());

/**
 * Configures the Three library, create scene components, start and update functions, listeners and callbacks.
 */
var Manager = /** @class */ (function () {
    /**
     * Initializes the Manager with the target canvas.
     *
     * @param canvas renderer target canvas
     * @param options renderer options (canvas option shall be set)
     */
    function Manager(options) {
        var _this = this;
        // Getters and setters for scene and camera
        this.getScene = function () { return _this.scene; };
        this.setScene = function (scene) { return _this.scene = scene; };
        this.getCamera = function () { return _this.camera; };
        this.setCamera = function (camera) { return _this.camera = camera; };
        this.canvas = options.canvas;
        if (!this.canvas)
            throw new Error('canvas option shall be set');
        this.context = this.canvas.getContext('webgl');
        this.initialize(options);
    }
    /**
     * Initializes renderer, scene and camera elements and configures the basic Three components and a resize listener
     *
     * @param options renderer options
     */
    Manager.prototype.initialize = function (options) {
        var _this = this;
        this.renderer = new WebGLRenderer(options);
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // updates renderer and camera on page resize
        window.addEventListener('resize', function (e) {
            _this.renderer.setSize(_this.canvas.parentElement.clientWidth, _this.canvas.parentElement.clientHeight);
            var camera = _this.camera;
            if (camera) {
                camera.aspect = _this.canvas.parentElement.clientWidth / _this.canvas.parentElement.clientHeight;
                camera.updateProjectionMatrix();
            }
        });
    };
    /**
     * Initializes and configures all actors then starts to render.
     *
     * @param actors list of Actors
     */
    Manager.prototype.start = function (actors) {
        var _this = this;
        actors.forEach(function (a) { return a.setup(_this.getScene, _this.setScene, _this.getCamera, _this.setCamera); });
        var clock = new Clock();
        // creates the update animation frame
        var updateLoop = function () {
            window.requestAnimationFrame(updateLoop);
            var delta = clock.getDelta();
            actors.forEach(function (a) { return a.update(delta); });
            if (!_this.renderer || !_this.scene || !_this.camera)
                return;
            _this.renderer.render(_this.scene, _this.camera);
        };
        // initializes rendering loop
        actors.forEach(function (a) { return a.start(); });
        updateLoop();
    };
    return Manager;
}());

export { Actor, Manager };
