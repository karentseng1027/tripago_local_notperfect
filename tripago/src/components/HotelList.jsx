import React from 'react';
import PropTypes from 'prop-types';
import {
    ListGroup,
    ListGroupItem
} from 'reactstrap';

import HotelItem from 'components/HotelItem.jsx';
import {createVote} from 'api/hotels.js';

import './HotelList.css';

export default class HotelList extends React.Component {
    static propTypes = {
        hotels: PropTypes.array
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {hotels} = this.props;

        let children = (
            <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
                <div className='empty-text'>No hotel here.<br />Go nominate some hotels.</div>
            </ListGroupItem>
        );
        if (hotels.length) {
            children = hotels.map(h => (
                <ListGroupItem className='item' key={h.id} action>
                    <HotelItem {...h} />
                </ListGroupItem>
            ));
        }

        return (
            <div className='hotel-list'>
                <ListGroup>{children}</ListGroup>
            </div>
        );
    }
}
