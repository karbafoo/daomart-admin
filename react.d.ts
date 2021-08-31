// declare module '@material-ui/core/styles/createTheme' {
//     interface Theme {
//         zIndex: ZIndex;
//         breakpoint: Breakpoint;
//         transitions: Transitions;
//     }
//     // allow configuration using `createTheme`
//     interface ThemeOptions {
//         zIndex?: Partial<ZIndex>;
//         breakpoint?: Breakpoint;
//         transitions?: TransitionsOptions;
//     }
// }

// interface ZIndex {
//     mobileStepper: number;
//     speedDial: number;
//     appBar: number;
//     drawer: number;
//     modal: number;
//     snackbar: number;
//     tooltip: number;
// }
// declare global {
//     namespace React {
//         interface FunctionComponent<P = {}> {
//             getInitialProps(): void;
//         }
//     }
// }

declare module 'react' {
    interface Attributes {
        sx?: SxProps;
        open?: boolean;
    }
}
interface styleProps {
    open?: boolean;
}
