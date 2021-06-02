import React from 'react';
import store from '../store';

export const Context = React.createContext(store);
export const useStore = () => React.useContext(Context);
