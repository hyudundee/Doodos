import React from 'react';
import {withRouter, Link, Redirect} from 'react-router-dom';
import {
    NavItem, Glyphicon, Modal, Form, FormGroup, FormControl, ControlLabel,
    Button, ButtonToolbar, Tooltip, OverlayTrigger, Col,
} from 'react-bootstrap';

import withToast from '../withToast.jsx';
import Post from "../Discover/Post.jsx";
import axios from "axios";

class PostItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postDeleted: false,
            showing: false,
            showingDelete: false
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.showDelete = this.showDelete.bind(this);
        this.hideDelete = this.hideDelete.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    showModal() {
        this.setState({ showing: true });
    }

    hideModal() {
        this.setState({ showing: false });
    }

    showDelete() {
        this.setState({ showingDelete: true });
    }

    hideDelete() {
        this.setState({ showingDelete: false });
    }

    async handleDelete(e) {
        const { post, showSuccess } = this.props;
        const postObject = {};
        for (let k in post) {
            postObject[k] = post[k];
        }
        e.preventDefault();
        const api = axios.create({
            baseURL: '/api',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.token
            }
        });
        try {
            await api.delete(`/posts/${postObject._id}`);
            this.setState({ postDeleted: true });
            showSuccess("Post deleted.");
        }
        catch (err) {
            console.error(err);
        }

    }

    render() {
        const { showing, showingDelete, postDeleted } = this.state;
        const { post } = this.props;

        if (postDeleted) return <meta httpEquiv="refresh" content="1"/>;
        // Have to convert the object before use
        const postObject = {};
        for (let k in post) {
            postObject[k] = post[k];
        }
        const link = `/post/${postObject._id}/`;
        const authorLink = `/user/${postObject.user}/`;
        const editLink = `/edit/${postObject._id}/`;
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
                    <div align="right">
                        <Link to={editLink} >
                            <Button bsSize="xsmall"><Glyphicon glyph="edit" /></Button>
                        </Link>
                        <Button bsSize="xsmall" onClick={this.showDelete}><Glyphicon glyph="trash" /></Button>
                    </div>
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
                            <Link to={editLink} >
                                <Button bsStyle="primary">Edit</Button>
                            </Link>
                            <Button
                                bsStyle="danger"
                                onClick={this.showDelete}
                            >
                                Delete
                            </Button>
                            <Button bsStyle="link" onClick={this.hideModal}>Back</Button>
                        </ButtonToolbar>
                    </Modal.Footer>
                </Modal>
                <Modal keyboard bsSize="small" show={showingDelete} onHide={this.hideDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title>{`Are you sure to delete ${postObject.title}?`}</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <ButtonToolbar style={{float: "right"}}>
                            <Button
                                bsStyle="danger"
                                onClick={this.handleDelete}
                            >
                                Yes
                            </Button>
                            <Button bsStyle="primary" onClick={this.hideDelete}>No</Button>
                        </ButtonToolbar>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}

export default withToast(withRouter(PostItem));
