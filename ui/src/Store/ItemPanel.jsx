import StoreItem from "./StoreItem.jsx";
import {Col, Panel, Row} from "react-bootstrap";
import React from "react";
import api from "../api";

export default class ItemPanel extends React.Component {
    constructor() {
        super();
        this.state = { products: [] };
    }

    componentDidMount() {
        const { products } = this.state;
        if (products.length === 0) this.loadData();
    }

    async loadData() {
        const products = await api.get("/products");
        if (products) {
            this.setState({ products: products.data });
        }
    }

    render() {
        const { products } = this.state;
        const productsObject = [];
        for (let k in products) {
            productsObject.push(products[k]);
        }
        const storeItems = productsObject.map((product) => (
            <Col xs={12} sm={6} md={3} key={product._id}><StoreItem product={product} /></Col>
        ));
        return (
            <Panel>
                <Panel.Heading>
                    <Panel.Title>Items for You</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <Row>
                        {storeItems}
                    </Row>
                </Panel.Body>
            </Panel>
        );
    }
}
