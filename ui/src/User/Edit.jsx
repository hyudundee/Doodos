import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
    Col, Panel, Form, FormGroup, FormControl, ControlLabel,
    ButtonToolbar, Button, Alert, Checkbox,
} from 'react-bootstrap';
import TextInput from '../TextInput.jsx';
import withToast from '../withToast.jsx';
import axios from "axios";
import PicUpload from "../Discover/PicUpload.jsx";

class Edit extends React.Component {
    constructor() {
        super();
        this.state = {
            post: null,
            userVerified: false,
            loading: true,
            postEdited: false,
            imageUrl: '',
            formerImageUrl: '',
            ideas: false,
            artworks: false,
            spotsaroundyou: false,
            fashion: false,
            activities: false,
            events: false,
            life: false,
            lat: 0,
            lng: 0
        };
        this.onChange = this.onChange.bind(this);
        this.onUrlChange = this.onUrlChange.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onFormerUrlChange = this.onFormerUrlChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onNumChange = this.onNumChange.bind(this);
    }

    componentDidMount() {
        const { post } = this.state;
        if (post == null) this.loadData();
    }

    onFormerUrlChange(formerImageUrl) {
        this.setState({ formerImageUrl });
    }

    onUrlChange(imageUrl) {
        this.setState({ imageUrl });
    }

    onChange(event, naturalValue) {
        const { name, value: textValue } = event.target;
        const value = naturalValue === undefined ? textValue : naturalValue;
        this.setState({ [name]: value });
    }

    format(num) {
        return num != null ? num.toString() : '';
    }

    unformat(str) {
        const val = parseInt(str, 10);
        return Number.isNaN(val) ? null : val;
    }

    onNumChange(e) {
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
        const form = document.forms.postEdit;
        const { imageUrl, formerImageUrl } = this.state;
        const category = document.getElementsByName("category");
        const favoriteCategory = [];
        for (let k in category) {
            if (category[k].checked) favoriteCategory.push(category[k].value);
        }
        const url = imageUrl === ''? formerImageUrl:imageUrl;
        const post = {
            title: form.title.value,
            imageUrl: url,
            text: form.description.value,
            categories: favoriteCategory,
            lat: form.lat.value,
            lng: form.lng.value
        };
        const api = axios.create({
            baseURL: '/api',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.token
            }
        });
        const { match: { params: { id } } } = this.props;
        const res = await api.put(`/posts/byuser/${this.state.post.user}/${id}`, post);
        if (res) {
            const { showSuccess } = this.props;
            showSuccess("Post edited.");
            const id = res.data._id;
            const link = `/post/${id}`;
            this.setState({ postEdited: true, link});
        }
    }

    onCategoryChange(e) {
        const checkbox = e.target;
        if (checkbox.checked) {
            this.setState({ [checkbox.value]: true });
        } else {
            this.setState({ [checkbox.value]: false });
        }
    }

    async loadData() {
        const { match: { params: { id } } } = this.props;
        const api = axios.create({
            baseURL: '/api',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.token
            }
        });
        try {
            const post = await api.get(`/posts/${id}`);
            if (post) {
                this.setState({ post: post.data, lat: post.data.lat, lng: post.data.lng });
                const profile = await api.get('/profile/me');
                if (profile) {
                    this.setState({ profile: profile.data });
                    const profileObject = {};
                    for (let k in profile.data) {
                        profileObject[k] = profile.data[k];
                    }
                    const category = post.data.categories;
                    for (let k in category) {
                        this.setState({ [category[k]]: true });
                    }
                    const userId = profileObject.user._id;
                    if (post.data.user === userId) {
                        this.setState({ userVerified: true });
                        console.log("User verified.")
                    }
                }
            }
        } catch (err) {
            console.error(err.message);
        }
        this.setState({ loading: false });
    }

    render() {
        const { post, userVerified, loading, postEdited,
            link, ideas, artworks, spotsaroundyou,
            fashion, activities, events, life, lat, lng
        } = this.state;
        if (loading) return <div>loading...</div>;
        if (post == null) return <h3>Post not found by this id.</h3>;
        if (!userVerified) {
            return <h3>Not authorized for editing this post.</h3>
        }
        // if (postEdited) return <Redirect to={link} />;
        const postObject = {};
        for (let k in post) {
            postObject[k] = post[k];
        }
        const dateString = `${postObject.date}`;
        const date = new Date(dateString).toDateString();

        return (
            <Panel>
                <Panel.Heading>
                    <Panel.Title>{`Editing post: ${postObject.title}`}</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <Form horizontal onSubmit={this.handleSubmit} name="postEdit">
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>Last modified:</Col>
                            <Col sm={9}>
                                <FormControl.Static>
                                    {date.substr(4)}
                                </FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>Title</Col>
                            <Col sm={9}>
                                <FormControl
                                    componentClass={TextInput}
                                    size={50}
                                    name="title"
                                    value={postObject.title}
                                    onChange={this.onChange}
                                    key={postObject._id}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>Artwork</Col>
                            <Col sm={9}>
                                <PicUpload onUrlChange={this.onUrlChange} onFormerUrlChange={this.onFormerUrlChange} imageUrl={postObject.imageUrl} />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>Description</Col>
                            <Col sm={9}>
                                <FormControl
                                    componentClass={TextInput}
                                    tag="textarea"
                                    rows={4}
                                    cols={50}
                                    name="description"
                                    value={postObject.text}
                                    onChange={this.onChange}
                                    key={postObject._id}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>Categories</Col>
                            <Col sm={9}>
                                <FormGroup>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Checkbox name="category" value="ideas" checked={ideas} onChange={this.onCategoryChange} inline>Ideas</Checkbox>
                                    {' '}
                                    <Checkbox name="category" value="artworks" checked={artworks} onChange={this.onCategoryChange} inline>Artworks</Checkbox>
                                    {' '}
                                    <Checkbox name="category" value="spotsaroundyou" checked={spotsaroundyou} onChange={this.onCategoryChange} inline>Spots Around You</Checkbox>
                                    {' '}
                                    <Checkbox name="category" value="fashion" checked={fashion} onChange={this.onCategoryChange} inline>Fashion</Checkbox>
                                    {' '}
                                    <Checkbox name="category" value="activities" checked={activities} onChange={this.onCategoryChange} inline>Activities</Checkbox>
                                    {' '}
                                    <Checkbox name="category" value="events" checked={events} onChange={this.onCategoryChange} inline>Events</Checkbox>
                                    {' '}
                                    <Checkbox name="category" value="life" checked={life} onChange={this.onCategoryChange} inline>Life</Checkbox>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>Latitude</Col>
                            <Col sm={9}>
                                <FormControl
                                    size={50}
                                    name="lat"
                                    value={lat}
                                    onBlur={this.onBlur}
                                    onChange={this.onNumChange}
                                    key={postObject._id}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>Longitude</Col>
                            <Col sm={9}>
                                <FormControl
                                    size={50}
                                    name="lng"
                                    value={lng}
                                    onBlur={this.onBlur}
                                    onChange={this.onNumChange}
                                    key={postObject._id}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={3} sm={6}>
                                <ButtonToolbar>
                                    <Button
                                        bsStyle="primary"
                                        type="submit"
                                    >
                                        Submit
                                    </Button>
                                    <LinkContainer to="/dashboard/">
                                        <Button bsStyle="link">Back</Button>
                                    </LinkContainer>
                                </ButtonToolbar>
                            </Col>
                        </FormGroup>
                    </Form>
                </Panel.Body>
            </Panel>
        );
    }
}

export default withToast(Edit);
