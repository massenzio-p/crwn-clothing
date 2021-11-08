import './App.css';
import HomePage from './pages/homepage/homepage.component';
import {Route, Switch} from "react-router-dom";
import ShopPage from "./pages/homepage/shop/shoppage.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import {auth} from "./firebase/firebase.utils";
import React from "react";

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            currentUser: null
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            this.setState({ currentUser: user})
        })
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route path='/shop' component={ShopPage}/>
                    <Route path='/signIn' component={SignInAndSignUpPage}/>
                </Switch>
            </div>
        )
    };
}

export default App;
