import React from 'react';
import PropTypes from 'prop-types';
import {
    ListGroup,
    ListGroupItem
} from 'reactstrap';

import SiteItem from 'components/SiteItem.jsx';

import './SiteList.css';

export default class SiteList extends React.Component {
    static propTypes = {
        sites: PropTypes.array
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {sites} = this.props;

        let children = (
            <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
                <div className='empty-text'>No site here.<br />Go nominate some sites.</div>
            </ListGroupItem>
        );
        if (sites.length) {
            children = sites.map(s => (
                <ListGroupItem className='item' key={s.id} action>
                    <SiteItem {...s} />
                </ListGroupItem>
            ));
        }

        return (
            <div className='site-list'>
                <ListGroup>{children}</ListGroup>
            </div>
        );
    }
}
