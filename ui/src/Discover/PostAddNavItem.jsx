import React from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom';
import {
    NavItem, Glyphicon, Modal, Form, FormGroup, FormControl, ControlLabel,
    Button, ButtonToolbar, Tooltip, OverlayTrigger, Col, Checkbox,
} from 'react-bootstrap';
import withToast from '../withToast.jsx';
import PicUpload from "./PicUpload.jsx";
import axios from "axios";

class PostAddNavItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showing: false,
            postAdded: false,
            imageUrl: '',
            lat: 0,
            lng: 0,
            ideas: false,
            artworks: false,
            spotsaroundyou: false,
            fashion: false,
            activities: false,
            events: false,
            life: false
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showWarning = this.showWarning.bind(this);
        this.onUrlChange = this.onUrlChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.setState({ link: '' });
    }

    showModal() {
        this.setState({ showing: true });
    }

    hideModal() {
        this.setState({ showing: false });
    }

    onUrlChange(imageUrl) {
        this.setState({ imageUrl });
    }

    format(num) {
        return num != null ? num.toString() : '';
    }

    unformat(str) {
        const val = parseInt(str, 10);
        return Number.isNaN(val) ? null : val;
    }

    onChange(e) {
        if (e.target.value.match(/^-?\d*.?\d*$/)) {
            const { name, value } = e.target;
            if (name === "lat") {
                if (value >= -90 && value <= 90) {
                    this.setState({ [name]: e.target.value });
                } else if (value > 90) {
                    this.setState({ [name]: 90 });
                } else {
                    this.setState({ [name]: -90 });
                }
            }
            if (name === "lng") {
                if (value >= -180 && value <= 180) {
                    this.setState({ [name]: e.target.value });
                } else if (value > 180) {
                    this.setState({ [name]: 180 });
                } else {
                    this.setState({ [name]: -180 });
                }
            }
        }
    }

    onBlur(event) {
        const { name, value: textValue } = event.target;
        const naturalValue = unformat(textValue);
        const value = naturalValue === undefined ? textValue : naturalValue;
        this.setState({ [name]: value });
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.hideModal();
        const form = document.forms.postAdd;
        const category = document.getElementsByName("category");
        const categories = [];
        for (let k in category) {
            if (category[k].checked) categories.push(category[k].value);
        }
        const post = {
            title: form.title.value,
            imageUrl: this.state.imageUrl,
            text: form.description.value,
            categories: categories,
            lat: form.lat.value,
            lng: form.lng.value,
            date: new Date(),
        };
        console.log(post);
        const { user } = this.props;
        const api = axios.create({
            baseURL: '/api',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': user.token
            }
        });
        const res = await api.post('/posts', post);
        if (res) {
            const { showSuccess } = this.props;
            showSuccess("New post made.");
            const id = res.data._id;
            const link = `/post/${id}`;
            this.setState({ postAdded: true, link});
        }

    }

    showWarning() {
        const { showError } = this.props;
        showError("Sign in to make a new post.");
    }

    render() {
        const { showing, lat, lng } = this.state;
        const { user } = this.props;
        if (!user.signedIn) {
            return (
                <React.Fragment>
                    <NavItem onClick={this.showWarning}>
                        <OverlayTrigger
                            placement="left"
                            delayShow={1000}
                            overlay={<Tooltip id="create-issue">Make a New Post</Tooltip>}
                        >
                            <Glyphicon glyph="plus" />
                        </OverlayTrigger>
                    </NavItem>
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <NavItem onClick={this.showModal}>
                    <OverlayTrigger
                        placement="left"
                        delayShow={1000}
                        overlay={<Tooltip id="create-issue">Make a New Post</Tooltip>}
                    >
                        <Glyphicon glyph="plus" />
                    </OverlayTrigger>
                </NavItem>
                <Modal keyboard show={showing} onHide={this.hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Make a New Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form name="postAdd">
                            <FormGroup>
                                <ControlLabel>Title</ControlLabel>
                                <FormControl name="title" autoFocus />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Artwork</ControlLabel>
                                <PicUpload onUrlChange={this.onUrlChange} />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Description</ControlLabel>
                                <FormControl name="description" />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Categories</ControlLabel>
                                <FormGroup>
                                    <Checkbox name="category" value="ideas" onChange={this.onCategoryChange} inline>Ideas</Checkbox>
                                    {'  '}
                                    <Checkbox name="category" value="artworks" onChange={this.onCategoryChange} inline>Artworks</Checkbox>
                                    {'  '}
                                    <Checkbox name="category" value="spotsaroundyou" onChange={this.onCategoryChange} inline>Spots Around You</Checkbox>
                                    <br/>
                                    <Checkbox name="category" value="fashion" onChange={this.onCategoryChange} inline>Fashion</Checkbox>
                                    {'  '}
                                    <Checkbox name="category" value="activities" onChange={this.onCategoryChange} inline>Activities</Checkbox>
                                    {'  '}
                                    <Checkbox name="category" value="events" onChange={this.onCategoryChange} inline>Events</Checkbox>
                                    {'  '}
                                    <Checkbox name="category" value="life" onChange={this.onCategoryChange} inline>Life</Checkbox>
                                </FormGroup>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Latitude</ControlLabel>
                                <FormControl
                                    name="lat"
                                    value={lat}
                                    onChange={this.onChange}
                                    onBlur={this.onBlur}
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Longitude</ControlLabel>
                                <FormControl
                                    name="lng"
                                    value={lng}
                                    onChange={this.onChange}
                                    onBlur={this.onBlur}
                                />                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <ButtonToolbar>
                            <Button
                                type="button"
                                bsStyle="primary"
                                onClick={this.handleSubmit}
                            >
                                Submit
                            </Button>
                            <Button bsStyle="link" onClick={this.hideModal}>Cancel</Button>
                        </ButtonToolbar>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}

export default withToast(withRouter(PostAddNavItem));
