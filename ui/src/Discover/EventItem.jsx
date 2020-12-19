import React from "react";
import {Button} from "react-bootstrap";

import api from "../api.js";
import { Link } from "react-router-dom";

export default class EventItem extends React.Component{
    constructor() {
        super();
        this.state = { index: 0, events: [] };
        this.prevPage = this.prevPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }

    componentDidMount() {
        const { events } = this.state;
        if (events.length === 0) this.loadData();
    }

    async loadData() {
        const events = await api.get("/events");
        if (events) {
            this.setState({ events: events.data });
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
        const { index, events } = this.state;
        const titles = [];
        const pics = [];
        const descriptions = [];
        const ids = [];
        for (let i = 0; i < events.length; i++) {
            titles.push(events[i].name);
            pics.push(events[i].imagePath);
            descriptions.push(events[i].description);
            ids.push(events[i]._id);
        }
        const link = `/event/${ids[index]}/`;
        return (
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
                        <Link to={link}><Button style={{marginTop: '8px'}}>View more</Button></Link>
                    </p>
                </figcaption>
            </figure>
        );
    }
}
