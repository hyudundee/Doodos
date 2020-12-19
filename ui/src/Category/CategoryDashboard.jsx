import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
    Col, Panel, Form, FormGroup, FormControl, ControlLabel,
    ButtonToolbar, Button, Alert, Row, Image, Grid,
} from 'react-bootstrap';
import withToast from '../withToast.jsx';
import api from "../api.js";
import PostItem from "../Discover/PostItem.jsx";
import axios from "axios";

class CategoryDashboard extends React.Component {
    constructor() {
        super();
        this.state = { posts: [], categories: [], user: null, loading: true };
    }

    componentDidMount() {
        const { posts } = this.state;
        if (posts.length === 0) this.loadData();
    }

    async loadData() {
        if (!localStorage.token) {
            const posts = await api.get("/posts");
            if (posts) {
                this.setState({ posts: posts.data });
            }
        } else {
            try {
                const api = axios.create({
                    baseURL: '/api',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.token
                    }
                });
                const profile = await api.get('/profile/me');
                const favoriteCategories = [];
                for (let k in profile.data.favoriteCategories) {
                    favoriteCategories.push(profile.data.favoriteCategories[k]);
                }
                if (favoriteCategories.length === 0) {
                    const posts = await api.get("/posts");
                    if (posts) {
                        this.setState({ posts: posts.data });
                    }
                } else {
                    this.setState({ user: profile.data.user._id });
                    const checked = {};
                    for (let k in favoriteCategories) {
                        let category = favoriteCategories[k];
                        const postsByCategory = await api.get(`/posts/bycategory/${category}`);
                        const { posts } = this.state;
                        for (let k in postsByCategory.data) {
                            if (!checked[postsByCategory.data[k]._id]) {
                                checked[postsByCategory.data[k]._id] = true;
                                posts.push(postsByCategory.data[k]);
                            }
                        }
                    }
                }
            } catch (err) {
                console.error(err.message);
            }
        }
        this.setState({ loading: false });
    }

    render() {
        const { posts, user, loading } = this.state;
        if (loading) return <div>loading...</div>;
        // Have to convert the object before use
        const postsObject = [];
        for (let k in posts) {
            postsObject.push(posts[k]);
        }
        const postItems = postsObject.map((post) => (
            <Col xs={12} sm={6} md={4} key={post._id}><PostItem id={post._id} user={user} /></Col>
        ));
        return (
            <Panel>
                <Panel.Heading>
                    <Panel.Title>Posts for You</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <Row>
                        {postItems}
                    </Row>
                </Panel.Body>
            </Panel>
        );
    }
}

const DashboardWithToast = withToast(withRouter(CategoryDashboard));

export default DashboardWithToast;
