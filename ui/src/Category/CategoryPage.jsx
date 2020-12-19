import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
    Col, Panel, Form, FormGroup, FormControl, ControlLabel,
    ButtonToolbar, Button, Alert, Row, Image, Glyphicon, Thumbnail,
} from 'react-bootstrap';
import withToast from '../withToast.jsx';
import api from "../api";
import PostItem from "../Discover/PostItem.jsx";
import axios from "axios";

class CategoryPage extends React.Component {
    constructor() {
        super();
        this.state = { posts: [], loading: true };
    }

    componentDidMount() {
        const { posts } = this.state;
        if (posts.length === 0) this.loadData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { match: { params: { category: prevCate } } } = prevProps;
        const { match: { params: { category } } } = this.props;
        if (prevCate !== category) {
            this.loadData();
        }

    }

    async loadData() {
        if (localStorage.token) {
            try {
                const api = axios.create({
                    baseURL: '/api',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.token
                    }
                });
                const profile = await api.get('/profile/me');
                this.setState({ user: profile.data.user._id });
            } catch (err) {
                console.error(err.message);
            }
        }
        const { match: { params: { category } } } = this.props;
        if (category === "all") {
            const posts = await api.get("/posts");
            if (posts) {
                this.setState({ posts: posts.data });
            }
        } else {
            console.log(category);
            const posts = await api.get(`/posts/bycategory/${category}`);
            console.log(posts);
            if (posts) {
                this.setState({ posts: posts.data });
            }
        }
        this.setState({ loading: false });
    }

    render() {
        const categoryDict = {
            "all": "All Categories",
            "ideas": "Ideas",
            "artworks": "Artworks",
            "spotsaroundyou": "Spots Around You",
            "fashion": "Fashion",
            "activities": "Activities",
            "events": "Events",
            "life": "Life"
        };
        const { posts, user, loading } = this.state;
        if (loading) return <div>loading...</div>;
        // Have to convert the object before use
        const { match: { params: { category } } } = this.props;
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
                    <Panel.Title>{categoryDict[category]}</Panel.Title>
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

const EventWithToast = withToast(withRouter(Event));

export default CategoryPage;
