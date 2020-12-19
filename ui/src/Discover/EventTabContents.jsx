import React from "react";

export default function EventTabContents({ tab, event, attenders }) {
    if (tab === "about") {
        return (
            <h3>Host by {event.host}</h3>
        )
    }
    else if (tab === "attenders") {

        return (
            <h3>{attenders}</h3>
        )
    }
    else {
        return (
            <p>{event.description}</p>
        )
    }
}
