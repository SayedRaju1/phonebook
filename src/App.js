import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Contacts from './components/Contacts';
import Header from './components/Header';
import { ThemeProvider } from '@material-ui/core';
import { customTheme } from './theme/Theme';

function App() {
  return (
    <div style={{ backgroundColor: '#F8FFFC', height: '100vh' }}>
      <ThemeProvider theme={customTheme}>
        <Router>
          <Header />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/contacts" component={Contacts} />
            <Route path="/" component={Login} />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
