import React from 'react';
import StateContext from './StateContext';

export { default as StateProvider } from './StateProvider';

export function useStore() {
    return React.useContext(StateContext);
}
