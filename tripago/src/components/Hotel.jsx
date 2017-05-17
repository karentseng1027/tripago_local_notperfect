import React from 'react';
import PropTypes from 'prop-types';
import {Alert} from 'reactstrap';
import {connect} from 'react-redux';
import {Button} from 'reactstrap';

import {listHotels} from 'states/hotel-actions.js';
import HotelForm from 'components/HotelForm.jsx';
import HotelList from 'components/HotelList.jsx';

import './Hotel.css';

class Hotel extends React.Component {
    static propTypes = {
        searchText: PropTypes.string,
        hotels: PropTypes.array,
        hotelLoading: PropTypes.bool,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(listHotels(this.props.searchText));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchText !== this.props.searchText) {
            this.props.dispatch(listHotels(nextprops.searchText));
        }
    }

    render() {
        //const {hotels, hotelLoading} = this.props;
        document.body.className = `weather-bg`;
        
        return (
            <div className='hotel'>
                <div className='hotels'>
                    <h4 className='label'><i className="fa fa-bed" aria-hidden="true"></i>&nbsp;&nbsp;Hotel</h4>
                    <HotelForm />
                    <HotelList hotels={this.props.hotels} />{
                        this.props.hotelLoading &&
                        <Alert color='warning' className='loading'>Loading...</Alert>
                    }
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    searchText: state.searchText,
    ...state.hotel
}))(Hotel);