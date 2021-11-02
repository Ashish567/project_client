import SignUp from './Screens/SignUp/SignUp';
import Login from './Screens/Login/Login';
import Home from './Screens/Home/Home';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/home" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
