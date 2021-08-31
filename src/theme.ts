import {createTheme, ThemeOptions} from '@material-ui/core/styles';
import {red} from '@material-ui/core/colors';
import {Breakpoint} from '@material-ui/core/styles/createBreakpoints';
import {Theme, Transitions, TransitionsOptions} from '@material-ui/core';
// Create a theme instance.
const createMyTheme = (options: ThemeOptions): Theme => {
    return createTheme({
        breakpoint: 'lg',
        ...options,
    }) as any;
};
const theme: Theme = createMyTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
        text: {
            primary: '#232528',
            secondary: '#45484a',
        },
    },
});

export default theme;

declare module '@material-ui/core/styles/createTheme' {
    interface Theme {
        zIndex: ZIndex;
        breakpoint: Breakpoint;
        transitions: Transitions;
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        zIndex?: Partial<ZIndex>;
        breakpoint?: Breakpoint;
        transitions?: TransitionsOptions;
        pallette?: PaletteOptions;
    }

    interface PaletteOptions {
        mode?: string;
    }
}

interface ZIndex {
    mobileStepper: number;
    speedDial: number;
    appBar: number;
    drawer: number;
    modal: number;
    snackbar: number;
    tooltip: number;
}
