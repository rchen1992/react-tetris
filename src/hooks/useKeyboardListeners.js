import React from 'react';

/**
 * Custom hook that listens for presses of keys
 * and runs the corresponding arbitrary callback.
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
