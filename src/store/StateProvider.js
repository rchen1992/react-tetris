import React from 'react';
import StateContext from './StateContext';
import defaultState from './defaultState';

function StateProvider(props) {
    const [grid, setGrid] = React.useState(defaultState.grid);

    const state = React.useMemo(() => ({ grid }), [grid]);

    return <StateContext.Provider value={state}>{props.children}</StateContext.Provider>;
}

export default StateProvider;
