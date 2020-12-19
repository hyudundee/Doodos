import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
    Col, Panel, Form, FormGroup, FormControl, ControlLabel,
    ButtonToolbar, Button, Alert, Row, Image, Grid,
} from 'react-bootstrap';
import withToast from '../withToast.jsx';
import GroupItem from "./GroupItem.jsx";
import api from "../api.js";
import PostItem from "../Discover/PostItem.jsx";

class CategoryDashboard extends React.Component {
    constructor() {
        super();
        this.state = { posts: [] };
    }

    componentDidMount() {
        const { posts } = this.state;
        if (posts.length === 0) this.loadData();
    }

    async loadData() {
        const posts = await api.get("/posts");
        if (posts) {
            this.setState({ posts: posts.data });
        }
    }

    render() {
        const { posts } = this.state;
        // Have to convert the object before use
        const postsObject = [];
        for (let k in posts) {
            postsObject.push(posts[k]);
        }
        const postItems = postsObject.map((post) => (
            <Col xs={12} sm={6} md={4} key={post._id}><PostItem post={post} /></Col>
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
