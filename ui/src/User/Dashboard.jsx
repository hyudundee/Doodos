import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
    Col, Panel, Form, FormGroup, FormControl, ControlLabel,
    ButtonToolbar, Button, Alert, Row, Image, Glyphicon,
} from 'react-bootstrap';
import withToast from '../withToast.jsx';
import UserTabContents from "./UserTabContents.jsx";
import EditItem from "./EditItem.jsx";
import axios from "axios";
import PostItem from "../Discover/PostItem.jsx";
import UserItem from "./UserItem.jsx";

class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            loading: true,
            signedIn: true
        };
    }

    componentDidMount() {
        const { user } = this.state;
        if (user == null) this.loadData();
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
            const id = profileObject.user._id;
            const user = await api.get(`/users/${id}`);
            const posts = await api.get(`/posts/byuser/${id}`);
            if (user) {
                this.setState({ user: user.data });
            }
            if (posts) {
                this.setState({ posts: posts.data });
            }
            const likes = this.state.profile.myLikes;
            const myLikes = [];
            for (let k in likes) {
                const liked = await api.get(`/posts/${likes[k].post}`);
                myLikes.push(liked.data);
            }
            this.setState({ likes: myLikes });
            const followings = this.state.user.following;
            const myFollowings = [];
            for (let k in followings) {
                myFollowings.push(followings[k].user);
            }
            this.setState({ followings: myFollowings });
        } else {
            this.setState({ signedIn: false })
        }
        this.setState({ loading: false })
    }

    render() {
        const { match: { params: { tab } } } = this.props;
        const { signedIn, user, profile, posts, likes, loading, followings } = this.state;
        if (loading) return <div>loading...</div>;
        if (!signedIn) {
            return <Redirect to="/"/>;
        }
        // Have to convert the object before use
        const userObject = {};
        const profileObject = {};
        const social = [];
        for (let k in user) {
            userObject[k] = user[k];
        }
        for (let k in profile) {
            profileObject[k] = profile[k];
        }
        for (let k in profileObject.social) {
            social.push(<p key={k}>{k}: <a>{profileObject.social[k]}</a></p>)
        }
        const postsObject = [];
        for (let k in posts) {
            postsObject.push(posts[k]);
        }
        const postItems = postsObject.map((post) => (
            <Col xs={12} sm={6} md={4} key={post._id}><EditItem post={post} /></Col>
        ));
        const likedItems = likes.map((post) => (
            <Col xs={12} sm={6} md={4} key={post._id}><PostItem id={post._id} user={user._id} /></Col>
        ));
        const followingUsers = followings.map((user) => (
            <div key={user}><UserItem id={user} /></div>
        ));
        return (
            <div className="Profile">
                <div className="ProfileBanner">
                    <figure>
                        <img src="/static/images/text.jpg" alt="img01"/>
                    </figure>
                </div>
                <div className="ProfileWrap">
                    <div className="ProfileSidebar">
                        <div className="AvatarContainer">
                            <Image className="img-circle" src={userObject.avatar} alt="profile pic" circle/>
                        </div>
                        <h3>{userObject.name}</h3>
                        <p>{profileObject.bio}</p>
                        <p>{profileObject.status}</p>
                        <p>{profileObject.location}</p>
                        <Link to="/profile/">
                            <Button bsStyle="primary">Edit&nbsp;&nbsp;&nbsp;<Glyphicon glyph="pencil" /></Button>
                        </Link>
                    </div>
                    <div className="ProfileContents">
                        <ul className="ProfileTabs">
                            <li className="tab">
                                <Link to="./posts">Posts</Link>
                            </li>
                            <li className="tab">
                                <Link to="./likes">Likes</Link>
                            </li>
                            <li className="tab">
                                <Link to="./following">Following</Link>
                            </li>
                            <li className="tab">
                                <Link to="./about">About</Link>
                            </li>
                        </ul>
                        <div className="ProfileTabContents">
                            <UserTabContents tab={tab} social={social} posts={postItems} likes={likedItems} followings={followingUsers} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const DashboardWithToast = withToast(withRouter(Dashboard));

export default DashboardWithToast;
