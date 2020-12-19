import React from "react";
import {
    Panel, Row, Col, Thumbnail, Button,
    Glyphicon, Modal, Form, FormGroup, ControlLabel, FormControl, ButtonToolbar,
} from "react-bootstrap";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import CategoryContents from './CategoryContents.jsx';
import axios from "axios";

class Category extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            category: [],
            loading: true
        }
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
            if (profile) {
                const profileObject = {};
                for (let k in profile.data) {
                    profileObject[k] = profile.data[k];
                }
                this.setState({ profile: profile.data, category: profileObject.favoriteCategories });
                const id = profileObject.user._id;
                const user = await api.get(`/users/${id}`);
                const posts = await api.get(`/posts/byuser/${id}`);
                if (user) {
                    this.setState({ user: user.data });
                }
                if (posts) {
                    this.setState({ posts: posts.data });
                }
            }
        }
        this.setState({ loading: false });
    }

    render() {
        const categoryDict = {
            "all": "All Categories",
            "ideas": "Ideas",
            "artworks": "Artworks",
            "spotsaroundyou": "Spots Around You",
            "fashion": "Fashion",
            "activities": "Activities",
            "events": "Events",
            "life": "Life"
        };
        const { category, loading } = this.state;
        if (loading) return null;
        const menuItems = [];
        for (let k in category) {
            let link = `./${category[k]}`;
            menuItems.push(<MenuItem key={category[k]}>{categoryDict[category[k]]}<Link to={link} /></MenuItem>)
        }

        return (
            <div className="WithSideBar">
                <ProSidebar>
                    <SidebarHeader>Category</SidebarHeader>
                    <SidebarContent>
                        <Menu>
                            <MenuItem>
                                Your Feed
                                <Link to="/category/" />
                            </MenuItem>
                            <SubMenu title="Explore by Category">
                                <MenuItem>All Categories<Link to="./all" /></MenuItem>
                                <MenuItem>Ideas<Link to="./ideas" /></MenuItem>
                                <MenuItem>Artworks<Link to="./artworks" /></MenuItem>
                                <MenuItem>Spots Around You<Link to="./spotsaroundyou" /></MenuItem>
                                <MenuItem>Fashion<Link to="./fashion" /></MenuItem>
                                <MenuItem>Activities<Link to="./activities" /></MenuItem>
                                <MenuItem>Events<Link to="./events" /></MenuItem>
                                <MenuItem>Life<Link to="./life" /></MenuItem>
                            </SubMenu>
                            <SubMenu title="Your Category" defaultOpen={true}>
                                {menuItems}
                            </SubMenu>
                        </Menu>
                    </SidebarContent>
                </ProSidebar>
                <div className="GroupsContentsWrapper">
                    <CategoryContents />
                </div>
            </div>
        )
    }
}

export default Category;
