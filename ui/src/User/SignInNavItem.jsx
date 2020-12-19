import React from 'react';
import {
    NavItem, Modal, Button, NavDropdown, MenuItem,
} from 'react-bootstrap';
import withToast from '../withToast.jsx';
import SignIn from "./SignIn.jsx";
import {Link} from "react-router-dom";
import axios from "axios";
import {LinkContainer} from "react-router-bootstrap";
import Register from "./Register.jsx";

class SignInNavItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showing: false,
            signedIn: null,
            loading: true,
            user: null,
            register: false,
            signedOut: false
        };
        if (localStorage.token) {
            this.state ={ user: { token: localStorage.token }};
            console.log(`set ${this.state.user}`);
        }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.signOut = this.signOut.bind(this);
        this.switchToSignIn = this.switchToSignIn.bind(this);
        this.switchToSignUp = this.switchToSignUp.bind(this);
    }

    async signOut() {
        const { onUserChange } = this.props;
        localStorage.removeItem('token');
        onUserChange({ signedIn: false, token: null });
        this.setState({ signedOut: true });
    }

    showModal() {
        this.setState({ showing: true });
    }

    hideModal() {
        this.setState({ showing: false });
    }

    switchToSignUp() {
        this.setState({ register: true });
    }

    switchToSignIn() {
        this.setState({ register: false });
    }

    render() {
        const { user } = this.props;
        console.log(user);
        console.log(localStorage.token);
        if (user.token && user.signedIn) {
            return (
                <NavDropdown title={user.name} id="user">
                    <LinkContainer to="/dashboard/">
                        <MenuItem>Dashboard</MenuItem>
                    </LinkContainer>
                    <MenuItem onClick={this.signOut}>Sign out</MenuItem>
                </NavDropdown>
            );
        }

        if (this.state.signedOut) return <meta httpEquiv="refresh" content="1"/>;

        const { showing, register } = this.state;
        const { showSuccess, showError, onUserChange } = this.props;
        const signIn = <SignIn showSuccess={showSuccess} showError={showError} onUserChange={onUserChange}/>;
        const signUp = <Register showSuccess={showSuccess} showError={showError} onUserChange={onUserChange}/>

        const signUpSwitch = <p className="my-1" style={{float: "left"}}>
            Don't have an account? <br/>
            <Button bsStyle="link" onClick={this.switchToSignUp}>Sign Up</Button>
        </p>;

        const signInSwitch = <p className="my-1" style={{float: "left"}}>
            Already have an account? <br/>
            <Button bsStyle="link" onClick={this.switchToSignIn}>Sign In</Button>
        </p>;

        return (
            <>
                <NavItem onClick={this.showModal}>
                    Sign in
                </NavItem>
                <Modal keyboard show={showing} onHide={this.hideModal} bsSize="sm">
                    <Modal.Header closeButton>
                        <Modal.Title className="large text-primary">{register? "Sign up":"Sign in"}</Modal.Title>
                    </Modal.Header>
                    {/* eslint-disable-next-line react/jsx-pascal-case */}
                    <Modal.Body>
                        {register? signUp:signIn}
                    </Modal.Body>
                    <Modal.Footer>
                        {register? signInSwitch:signUpSwitch}
                        <Button onClick={this.hideModal} style={{float: "right", height: "40px"}}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default withToast(SignInNavItem);
