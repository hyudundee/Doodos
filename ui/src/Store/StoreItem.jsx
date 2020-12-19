import React from 'react';
import { withRouter } from 'react-router-dom';
import {
    NavItem, Glyphicon, Modal, Form, FormGroup, FormControl, ControlLabel,
    Button, ButtonToolbar, Tooltip, OverlayTrigger, Col,
} from 'react-bootstrap';

import withToast from '../withToast.jsx';
import Item from "./ItemPage.jsx";
import axios from "axios";

class StoreItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showing: false,
            number: 1,
            item: null,
            loading: true
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.increaseItem = this.increaseItem.bind(this);
        this.decreaseItem = this.decreaseItem.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    componentDidMount() {
        const { item } = this.state;
        if (item == null) this.loadData();
    }

    async loadData() {
        const { product } = this.props;
        // Have to convert the object before use
        const productObject = {};
        for (let k in product) {
            productObject[k] = product[k];
        }
        this.setState({ item: productObject, loading: false });
    }

    showModal() {
        this.setState({ showing: true });
    }

    hideModal() {
        this.setState({ showing: false });
    }

    increaseItem() {
        const { number } = this.state;
        if (number < 30) {
            this.setState({ number: number + 1 });
        }
    }

    decreaseItem() {
        const { number } = this.state;
        if (number > 1) {
            this.setState({ number: number - 1 });
        }
    }

    format(num) {
        return num != null ? num.toString() : '';
    }

    unformat(str) {
        const val = parseInt(str, 10);
        return Number.isNaN(val) ? null : val;
    }

    onChange(e) {
        if (e.target.value.match(/^\d*$/)) {
            const number = e.target.value;
            if (number > 0 && number < 31) {
                this.setState({ number: e.target.value });
            } else if (number > 30) {
                this.setState({ number: 30 });
            } else {
                this.setState({ number: 1 });
            }
        }
    }

    onBlur(event) {
        const { number } = this.state;
        const { value: textValue } = event.target;
        const naturalValue = unformat(number);
        const value = naturalValue === undefined ? textValue : naturalValue;
        this.setState({ number: value });
    }

    async addToCart(e) {
        e.preventDefault();
        this.hideModal();
        const { showSuccess, showError } = this.props;
        if (localStorage.token) {
            const { item } = this.state;
            const cartItem = {
                itemName: item.itemName,
                quantity: this.state.number,
            };
            const api = axios.create({
                baseURL: '/api',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.token
                }
            });
            const res = await api.post(`/cart/`, cartItem);
            if (res) {
                showSuccess("Item added.");
                this.setState({ itemAdded: true, number: 1 });
            } else {
                showError("Add to cart failed.");
            }
        } else {
            showError("Sign in to add to cart.");
        }
    }

    render() {
        const { showing, number, item, loading } = this.state;
        if (loading) return <div>loading...</div>;
        const link = `/item/${item._id}/`;
        return (
            <React.Fragment>
                <div className="grid">
                    <figure className="effect-sadie" onClick={this.showModal}>
                        <img src={item.imagePath} alt="img01"/>
                        <figcaption>
                            <p>{item.itemName}</p>
                            <a href={link} data-toggle="modal" data-target="#theModal">View more</a>
                        </figcaption>
                    </figure>
                </div>
                <div>
                    <div align="left" style={{float: 'left'}}>${item.price}</div>
                    <div align="right">
                        <Form inline>
                            <Button bsSize="xsmall" onClick={this.decreaseItem}><Glyphicon glyph="minus" /></Button>
                            <FormGroup bsSize="sm">
                                <input
                                    type="text"
                                    style={{width: "50px", height: "25px"}}
                                    value={number}
                                    name="number"
                                    onChange={this.onChange}
                                    onBlur={this.onBlur}
                                />
                            </FormGroup>
                            <Button bsSize="xsmall" onClick={this.increaseItem}><Glyphicon glyph="plus" /></Button>
                            <Button bsSize="xsmall" bsStyle="primary" onClick={this.addToCart}>Add to Cart</Button>
                        </Form>
                    </div>
                </div>
                <p></p><p></p>
                <Modal keyboard show={showing} onHide={this.hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title/>
                    </Modal.Header>
                    <Modal.Body>
                        <Item id={item._id} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Form inline style={{float: "right"}}>
                            <Button bsSize="xsmall" onClick={this.decreaseItem}><Glyphicon glyph="minus" /></Button>
                            <FormGroup bsSize="sm">
                                <input
                                    type="text"
                                    style={{width: "50px", height: "25px"}}
                                    value={number}
                                    name="number"
                                    onChange={this.onChange}
                                    onBlur={this.onBlur}
                                />
                            </FormGroup>
                            <Button bsSize="xsmall" onClick={this.increaseItem}><Glyphicon glyph="plus" /></Button>
                            <Button bsStyle="primary" onClick={this.addToCart}>Add to Cart</Button>
                            <Button bsStyle="link" onClick={this.hideModal}>Back</Button>
                        </Form>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}

export default withToast(withRouter(StoreItem));
