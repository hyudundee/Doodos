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

class CategoryPage extends React.Component {
    constructor() {
        super();
        this.state = { posts: [] };
    }

    componentDidMount() {
        const { posts } = this.state;
        if (posts.length === 0) this.loadData();
    }

    async loadData() {
        const { match: { params: { category } } } = this.props;
        if (category === "all") {
            const posts = await api.get("/posts");
            if (posts) {
                this.setState({ posts: posts.data });
            }
        } else {
            const posts = await api.get(`/posts/bycategory/${category}`);
            if (posts) {
                this.setState({ posts: posts.data });
            }
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
            <Col xs={12} sm={6} md={3} key={post._id}><PostItem post={post} /></Col>
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

const EventWithToast = withToast(withRouter(Event));

export default CategoryPage;
