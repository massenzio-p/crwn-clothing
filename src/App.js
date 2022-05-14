import './App.css';
import HomePage from './pages/homepage/homepage.component';
import {Route, Routes, Navigate} from "react-router-dom";
import ShopPage from "./pages/shop/shoppage.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import {auth, createUserProfileDocument} from "./firebase/firebase.utils";
import {onSnapshot} from 'firebase/firestore';
import React from "react";
import {connect} from "react-redux";
import {setCurrentUser} from "./redux/user/user.actions";

class App extends React.Component {

    componentDidMount() {
        const {setCurrentUser} = this.props;

        auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                onSnapshot(userRef, snapShot => {
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data()
                    });
                })
            } else {
                setCurrentUser(userAuth)
            }

        })
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <Routes>
                    <Route exact path='/' element={<HomePage/>}/>
                    <Route path='/shop' element={<ShopPage/>}/>
                    <Route path='/signIn'
                           element={<SignInAndSignUpPage/>}
                           render={() => this.props.currentUser ? (<Navigate to='/' /> ) : (<SignInAndSignUpPage/>)}
                    />
                </Routes>
            </div>
        )
    };
}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
