import React from 'react';

/**
 * Custom hook that listens for presses of keys
 * and runs the corresponding arbitrary callback.
 *
 * The keys of the `callbacks` object should be the
 * same key for the KeyboardEvent.
 *
 * Example)
 * { ArrowUp: () => { console.log('arrow up key was pressed') } }
 */
export default function useKeyboardListeners(callbacks) {
    function onKeyDown(e) {
        if (callbacks[e.key]) {
            callbacks[e.key](e);
        }
    }

    React.useEffect(() => {
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    });
}
