import React from "react";
import {
    Panel, Row, Col, Thumbnail, Button,
    Glyphicon, Modal, Form, FormGroup, ControlLabel, FormControl, ButtonToolbar,
} from "react-bootstrap";
import StoreItem from "./StoreItem.jsx";
import PromotionBanner from "./PromotionBanner.jsx";
import ItemPanel from "./ItemPanel.jsx";

class Store extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <div className="EventSlides">
                    <PromotionBanner />
                </div>
                <div className="PostsPanel">
                    <ItemPanel />
                </div>
            </div>
        )
    }
}

export default Store;
