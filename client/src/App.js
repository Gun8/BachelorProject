import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React from "react";
import "./App.css";
import EntryPage from "./components/entryPage";
import 'react-notifications-component/dist/theme.css';
import Navbar from './components/navbar';
//import About from './pages/about';
import PrivateRout from './components/privateRoute';
import Balance from './components/balance';
import Emissions from './components/emissions';
import Homepage from './components/homepage';
import './components/analytics/analytics.css';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation
} from "react-router-dom";

class App extends React.Component{

render(){
    return (
        <>
            <Router>
                <Switch>
                    <Route exact  path='/'  component={EntryPage} />
                    <Route path="/:id">
                        <div className = "main-page">
                            <Navbar/>
                            <Switch>
                                <PrivateRout  path='/home' exact>
                                    <Homepage/>
                                </PrivateRout>
                                <PrivateRout  path='/balance' >
                                    <Balance/>
                                </PrivateRout>
                                <PrivateRout  path='/emissions' >
                                    <Emissions/>
                                </PrivateRout>
                                <PrivateRout  path='*'>
                                    <NoMatch />
                                </PrivateRout>
                            </Switch>
                        </div>
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

}
function NoMatch() {
    let location = useLocation();

    return (
        <div>
            <h3>
                No match for <code>{location.pathname}</code>
            </h3>
        </div>
    );
}


/*<PrivateRout  path='/about' exact>
                                    <About/>
                                </PrivateRout>*/






export default App;
