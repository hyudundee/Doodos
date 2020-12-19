import React from 'react';
import { withRouter } from 'react-router-dom';
import {
    Button, Glyphicon, Thumbnail,
} from 'react-bootstrap';

import withToast from '../withToast.jsx';

class PostItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showing: false,
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal() {
        this.setState({ showing: true });
    }

    hideModal() {
        this.setState({ showing: false });
    }

    render() {
        return (
            <React.Fragment>
                <Thumbnail src="/static/images/1.jpg" alt="242x200">
                    <h3>Group Post</h3>
                    <p>
                        This is contents of some Group Posts. And it goes on and
                        on and on and on and on and on and on and on and on and
                        on and on and on and on and on and on and on and on and
                        on and on and on and on and on and on and on and on and...
                    </p>
                    <div>
                        <div align="right">
                            <Button bsStyle="primary">Comment</Button>
                            <Button><Glyphicon glyph="heart" /></Button>
                        </div>
                    </div>
                </Thumbnail>
            </React.Fragment>
        );
    }
}

export default withToast(withRouter(PostItem));
