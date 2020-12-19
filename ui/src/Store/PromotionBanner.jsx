import React from "react";
import {Button, Form, FormGroup, Glyphicon, Modal} from "react-bootstrap";
import api from "../api";
import axios from "axios";
import Item from "./ItemPage.jsx";
import withToast from "../withToast.jsx";

class PromotionBanner extends React.Component{
    constructor() {
        super();
        this.state = {
            index: 0,
            events: [],
            showing: false,
            number: 1,
            loading: true
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.increaseItem = this.increaseItem.bind(this);
        this.decreaseItem = this.decreaseItem.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    componentDidMount() {
        const { events } = this.state;
        if (events.length === 0) this.loadData();
    }

    async loadData() {
        const eventsData = await api.get("/events");
        if (eventsData) {
            this.setState({ events: eventsData.data });
        }
        const titles = [];
        const pics = [];
        const descriptions = [];
        const tickets = [];
        const { events } = this.state;
        for (let i = 0; i < events.length; i++) {
            titles.push(events[i].name);
            pics.push(events[i].imagePath);
            descriptions.push(events[i].description);
            tickets.push(events[i].ticket);
        }
        this.setState({ titles, pics, descriptions, tickets });
        this.setState({ loading: false });
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
            const { index, titles } = this.state;
            const itemName = titles[index] + " Ticket";
            console.log(itemName);
            const cartItem = {
                itemName: itemName,
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

    prevPage() {
        const { index: prevIndex } = this.state;
        let event = document.getElementsByClassName("effect-marley");
        event[0].style.display = "none";
        this.setState({ index: (prevIndex + 2) % 3});
        setTimeout(function() {
            event[0].style.display = "block";
        }, 10);
    }

    nextPage() {
        const { index: prevIndex } = this.state;
        let event = document.getElementsByClassName("effect-marley");
        event[0].style.display = "none";
        this.setState({ index: (prevIndex + 1) % 3});
        setTimeout(function() {
            event[0].style.display = "block";
        }, 10);
    }

    render() {
        const { number, showing, index, loading,
            titles, pics, descriptions, tickets
        } = this.state;
        if (loading) return null;
        const link = `/item/${tickets[index]}/`;
        return (
            <div>
                <figure className="effect-marley">
                    <img src={pics[index]} alt="img01"/>
                    <figcaption>
                        <h2>{titles[index]}</h2>
                        <a className="switch" onClick={this.prevPage}>&#10094;</a>
                        <a className="switch next" onClick={this.nextPage}>&#10095;</a>
                        <p>
                            <li className="eventDescription">
                                {descriptions[index]}
                            </li>
                            <a href={link} data-toggle="modal" data-target="#theModal"><Button bsStyle="primary" style={{marginTop: '8px'}} onClick={this.showModal}>Get Tickets Here</Button></a>
                        </p>
                    </figcaption>
                </figure>
                <Modal keyboard show={showing} onHide={this.hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title/>
                    </Modal.Header>
                    <Modal.Body>
                        <Item id={tickets[index]} />
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
            </div>
        );
    }
}

export default withToast(PromotionBanner);
