import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import muiTheme from './utils/theme';
import App from './App';


createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={muiTheme}>
      <Router>
        <CssBaseline />
          <App />
      </Router>
    </ThemeProvider>,
)
