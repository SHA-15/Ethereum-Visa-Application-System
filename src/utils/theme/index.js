import { createTheme as cT} from '@mui/material';
import textSettings from './typography';

const muiTheme = cT({
    palette: {
        mode: "dark",
        primary: {
            main: "rgba(139, 69, 209, 1)"
        },
        background: {
            default: "rgba(6, 7, 10, 1)"
        },
        text: {
            primary: "rgba(255, 255, 255, 1)",
            secondary: "rgba(255, 255, 255, 0.6)"
        }
    },
    typography: textSettings
});

export default muiTheme;