import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Contacts from './components/Contacts';
import Header from './components/Header';
import { ThemeProvider } from '@material-ui/core';
import { customTheme } from './theme/Theme';
import { createContext, useState } from 'react';

export const AuthContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loggedinUser, setLoggedinUser] = useState({})
  const [token, setToken] = useState('')
  return (
    <div style={{ backgroundColor: '#F8FFFC', height: '100vh' }}>
      <AuthContext.Provider value={[isAuthenticated, setIsAuthenticated, loggedinUser, setLoggedinUser, token, setToken]}>
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
      </AuthContext.Provider>
    </div>
  );
}

export default App;
