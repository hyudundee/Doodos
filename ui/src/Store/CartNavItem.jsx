import React from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom';
import {
    NavItem, Glyphicon, Modal, Form, FormGroup, FormControl, ControlLabel,
    Button, ButtonToolbar, Tooltip, OverlayTrigger,
} from 'react-bootstrap';
import withToast from '../withToast.jsx';
import axios from "axios";
import Cart from "./Cart.jsx";

class CartNavItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showing: false,
            checkout: false,
            link: '',
            imageUrl: '',
            sum: 0
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showWarning = this.showWarning.bind(this);
        this.onUrlChange = this.onUrlChange.bind(this);
        this.onSumChange = this.onSumChange.bind(this);
    }

    showModal() {
        this.setState({ showing: true });
    }

    hideModal() {
        this.setState({ showing: false });
    }

    onUrlChange(imageUrl) {
        this.setState({ imageUrl });
    }

    onSumChange(sum) {
        this.setState({ sum });
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.hideModal();
        const api = axios.create({
            baseURL: '/api',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.token
            }
        });
        const checkout = await api.get('/cart/checkout/pay');
        const link = checkout.data;
        console.log(link);
        this.setState({ link, checkout: true });
    }

    showWarning() {
        const { showError } = this.props;
        showError("Sign in to view your cart.");
    }

    render() {
        const { showing, checkout, link } = this.state;
        const { user, showSuccess, showError } = this.props;
        if (!user.signedIn) {
            return (
                <React.Fragment>
                    <NavItem onClick={this.showWarning}>
                        <OverlayTrigger
                            placement="left"
                            delayShow={1000}
                            overlay={<Tooltip id="create-issue">Make a New Post</Tooltip>}
                        >
                            <Glyphicon glyph="shopping-cart" />
                        </OverlayTrigger>
                    </NavItem>
                </React.Fragment>
            );
        }
        console.log(link);
        if (checkout) return <meta httpEquiv="refresh" content={`1;url=${link}`} />;
        {/*<Redirect to={link} />;*/}

        return (
            <React.Fragment>
                <NavItem onClick={this.showModal}>
                    <OverlayTrigger
                        placement="left"
                        delayShow={1000}
                        overlay={<Tooltip id="create-issue">Your Cart</Tooltip>}
                    >
                        <Glyphicon glyph="shopping-cart" />
                    </OverlayTrigger>
                </NavItem>
                <Modal keyboard show={showing} onHide={this.hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Your Cart</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Cart onSumChange={this.onSumChange} showSuccess={showSuccess} showError={showError} />
                    </Modal.Body>
                    <Modal.Footer>
                        <div style={{float: "left", marginLeft: "15px", justifyContent: "center", display: "flex"}}>
                            {`Total: $${this.state.sum.toFixed(2)}`}
                        </div>
                        <ButtonToolbar style={{float: 'right'}}>
                                <Button
                                    type="button"
                                    bsStyle="primary"
                                    onClick={this.handleSubmit}
                                >
                                    Checkout
                                </Button>
                            <Button bsStyle="link" onClick={this.hideModal}>Cancel</Button>
                        </ButtonToolbar>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}

export default withToast(withRouter(CartNavItem));
