import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
    NavItem, Glyphicon, Modal, Form, FormGroup, FormControl, ControlLabel,
    Button, ButtonToolbar, Tooltip, OverlayTrigger, Col,
} from 'react-bootstrap';

import withToast from '../withToast.jsx';
import Post from "./Post.jsx";
import axios from "axios";
import api from "../api";

class PostItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showing: false,
            post: null
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.likePost = this.likePost.bind(this);
        this.unlikePost = this.unlikePost.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        const { id } = this.props;
        const post = await api.get(`/posts/${id}`);
        if (post) {
            this.setState({ post: post.data });
        }
    }

    showModal() {
        this.setState({ showing: true });
    }

    hideModal() {
        this.setState({ showing: false });
    }

    async likePost() {
        const { user, id, showError } = this.props;
        if (user != null) {
            try {
                const api = axios.create({
                    baseURL: '/api',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.token
                    }
                });
                await api.put(`/posts/like/${id}`);
                this.loadData();
            } catch (err) {
                console.error(err.message);
            }
            this.setState({ liked: true});
        } else {
            showError("Must sign in to like posts.");
        }
    }

    async unlikePost() {
        const { user, id, showError } = this.props;
        if (user != null) {
            try {
                const api = axios.create({
                    baseURL: '/api',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.token
                    }
                });
                await api.put(`/posts/unlike/${id}`);
                this.loadData();
            } catch (err) {
                console.error(err.message);
            }
        } else {
            showError("Must sign in to unlike posts.");
        }
    }

    render() {
        const { showing, post } = this.state;
        const { user } = this.props;
        // Have to convert the object before use
        const postObject = {};
        for (let k in post) {
            postObject[k] = post[k];
        }
        const likes = [];
        for (let k in postObject.likes) {
            likes.push(postObject.likes[k].user);
        }
        const link = `/post/${postObject._id}/`;
        const authorLink = `/user/${postObject.user}/`;
        const like = <div align="right"><Button bsSize="xsmall" onClick={this.likePost}><Glyphicon glyph="heart" /></Button></div>;
        const liked = <div align="right"><Button bsStyle="primary" bsSize="xsmall" onClick={this.unlikePost}><Glyphicon glyph="heart" /></Button></div>;
        const likeModal = <Button type="button" bsStyle="primary" onClick={this.likePost}>Like</Button>;
        const likedModal = <Button type="button" bsStyle="warning" onClick={this.unlikePost}>Liked</Button>;
        return (
            <React.Fragment>
                <div className="grid">
                    <figure className="effect-sadie" onClick={this.showModal}>
                        <img src={postObject.imageUrl} alt="img01"/>
                        <figcaption>
                            <p>{postObject.title}</p>
                            <a href={link} data-toggle="modal" data-target="#theModal">View more</a>
                        </figcaption>
                    </figure>
                </div>
                <div>
                    <div align="left" style={{float: 'left'}}><Link to={authorLink}>{postObject.name}</Link></div>
                    {likes.includes(user)? liked:like}
                </div>
                <p></p><p></p>
                <Modal keyboard show={showing} onHide={this.hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{postObject.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Post id={postObject._id} />
                    </Modal.Body>
                    <Modal.Footer>
                        <ButtonToolbar style={{float: "right"}}>
                            {likes.includes(user)? likedModal:likeModal}
                            <Button bsStyle="link" onClick={this.hideModal}>Back</Button>
                        </ButtonToolbar>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}

export default withToast(withRouter(PostItem));
