import React from 'react';
import PropTypes from 'prop-types';
import {
    ListGroup,
    ListGroupItem
} from 'reactstrap';

import TransItem from 'components/TransItem.jsx';

import './TransList.css';

export default class TransList extends React.Component {
    static propTypes = {
        trans: PropTypes.array
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {trans} = this.props;

        let children = (
            <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
                <div className='empty-text'>No transportation here.<br />Go nominate some transportations.</div>
            </ListGroupItem>
        );
        if (trans.length) {
            children = trans.map(t => (
                <ListGroupItem className='item' key={t.id} action>
                    <TransItem {...t} />
                </ListGroupItem>
            ));
        }

        return (
            <div className='trans-list'>
                <ListGroup>{children}</ListGroup>
            </div>
        );
    }
}
