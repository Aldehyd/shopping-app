import {createContext} from 'react';

interface ThemeContextInterface {
    theme: string,
    changeTheme?: (color: string)=> void
}

const ThemeContext = createContext<ThemeContextInterface>({theme: '#CD13C6'});

export default ThemeContext;