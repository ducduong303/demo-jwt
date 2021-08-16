import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Home from './page/Home';
function App() {
    // let isLogin = localStorage.getItem("isLogin", true)
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
