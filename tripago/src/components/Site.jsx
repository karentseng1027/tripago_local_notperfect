import React from 'react';
import PropTypes from 'prop-types';
import {Alert} from 'reactstrap';
import {connect} from 'react-redux';
import {Button} from 'reactstrap';

import {listSites} from 'states/site-actions.js';
import SiteForm from 'components/SiteForm.jsx';
import SiteList from 'components/SiteList.jsx';

import './Site.css';

class Site extends React.Component {
    static propTypes = {
        searchText: PropTypes.string,
        sites: PropTypes.array,
        siteLoading: PropTypes.bool,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(listSites(this.props.searchText));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchText !== this.props.searchText) {
            this.props.dispatch(listSites(nextProps.searchText));
        }
    }

    render() {
        return (
            <div className='site'>
                <div className='sites'>
                    <h4 className='label'><i className="fa fa-tree" aria-hidden="true"></i>&nbsp;&nbsp;Site</h4>
                    <SiteForm />
                    <SiteList sites={this.props.sites} />{
                        this.props.siteLoading &&
                        <Alert color='warning' className='loading'>Loading...</Alert>
                    }
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    searchText: state.searchText,
    ...state.site
}))(Site);