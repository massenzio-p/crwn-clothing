import './App.css';
import HomePage from './pages/homepage/homepage.component';
import {Route, Switch} from "react-router-dom";
import ShopPage from "./pages/homepage/shop/shoppage.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import {auth, createUserProfileDocument} from "./firebase/firebase.utils";
import {onSnapshot} from 'firebase/firestore';
import React from "react";

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            currentUser: null
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                onSnapshot(userRef, snapShot => {
                    this.setState({
                        currentUser: {
                            id: snapShot.id,
                            ...snapShot.data()
                        }
                    }, () => console.log(this.state ));
                })
            } else {
                this.setState({ currentUser: userAuth})
            }

        })
    }

    render() {
        return (
            <div className="App">
                <Header currentUser={this.state.currentUser}/>
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
