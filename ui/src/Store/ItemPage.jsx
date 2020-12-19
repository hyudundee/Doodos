import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import withToast from '../withToast.jsx';
import UserTabContents from "../User/UserTabContents.jsx";
import api from "../api";

class ItemPage extends React.Component {
    constructor() {
        super();
        this.state = {
            item: null,
        }
    }

    componentDidMount() {
        const { item } = this.state;
        if (item == null) this.loadData();
    }

    async loadData() {
        let { match: { params: { id } } } = this.props;
        if (id == null) id = this.props.id;
        const item = await api.get(`/products/${id}`);
        if (item) {
            this.setState({ item: item.data });
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
        const { item } = this.state;
        // Have to convert the object before use
        const itemObject = {};
        for (let k in item) {
            itemObject[k] = item[k];
        }
        return (
            <div>
                <div className="EventSlides">
                    <figure className="effect-marley">
                        <img src={itemObject.imagePath} alt="img01"/>
                    </figure>
                </div>
                <div>
                    <div className="PostBar">
                        <h3>{itemObject.itemName}</h3>
                        <p>{itemObject.description}</p>
                        <p>${itemObject.price}</p>
                    </div>
                </div>
            </div>
        );
    }
}

const ItemWithToast = withToast(withRouter(ItemPage));

export default ItemWithToast;

