import React from "react";
import api from "../api.js";

export default class DoodleMaps extends React.Component {
    constructor() {
        super();
        this.state = { loading: true, map: null };
    }

    componentDidMount() {
        if (this.state.loading) this.loadData();
    }

    async loadData() {
        const map = await api.get("/maps");
        this.setState({ map: map.data, loading: false });
    }

    render() {
        const { loading, map } = this.state;
        if (loading) return <div>loading</div>;

        return (
            <iframe style={{width: "100%", height: "90vh"}} src='/api/maps'></iframe>
        )
    }
}
