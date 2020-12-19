import React from "react";
import {
    Panel, Row, Col, Thumbnail, Button,
    Glyphicon, Modal, Form, FormGroup, ControlLabel, FormControl, ButtonToolbar,
} from "react-bootstrap";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import PostItem from "../Discover/PostItem.jsx";
import EventItem from "../Discover/EventItem.jsx";
import { Link } from 'react-router-dom';
import GroupsContents from './GroupsContents.jsx';
import axios from "axios";

class Category extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        const { user } = this.state;
        if (user == null) this.loadData();
    }

    async loadData() {
        const api = axios.create({
            baseURL: '/api',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.token
            }
        });
        const profile = await api.get('/profile/me');
        if (profile) {
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
        }
    }

    render() {
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
                                <MenuItem>All Categories<Link to="/category/all/" /></MenuItem>
                                <MenuItem>Ideas<Link to="/category/ideas/" /></MenuItem>
                                <MenuItem>Artworks<Link to="/category/artworks/" /></MenuItem>
                                <MenuItem>Spots Around You<Link to="/category/spotsaroundyou/" /></MenuItem>
                                <MenuItem>Fashion<Link to="/category/fashion/" /></MenuItem>
                                <MenuItem>Activities<Link to="/category/activities/" /></MenuItem>
                                <MenuItem>Events<Link to="/category/events/" /></MenuItem>
                                <MenuItem>Life<Link to="/category/life/" /></MenuItem>
                            </SubMenu>
                            <SubMenu title="Your Category" defaultOpen={true}>
                                <MenuItem>
                                    Category 1
                                    <Link to="/category/1" />
                                </MenuItem>
                                <MenuItem>
                                    Category 2
                                    <Link to="/category/2" />
                                </MenuItem>
                                <MenuItem>
                                    Category 3
                                    <Link to="/category/3" />
                                </MenuItem>
                                <MenuItem>
                                    Category 4
                                    <Link to="/category/4" />
                                </MenuItem>
                            </SubMenu>
                        </Menu>
                    </SidebarContent>
                </ProSidebar>
                <div className="GroupsContentsWrapper">
                    <GroupsContents />
                </div>
            </div>
        )
    }
}

export default Category;
