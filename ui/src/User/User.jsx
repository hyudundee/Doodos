import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
    Col, Panel, Form, FormGroup, FormControl, ControlLabel,
    ButtonToolbar, Button, Alert, Row, Image,
} from 'react-bootstrap';
import withToast from '../withToast.jsx';
import UserTabContents from "./UserTabContents.jsx";
import api from "../api";
import PostItem from "../Discover/PostItem.jsx";
import axios from "axios";
import UserItem from "./UserItem.jsx";

class User extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            me: null,
            dashboard: false,
            loading: true
        };
        this.followUser = this.followUser.bind(this);
        this.unfollowUser = this.unfollowUser.bind(this);
    }

    componentDidMount() {
        const { user } = this.state;
        if (user == null) this.loadData();
    }

    async loadData() {
        let { match: { params: { id } } } = this.props;
        if (id == null) id = this.props.id;
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
                const profileObject = {};
                for (let k in profile.data) {
                    profileObject[k] = profile.data[k];
                }
                this.setState({ me: profileObject.user._id });
                if (this.state.me === id) {
                    this.setState({ dashboard: true });
                }
                const me = await api.get(`/users/${this.state.me}`);
                const myFollows = me.data.following;
                this.setState({ myFollows });

            } catch (err) {
                console.error(err.message);
            }
        }
        const profile = await api.get(`/profile/user/${id}`);
        if (profile) {
            this.setState({ profile: profile.data });
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
        }
        this.setState({ loading: false });
    }

    async followUser() {
        const { match: { params: { id } }, showSuccess, showError } = this.props;
        const { me } = this.state;
        if (me != null) {
            try {
                const api = axios.create({
                    baseURL: '/api',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.token
                    }
                });
                await api.post(`/users/following/${id}`);
                this.loadData();
                showSuccess("Followed the user.");
            } catch (err) {
                console.error(err.message);
            }
        } else {
            showError("Must sign in to follow user.");
        }
    }

    async unfollowUser() {
        const { match: { params: { id } }, showSuccess, showError } = this.props;
        const { me } = this.state;
        if (me != null) {
            try {
                const api = axios.create({
                    baseURL: '/api',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.token
                    }
                });
                await api.delete(`/users/following/${id}`);
                this.loadData();
                showSuccess("Unfollowed the user.");
            } catch (err) {
                console.error(err.message);
            }
            this.setState({ liked: true});
        } else {
            showError("Must sign in to unfollow user.");
        }
    }


    render() {
        const { match: { params: { tab } } } = this.props;
        const { myFollows, user, profile, posts, likes, loading, dashboard, followings } = this.state;
        if (loading) return <div>loading...</div>;
        if (dashboard) return <Redirect to="/dashboard/" />
        // Have to convert the object before use
        const userObject = {};
        const profileObject = {};
        const social = [];
        for (let k in user) {
            userObject[k] = user[k];
        }
        const id = userObject._id;
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
            <Col xs={12} sm={6} md={4} key={post._id}><PostItem id={post._id} user={user._id} /></Col>
        ));
        const likedItems = likes.map((post) => (
            <Col xs={12} sm={6} md={4} key={post._id}><PostItem id={post._id} user={user._id} /></Col>
        ));
        const followingUsers = followings.map((user) => (
            <div key={user}><UserItem id={user} /></div>
        ));
        const follow = <Button bsStyle="primary" onClick={this.followUser}>Follow +</Button>;
        const followed = <Button onClick={this.unfollowUser}>Followed</Button>;
        const myFollowsArray = [];
        for (let k in myFollows) {
            myFollowsArray.push(myFollows[k].user);
        }
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
                        {myFollowsArray.includes(user._id)? followed:follow}
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
                            <UserTabContents tab={tab} social={social} id={id} posts={postItems} likes={likedItems} followings={followingUsers} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const UserWithToast = withToast(withRouter(User));

export default UserWithToast;
