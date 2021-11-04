import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Main, CryptoDetails } from './pages';
import { Header } from './components';

function App() {
  return (
    <div>
      <Header/>
        <div className="mt-4">
          <Switch>
            <Route exact path="/">
              <Main/>
            </Route>
            <Route exact path="/crypto/:coinId">
              <CryptoDetails/>
            </Route>
            <Redirect to="/"></Redirect>  
          </Switch>
        </div>      
    </div>
  );
}

export default App;
