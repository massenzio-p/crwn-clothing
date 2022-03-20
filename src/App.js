import './App.css';
import HomePage from './pages/homepage/homepage.component';
import { Route, Routes } from "react-router-dom";
import ShopPage from "./pages/homepage/shop/shoppage.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { onSnapshot } from 'firebase/firestore';
import React from "react";
import { connect } from "react-redux";
import {setCurrentUser} from "./redux/user/user.actions";

class App extends React.Component {

    componentDidMount() {
        const { setCurrentUser } = this.props;

        auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                onSnapshot(userRef, snapShot => {
                    setCurrentUser({
                        currentUser: {
                            id: snapShot.id,
                            ...snapShot.data()
                        }});
                })
            } else {
                setCurrentUser({ currentUser: userAuth})
            }

        })
    }

    render() {
        return (
            <div className="App">
                <Header />
                <Routes>
                    <Route exact path='/' component={HomePage}/>
                    <Route path='/shop' component={ShopPage}/>
                    <Route path='/signIn' component={SignInAndSignUpPage}/>
                </Routes>
            </div>
        )
    };
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps) (App);
