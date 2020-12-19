import React from "react";
import {Link} from "react-router-dom";
import { Button, Glyphicon, Image, Row, Col } from "react-bootstrap";
import axios from "axios";

export default class CartItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: null, loading: true, itemRemoved: false};
        this.deleteItem = this.deleteItem.bind(this);
    }

    componentDidMount() {
        if (this.state.item == null) this.loadData();
    }

    async loadData() {
        const { item } = this.props;
        this.setState({ item: item, loading: false });
    }

    async deleteItem(e) {
        e.preventDefault();
        const { showSuccess, showError } = this.props;
        if (localStorage.token) {
            const { item } = this.state;
            const cartItem = {
                itemName: item.itemName,
                quantity: item.quantity,
            };
            console.log(cartItem);
            const api = axios.create({
                baseURL: '/api',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.token
                }
            });
            const res = await api.delete(`/cart/`, {data: cartItem});
            if (res) {
                showSuccess("Item removed.");
                this.setState({ itemRemoved: true });
                this.loadData();
            } else {
                showError("Remove item failed.");
            }
        } else {
            showError("Sign in to remove item.");
        }
    }

    render() {
        const { item, loading, itemRemoved } = this.state;
        if (loading || itemRemoved) return null;

        return (
            <Row className="CartItem">
                <Col xs={2} >
                    <div className="ItemContainer">
                        <Image className="img-rec" src={item.imagePath} alt="item pic"/>
                    </div>
                </Col>
                <Col xs={6} style={{left: "5px", justifyContent: "center", display: "flex"}}>
                    {item.itemName}
                </Col>
                <Col xs={1} style={{justifyContent: "center", display: "flex"}}>
                    {`$${item.price}`}
                </Col>
                <Col xs={2} style={{alignItems: "center", justifyContent: "center", display: "flex"}}>
                    {item.quantity}
                </Col>
                <Col xs={1} style={{justifyContent: "center", display: "flex", right: "10px"}}>
                    <div>
                        <Button bsSize="small" bsStyle="warning" onClick={this.deleteItem}><Glyphicon glyph="trash" /></Button>
                    </div>
                </Col>
            </Row>
        );
    }
}
