import React from "react";
import {Link} from "react-router-dom";
import {Button, Glyphicon, Image} from "react-bootstrap";
import api from "../api.js";

export default class UserItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: null };
    }

    componentDidMount() {
        const { user } = this.state;
        if (user == null) this.loadData();
    }

    async loadData() {
        const id = this.props.id;
        const user = await api.get(`/users/${id}`);
        this.setState({ user: user.data })
    }

    render() {
        const { user } = this.state;
        // Have to convert the object before use
        const userObject = {};
        for (let k in user) {
            userObject[k] = user[k];
        }
        const authorLink = `/user/${userObject._id}/`;

        return (
            <div  className="UserItem">
                <div align="left" style={{float: 'left'}}>
                    <div className="MiniAvatarContainer">
                        <Image className="img-circle" src={userObject.avatar} alt="profile pic" circle/>
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <Link to={authorLink}>{userObject.name}</Link>
                </div>
                {/*<div align="right">*/}
                {/*    <Button bsSize="small" bsStyle="warning">Unfollow</Button>*/}
                {/*</div>*/}
            </div>
        );
    }
}
