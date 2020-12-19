import React from "react";
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from "../api.js";
import axios from "axios";
import setAuthToken from "../setAuthToken";
import withToast from "../withToast.jsx";

export default class Register extends React.Component {
    constructor() {
        super();
        this.state = { signedIn: false, user: null, loading: true };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.state.user == null) this.loadData();
    }

    async loadData() {
        if (localStorage.token) {
            const { showSuccess, onUserChange } = this.props;
            const api = axios.create({
                baseURL: '/api',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.token
                }
            });
            const user = await api.get('/auth');
            if (user) {
                showSuccess("Already signed in.");
                onUserChange({ signedIn: true, loading: false, token: res.data.token, name: user.data.name });
                this.setState({ signedIn: true, user: user.data });
            }
        }
        this.setState({ loading: false });
    }


    async handleSubmit(e) {
        const form = document.forms.register;
        const { showSuccess, showError, onUserChange } = this.props;
        if (form.password.value !== form.password2.value) {
            showError("Passwords dont't match.");
        } else {
            try {
                const user = {
                    name: form.name.value,
                    email: form.email.value,
                    password: form.password.value,
                };
                console.log(user);
                const newUser = await api.post('/users/', user);
                if (newUser) {
                    const sss = axios.create({
                        baseURL: '/api',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-auth-token': newUser.data.token
                        }
                    });
                    const user = await sss.get('/auth');
                    const profile = await sss.post('/profile');
                    setAuthToken(newUser.data.token);
                    onUserChange({ signedIn: true, loading: false, token: newUser.data.token, name: user.data.name })
                    showSuccess("Registration success.");
                    this.setState({ signedIn: true, user: user.data, profile: profile.data });
                }
            } catch (err) {
                console.error(err.message);
            }

        }
    }

    render() {
        const { signedIn, loading } = this.state;
        if (loading) return null;
        if (signedIn) return <meta httpEquiv="refresh" content="1"/>;

        return (
            <React.Fragment>
                <div>
                    <p className="lead">
                        <i className="fas fa-user" /> Create Your Account
                    </p>
                    <form className="form" name="register">
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Email Address"
                                name="email"
                            /> <br/>
                            <small className="form-text">
                                This site uses Gravatar so if you want a profile image, use a
                                Gravatar email
                            </small>
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name="password2"
                            />
                        </div>
                        <input
                            type="button"
                            value="Register"
                            className="btn btn-primary"
                            onClick={this.handleSubmit}
                        />
                    </form>
                </div>
            </React.Fragment>
        );
    }
}
