import React from 'react';

/**
 * Custom hook that listens for presses of keys
 * and runs the corresponding arbitrary callback.
 *
 * The keys of the `handlers` object should be the
 * same key for the KeyboardEvent. Example:
 *  {
 *      ArrowUp: () => { console.log('arrow up key was pressed') } ,
 *  }
 *
 * You can also provide an object with some options. Example:
 *  {
 *      ArrowUp: {
 *          callback: () => { console.log('arrow up key was pressed') },
 *          isActiveEvent: true,
 *      }
 *  }
 *
 * If `isActiveEvent` is true, the key event is handled a bit differently.
 * The callback is still fired as normal on initial key down, but then a
 * recursive setTimeout function is started to continually call the same callback
 * on an interval as long as the key is still being held down.
 *
 * Normally when you hold a key down, there is a delay between when the firing
 * of the first and second key event.
 * `isActiveEvent` is useful for responding to the holding down of a key
 * in a smooth and consistent way.
 */
export default function useKeyboardListeners(handlers, activeEventInterval = 120) {
    const activeEvent = React.useRef(null);
    const callbackLoop = React.useRef(null);

    /**
     * Keep track of which keys are current being held down.
     * Prevents default key events from continually firing on
     * holding key down.
     */
    const heldKeys = React.useRef(new Set());

    /**
     * Create ref container for handlers, so that they
     * can be accessed in callback loop.
     */
    const handlersRef = React.useRef(handlers);
    handlersRef.current = handlers;

    function onKeyDown(e) {
        if (heldKeys.current.has(e.key)) return;
        heldKeys.current.add(e.key);

        const handler = handlersRef.current[e.key];

        if (!handler) return;

        /**
         * If the handler is a function, the user supplied
         * a callback directly without specifying any other
         * options.
         */
        if (typeof handler === 'function') {
            return handler(e);
        }

        /**
         * If the key we pressed is an active event and it is different
         * from the current active event, we want to overwrite it.
         *
         * Stop the current callback loop, update the active event,
         * and then start a new callback loop.
         */
        if (handler.isActiveEvent && activeEvent.current !== e.key) {
            clearTimeout(callbackLoop.current);
            activeEvent.current = e.key;

            function runCallbackLoop() {
                callbackLoop.current = setTimeout(() => {
                    if (activeEvent.current !== null) {
                        handlersRef.current[activeEvent.current].callback();
                        runCallbackLoop();
                    }
                }, activeEventInterval);
            }

            handler.callback(e);

            runCallbackLoop();
        } else if (!handler.isActiveEvent) {
            handler.callback(e);
        }
    }

    /**
     * When we release a key and it is also the active event,
     * we should clear the active event and the callback loop.
     */
    function onKeyUp(e) {
        heldKeys.current.delete(e.key);

        if (activeEvent.current === e.key) {
            activeEvent.current = null;
            clearTimeout(callbackLoop.current);
        }
    }

    React.useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('keyup', onKeyUp);
        };
    });
}
