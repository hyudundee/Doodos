import CartItem from "./CartItem.jsx";
import {Button, Col, Glyphicon, Image, Panel, Row} from "react-bootstrap";
import React from "react";
import axios from "axios";

export default class Cart extends React.Component {
    constructor() {
        super();
        this.state = { cart: [], user: null, loading: true };
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
            const cart = await api.get('/cart/');
            if (cart) {
                const { onSumChange } = this.props;
                this.setState({ cart: cart.data });
                onSumChange(this.state.cart.sum);
            }
            const profile = await api.get('/profile/me');
            const profileObject = {};
            for (let k in profile.data) {
                profileObject[k] = profile.data[k];
            }
            this.setState({ user: profileObject.user._id });
        }
        this.setState({ loading: false });
    }

    render() {
        const { cart, user, loading } = this.state;
        const { showSuccess, showError } = this.props;
        if (loading) return null;
        // Have to convert the object before use
        const cartObject = [];
        for (let k in cart.products) {
            cartObject.push(cart.products[k]);
        }
        if (cartObject.length === 0) {
            return <div>No items in cart.</div>;
        }
        const cartItems = cartObject.map((item) => (
            <div key={item._id}><CartItem item={item} user={user} showSuccess={showSuccess} showError={showError} /></div>
        ));
        return (
            <div>
                <Row className="cartHeader">
                    <Col xs={2} style={{left: "5px", justifyContent: "center", display: "flex"}}>
                        &nbsp;Image
                    </Col>
                    <Col xs={6} style={{left: "5px", justifyContent: "center", display: "flex"}}>
                        &nbsp;&nbsp;Title
                    </Col>
                    <Col xs={1} style={{justifyContent: "center", display: "flex"}}>
                        Price
                    </Col>
                    <Col xs={2} style={{alignItems: "center", justifyContent: "center", display: "flex"}}>
                        Qty
                    </Col>
                </Row>
                {cartItems}
            </div>
        );
    }
}
