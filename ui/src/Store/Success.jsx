import React from 'react';
import axios from "axios";

export default class Cancel extends React.Component {
    constructor() {
        super();
        this.state = { loading: true };
    };

    componentDidMount() {
        if (this.state.loading) this.loadData();
    }

    async loadData() {
        if (localStorage.token) {
            const api = axios.create({
                baseURL: '/api',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.token
                }
            });
            await api.delete("/cart/clear");
        }
        this.setState({ loading: false});
    };

    render() {
        if (this.state.loading) return null;
        return (
            <div>
                <h3>Checkout Success</h3>
                <meta httpEquiv="refresh" content={`1;url="/"`} />
            </div>
        );
    };
}
