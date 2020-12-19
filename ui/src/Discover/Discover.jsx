import React from "react";
import EventItem from "./EventItem.jsx";
import PostPanel from "./PostPanel.jsx";

class Discover extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <div className="EventSlides">
                    <EventItem />
                </div>
                <div className="PostsPanel">
                    <PostPanel />
                </div>
            </div>
        )
    }
}

export default Discover;
