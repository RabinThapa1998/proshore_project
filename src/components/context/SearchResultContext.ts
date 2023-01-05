import { createContext, Dispatch } from 'react';
import { IReducerAction } from '~/types';

export const SearchResultContext = createContext<Dispatch<IReducerAction>>(() => null);
