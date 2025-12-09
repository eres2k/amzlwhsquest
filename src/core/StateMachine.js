/**
 * StateMachine.js
 * Object-oriented state machine for game state management
 * Handles state transitions, lifecycle events, and state stacking
 */

export class StateMachine {
    constructor(game) {
        this.game = game;
        this.states = new Map();
        this.currentState = null;
        this.previousState = null;
        this.stateStack = [];
        this.transitionInProgress = false;
        this.nextStateQueued = null;
    }

    /**
     * Register a state
     */
    register(stateName, stateClass) {
        this.states.set(stateName, stateClass);
    }

    /**
     * Register multiple states
     */
    registerBatch(statesMap) {
        for (const [name, stateClass] of Object.entries(statesMap)) {
            this.register(name, stateClass);
        }
    }

    /**
     * Change to a new state
     */
    changeState(stateName, params = {}) {
        if (this.transitionInProgress) {
            // Queue the state change
            this.nextStateQueued = { stateName, params };
            return;
        }

        const StateClass = this.states.get(stateName);
        if (!StateClass) {
            console.error(`[StateMachine] State "${stateName}" not found`);
            return false;
        }

        this.transitionInProgress = true;

        // Exit current state
        if (this.currentState) {
            this.currentState.exit();
            this.previousState = this.currentState;
        }

        // Create and enter new state
        this.currentState = new StateClass(this.game);
        this.currentState.name = stateName;
        this.currentState.machine = this;
        this.currentState.enter(params);

        this.transitionInProgress = false;

        // Process queued state if exists
        if (this.nextStateQueued) {
            const queued = this.nextStateQueued;
            this.nextStateQueued = null;
            this.changeState(queued.stateName, queued.params);
        }

        return true;
    }

    /**
     * Push state onto stack (for pause/resume)
     */
    pushState(stateName, params = {}) {
        const StateClass = this.states.get(stateName);
        if (!StateClass) {
            console.error(`[StateMachine] State "${stateName}" not found`);
            return false;
        }

        // Pause current state
        if (this.currentState) {
            this.currentState.pause();
            this.stateStack.push(this.currentState);
        }

        // Create and enter new state
        this.currentState = new StateClass(this.game);
        this.currentState.name = stateName;
        this.currentState.machine = this;
        this.currentState.enter(params);

        return true;
    }

    /**
     * Pop state from stack
     */
    popState() {
        if (this.stateStack.length === 0) {
            console.warn('[StateMachine] Cannot pop state: stack is empty');
            return false;
        }

        // Exit current state
        if (this.currentState) {
            this.currentState.exit();
        }

        // Resume previous state
        this.currentState = this.stateStack.pop();
        this.currentState.resume();

        return true;
    }

    /**
     * Update current state
     */
    update(deltaTime) {
        if (this.currentState && this.currentState.update) {
            this.currentState.update(deltaTime);
        }
    }

    /**
     * Render current state
     */
    render(context) {
        if (this.currentState && this.currentState.render) {
            this.currentState.render(context);
        }
    }

    /**
     * Get current state name
     */
    getCurrentStateName() {
        return this.currentState ? this.currentState.name : null;
    }

    /**
     * Get current state
     */
    getCurrentState() {
        return this.currentState;
    }

    /**
     * Check if in specific state
     */
    isInState(stateName) {
        return this.currentState && this.currentState.name === stateName;
    }

    /**
     * Get previous state name
     */
    getPreviousStateName() {
        return this.previousState ? this.previousState.name : null;
    }

    /**
     * Handle input event
     */
    handleInput(event) {
        if (this.currentState && this.currentState.handleInput) {
            this.currentState.handleInput(event);
        }
    }

    /**
     * Clear all states
     */
    clear() {
        if (this.currentState) {
            this.currentState.exit();
        }
        this.currentState = null;
        this.previousState = null;
        this.stateStack = [];
    }
}

/**
 * Base State class
 * All game states should extend this
 */
export class State {
    constructor(game) {
        this.game = game;
        this.name = '';
        this.machine = null;
        this.stateTimer = 0;
        this.initialized = false;
    }

    /**
     * Called when entering the state
     */
    enter(params = {}) {
        this.stateTimer = 0;
        this.initialized = false;
        this.onEnter(params);
        this.initialized = true;
    }

    /**
     * Override in subclass for enter logic
     */
    onEnter(params) {
        // Override in subclass
    }

    /**
     * Called when exiting the state
     */
    exit() {
        this.onExit();
    }

    /**
     * Override in subclass for exit logic
     */
    onExit() {
        // Override in subclass
    }

    /**
     * Called when state is paused (pushed onto stack)
     */
    pause() {
        this.onPause();
    }

    /**
     * Override in subclass for pause logic
     */
    onPause() {
        // Override in subclass
    }

    /**
     * Called when state is resumed (popped from stack)
     */
    resume() {
        this.onResume();
    }

    /**
     * Override in subclass for resume logic
     */
    onResume() {
        // Override in subclass
    }

    /**
     * Update state logic
     */
    update(deltaTime) {
        this.stateTimer += deltaTime;
        this.onUpdate(deltaTime);
    }

    /**
     * Override in subclass for update logic
     */
    onUpdate(deltaTime) {
        // Override in subclass
    }

    /**
     * Render state
     */
    render(context) {
        this.onRender(context);
    }

    /**
     * Override in subclass for render logic
     */
    onRender(context) {
        // Override in subclass
    }

    /**
     * Handle input events
     */
    handleInput(event) {
        this.onInput(event);
    }

    /**
     * Override in subclass for input logic
     */
    onInput(event) {
        // Override in subclass
    }

    /**
     * Transition to another state
     */
    changeState(stateName, params = {}) {
        if (this.machine) {
            this.machine.changeState(stateName, params);
        }
    }

    /**
     * Push a new state onto the stack
     */
    pushState(stateName, params = {}) {
        if (this.machine) {
            this.machine.pushState(stateName, params);
        }
    }

    /**
     * Pop current state and return to previous
     */
    popState() {
        if (this.machine) {
            this.machine.popState();
        }
    }
}

/**
 * State with timer-based auto-transition
 */
export class TimedState extends State {
    constructor(game, duration = 3000, nextState = null) {
        super(game);
        this.duration = duration;
        this.nextState = nextState;
    }

    onUpdate(deltaTime) {
        super.onUpdate(deltaTime);

        if (this.stateTimer >= this.duration) {
            if (this.nextState) {
                this.changeState(this.nextState);
            } else {
                this.onTimerComplete();
            }
        }
    }

    /**
     * Override for timer completion logic
     */
    onTimerComplete() {
        // Override in subclass
    }
}

/**
 * State that waits for user input to continue
 */
export class InteractiveState extends State {
    constructor(game) {
        super(game);
        this.waitingForInput = true;
    }

    onInput(event) {
        if (this.waitingForInput && this.shouldAdvance(event)) {
            this.advance();
        }
    }

    /**
     * Override to define which input advances
     */
    shouldAdvance(event) {
        return event.type === 'keydown' && event.key === ' ';
    }

    /**
     * Override for advance logic
     */
    advance() {
        // Override in subclass
    }
}

/**
 * State Transition Manager
 * Handles smooth transitions between states
 */
export class StateTransition {
    constructor() {
        this.active = false;
        this.fadeOut = false;
        this.fadeIn = false;
        this.alpha = 0;
        this.duration = 500; // milliseconds
        this.elapsed = 0;
        this.callback = null;
    }

    /**
     * Start fade out transition
     */
    fadeOutStart(callback) {
        this.active = true;
        this.fadeOut = true;
        this.fadeIn = false;
        this.alpha = 0;
        this.elapsed = 0;
        this.callback = callback;
    }

    /**
     * Start fade in transition
     */
    fadeInStart() {
        this.active = true;
        this.fadeOut = false;
        this.fadeIn = true;
        this.alpha = 1;
        this.elapsed = 0;
    }

    /**
     * Update transition
     */
    update(deltaTime) {
        if (!this.active) return;

        this.elapsed += deltaTime;
        const progress = Math.min(this.elapsed / this.duration, 1);

        if (this.fadeOut) {
            this.alpha = progress;
            if (progress >= 1) {
                this.fadeOut = false;
                if (this.callback) {
                    this.callback();
                    this.callback = null;
                }
                this.fadeInStart();
            }
        } else if (this.fadeIn) {
            this.alpha = 1 - progress;
            if (progress >= 1) {
                this.fadeIn = false;
                this.active = false;
                this.alpha = 0;
            }
        }
    }

    /**
     * Render transition overlay
     */
    render(context, width, height) {
        if (!this.active || this.alpha <= 0) return;

        context.save();
        context.fillStyle = `rgba(0, 0, 0, ${this.alpha})`;
        context.fillRect(0, 0, width, height);
        context.restore();
    }

    /**
     * Check if transition is active
     */
    isActive() {
        return this.active;
    }
}

export default StateMachine;
