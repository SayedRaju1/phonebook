import { createMuiTheme } from '@material-ui/core/styles';

export const customTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#00955C"
        },
        secondary: {
            main: "#E5FAF2"
        }
    },
    typography: {
        fontFamily: "'Century Gothic',sans-serif",
        h1: {
            fontSize: "30px",
            color: '#333333',
            fontWeight: '600'
        },
        h2: {
            fontSize: "24px",
            fontWeight: "500",

        },
        h3: {
            fontSize: "20px",
            fontWeight: "500",

        },
        h4: {
            fontSize: "70px",
            fontWeight: "600",

        },
        subtitle1: {
            fontSize: "20px",
            fontWeight: "400"
        },
        subtitle2: {
            fontSize: "17px",
            fontWeight: "400"
        },
        body1: {
            fontSize: "15px",
        },
        button: {
            textTransform: "none",
        },
    }

});

