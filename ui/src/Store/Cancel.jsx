import React from 'react';

export default class Cancel extends React.Component {
    constructor() {
        super();
    };

    render() {
        return (
            <div>
                <h3>Checkout Canceled</h3>
                <meta httpEquiv="refresh" content={`1;url="/store/"`} />
            </div>
        );
    };
}
