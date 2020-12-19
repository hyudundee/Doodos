import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import withToast from '../withToast.jsx';
import UserTabContents from "../User/UserTabContents.jsx";
import api from "../api";

class Post extends React.Component {
    constructor() {
        super();
        this.state = {
            post: null,
        }
    }

    componentDidMount() {
        const { post } = this.state;
        if (post == null) this.loadData();
    }

    async loadData() {
        let id = this.props.id;
        console.log(id);
        if (id === undefined) id = this.props.match.params.id;
        const post = await api.get(`/posts/${id}`);
        if (post) {
            this.setState({ post: post.data });
        }
    }

    render() {
        // id is for server render matching, not used at the moment
        // const { id } = this.state;
        // const { match: { params: { id: propsId, tab } } } = this.props;
        // if (id == null) {
        //     if (propsId != null) {
        //         return <h3>{`User with ID ${id} not found.`}</h3>;
        //     }
        //     return null;
        // }
        const { post } = this.state;
        // Have to convert the object before use
        const postObject = {};
        for (let k in post) {
            postObject[k] = post[k];
        }
        return (
            <div>
                <div className="EventSlides">
                    <figure className="effect-marley">
                        <img src={postObject.imageUrl} alt="img01"/>
                    </figure>
                </div>
                <div>
                    <div className="PostBar">
                        <h3>{postObject.title}</h3>
                        <p>{postObject.text}</p>
                        <p>{postObject.date}</p>
                        <p>{postObject.name}</p>
                        <p>{postObject.comments}</p>
                    </div>
                </div>
            </div>
        );
    }
}

const PostWithToast = withToast(withRouter(Post));

export default PostWithToast;

