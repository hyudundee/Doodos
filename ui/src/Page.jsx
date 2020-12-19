import React from 'react';
import {
    Navbar, Nav, NavItem, NavDropdown, Grid, Col,
    MenuItem, Glyphicon,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PostAddNavItem from './Discover/PostAddNavItem.jsx';
import Contents from './Routing/Contents.jsx';
import SignInNavItem from './User/SignInNavItem.jsx';
import axios from "axios";
import CartNavItem from "./Store/CartNavItem.jsx";

function NavBar({ user, onUserChange }) {
    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>Doodos</Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <LinkContainer exact to="/discover/">
                    <NavItem>Discover</NavItem>
                </LinkContainer>
                <LinkContainer to="/category/">
                    <NavItem>Category</NavItem>
                </LinkContainer>
                <LinkContainer exact to="/doodlemaps/">
                    <NavItem>DoodleMaps</NavItem>
                </LinkContainer>
                <LinkContainer exact to="/store/">
                    <NavItem>Store</NavItem>
                </LinkContainer>
            </Nav>

            <Nav pullRight>
                <PostAddNavItem user={user} onUserChange={onUserChange} />
                <CartNavItem user={user} onUserChange={onUserChange} />
                <SignInNavItem user={user} onUserChange={onUserChange} />
                <NavDropdown
                    id="user-dropdown"
                    title={<Glyphicon glyph="option-vertical" />}
                    noCaret
                >
                    <LinkContainer to="/about">
                        <MenuItem>About</MenuItem>
                    </LinkContainer>
                </NavDropdown>
            </Nav>
        </Navbar>
    );
}

export default class Page extends React.Component {
    constructor(props) {
        super(props);
        const token = localStorage.token ? localStorage.token : null;
        this.state = { user: { token, signedIn: false } };
        this.onUserChange = this.onUserChange.bind(this);
    }

    componentDidMount() {
        const { user: { token } }  = this.state;
        if (token == null) {
        } else {
            this.loadData();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { user: { signedIn:  prevStatus } } = prevState;
        const { user: { signedIn: currStatus } } = this.state;
        if (prevStatus !== currStatus) {
            console.log("updated");
            this.loadData();
        }
    }

    async loadData() {
        if (localStorage.token) {
            const { user: { token } }  = this.state;
            if (localStorage.token === token) {
                const sss = axios.create({
                    baseURL: '/api',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': token
                    }
                });
                const user = await sss.get('/auth');
                this.setState({ user: { name: user.data.name, signedIn: true, token } });
            }
        } else {
            this.setState({ user: { name: "", signedIn: false, token: null } });
        }
    }

    onUserChange(user) {
        this.setState({ user });
    }

    render() {
        const { user } = this.state;
        if (user == null) return null;

        return (
            <div>
                <NavBar user={user} onUserChange={this.onUserChange} />
                <Grid fluid bsClass="contents">
                    <Contents />
                </Grid>
            </div>
        );
    }
}
