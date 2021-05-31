import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#ffac33',
        main: '#ff9800',
        dark: '#b26a00',
        contrastText: '#fff',
      },
      secondary: {
        light: '#33abb8',
        main: '#0097a7',
        dark: '#006974',
        contrastText: '#fff',
      },
    },
});