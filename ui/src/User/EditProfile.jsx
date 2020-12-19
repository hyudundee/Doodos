import React from "react";
import {Button, ButtonToolbar, Col,
    ControlLabel, Form, FormControl,
    FormGroup, Panel, Radio, Checkbox
} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import TextInput from "../TextInput.jsx";
import withToast from "../withToast.jsx";
import {LinkContainer} from "react-router-bootstrap";
import axios from "axios";


class EditProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            loading: true,
            signedIn: true,
            profileEdited: false,
            ideas: false,
            artworks: false,
            spotsaroundyou: false,
            fashion: false,
            activities: false,
            events: false,
            life: false
        };
        this.onChange = this.onChange.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { user } = this.state;
        if (user == null) this.loadData();
    }


    onChange(event, naturalValue) {
        const { name, value: textValue } = event.target;
        const value = naturalValue === undefined ? textValue : naturalValue;
        this.setState(prevState => ({
            issue: { ...prevState.issue, [name]: value },
        }));
    }

    async loadData() {
        if (localStorage.token) {
            const api = axios.create({
                baseURL: '/api',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.token
                }
            });
            const profile = await api.get('/profile/me');
            this.setState({ profile: profile.data });
            const profileObject = {};
            for (let k in profile.data) {
                profileObject[k] = profile.data[k];
            }
            const category = profileObject.favoriteCategories;
            for (let k in category) {
                this.setState({ [category[k]]: true });
            }
            this.setState({ profile: profileObject });
            const id = profileObject.user._id;
            const user = await api.get(`/users/${id}`);
            if (user) {
                this.setState({ user: user.data });
            }
        } else {
            this.setState({ signedIn: false })
        }
        console.log(this.state.profile);
        this.setState({ loading: false })
    }

    async handleSubmit(e) {
        e.preventDefault();
        const { showSuccess, showError } = this.props;
        const category = document.getElementsByName("category");
        console.log(category);
        const favoriteCategory = [];
        for (let k in category) {
            if (category[k].checked) favoriteCategory.push(category[k].value);
        }
        console.log(favoriteCategory);
        const form = document.forms.profileEdit;
        const profile = {
            bio: form.bio? form.bio.value:null,
            status: form.status? form.status.value:null,
            location: form.location? form.location.value:null,
            twitter: form.twitter? form.twitter.value:null,
            facebook: form.facebook? form.facebook.value:null,
            instagram: form.instagram? form.instagram.value:null,
            linkedin: form.linkedin? form.linkedin.value:null,
            youtube: form.youtube? form.youtube.value:null,
            favoriteCategories: favoriteCategory
        };
        const api = axios.create({
            baseURL: '/api',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.token
            }
        });
        const newProfile = await api.post("/profile", profile);
        if (newProfile) {
            showSuccess("Profile edited.");
            this.setState({ profileEdited: true });
        } else {
            showError("Profile edit failed.");
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

    render() {
        const { loading, signedIn, profile, user,
            profileEdited, ideas, artworks, spotsaroundyou,
            fashion, activities, events, life
        } = this.state;
        if (loading) return <div>loading...</div>;
        if (!signedIn) return <div>Must sign in to edit profile.</div>;
        if (profileEdited) return <Redirect to="/dashboard/" />
        const dateString = `${profile.date}`;
        const date = new Date(dateString).toDateString();
        const social = profile.social;
        let twitter = "";
        let facebook = "";
        let instagram = "";
        let linkedin = "";
        let youtube = "";
        if (social) {
            twitter = "twitter" in social? social.twitter: "";
            facebook = "facebook" in social? social.facebook: "";
            instagram = "instagram" in social? social.instagram: "";
            linkedin = "linkedin" in social? social.linkedin: "";
            youtube = "youtube" in social? social.youtube: "";
        }

        return (
            <Panel>
                <Panel.Heading>
                    <Panel.Title>{`Edit Profile: ${user.name}`}</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <Form horizontal onSubmit={this.handleSubmit} name="profileEdit">
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>Created</Col>
                            <Col sm={9}>
                                <FormControl.Static>
                                    {date.substr(4)}
                                </FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>Bio</Col>
                            <Col sm={9}>
                                <FormControl
                                    componentClass={TextInput}
                                    size={50}
                                    name="bio"
                                    value={profile.bio}
                                    onChange={this.onChange}
                                    key={profile._id}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>Status</Col>
                            <Col sm={9}>
                                <FormControl
                                    componentClass={TextInput}
                                    size={50}
                                    name="status"
                                    value={profile.status}
                                    onChange={this.onChange}
                                    key={profile._id}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>Location</Col>
                            <Col sm={9}>
                                <FormControl
                                    componentClass={TextInput}
                                    size={50}
                                    name="location"
                                    value={profile.location}
                                    onChange={this.onChange}
                                    key={profile._id}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>Social</Col>
                            <Col componentClass={ControlLabel} sm={9}>&nbsp;</Col>
                            <Col componentClass={ControlLabel} style={{fontWeight: "normal"}} sm={3}>Twitter</Col>
                            <Col sm={9}>
                                <FormControl
                                    componentClass={TextInput}
                                    size={50}
                                    name="twitter"
                                    value={twitter}
                                    onChange={this.onChange}
                                    key={profile._id}
                                />
                            </Col>
                            <Col componentClass={ControlLabel} style={{fontWeight: "normal"}} sm={3}>Facebook</Col>
                            <Col sm={9}>
                                <FormControl
                                    componentClass={TextInput}
                                    size={50}
                                    name="facebook"
                                    value={facebook}
                                    onChange={this.onChange}
                                    key={profile._id}
                                />
                            </Col>
                            <Col componentClass={ControlLabel} style={{fontWeight: "normal"}} sm={3}>Instagram</Col>
                            <Col sm={9}>
                                <FormControl
                                    componentClass={TextInput}
                                    size={50}
                                    name="instagram"
                                    value={instagram}
                                    onChange={this.onChange}
                                    key={profile._id}
                                />
                            </Col>
                            <Col componentClass={ControlLabel} style={{fontWeight: "normal"}} sm={3}>LinkedIn</Col>
                            <Col sm={9}>
                                <FormControl
                                    componentClass={TextInput}
                                    size={50}
                                    name="linkedin"
                                    value={linkedin}
                                    onChange={this.onChange}
                                    key={profile._id}
                                />
                            </Col>
                            <Col componentClass={ControlLabel} style={{fontWeight: "normal"}} sm={3}>Youtube</Col>
                            <Col sm={9}>
                                <FormControl
                                    componentClass={TextInput}
                                    size={50}
                                    name="youtube"
                                    value={youtube}
                                    onChange={this.onChange}
                                    key={profile._id}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>Favorite Categories</Col>
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
                            <Col smOffset={3} sm={6}>
                                <ButtonToolbar>
                                    <Button
                                        bsStyle="primary"
                                        onClick={this.handleSubmit}
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
export default withToast(EditProfile);
