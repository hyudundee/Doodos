import PostItem from "./PostItem.jsx";
import {Col, Panel, Row} from "react-bootstrap";
import React from "react";
import api from "../api.js";
import axios from "axios";

export default class PostPanel extends React.Component {
    constructor() {
        super();
        this.state = { posts: [], user: null, loading: true };
    }

    componentDidMount() {
        const { posts } = this.state;
        if (posts.length === 0) this.loadData();
    }

    async loadData() {
        if (localStorage.token) {
            const sss = axios.create({
                baseURL: '/api',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.token
                }
            });
            const profile = await sss.get('/profile/me');
            if (profile) {
                this.setState({ profile: profile.data });
                const profileObject = {};
                for (let k in profile.data) {
                    profileObject[k] = profile.data[k];
                }
                this.setState({ user: profileObject.user._id });
            }
        }
        const posts = await api.get("/posts");
        if (posts) {
            this.setState({ posts: posts.data });
        }
        this.setState({ loading: false });
    }

    render() {
        const { posts, user, loading } = this.state;
        if (loading) return null;
        // Have to convert the object before use
        const postsObject = [];
        for (let k in posts) {
            postsObject.push(posts[k]);
        }
        const postItems = postsObject.map((post) => (
            <Col xs={12} sm={6} md={3} key={post._id}><PostItem id={post._id} user={user} /></Col>
        ));
        return (
            <Panel>
                <Panel.Heading>
                    <Panel.Title>What's New</Panel.Title>
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
