import React from 'react';
import PropTypes from 'prop-types';
import {Alert, Button, Input, Badge} from 'reactstrap';
import {connect} from 'react-redux';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import {inputGroup, inputUser, login, atMain, inputDanger, listPickTrans, listPickHotels, listPickSites, countTotalPrice} from 'states/result-actions.js';
import TransList from 'components/TransList.jsx'; 
import HotelList from 'components/HotelList.jsx'; 
import SiteList from 'components/SiteList.jsx'; 

import './Result.css';

class Result extends React.Component {
    static propTypes = {
        login: PropTypes.bool,
        inputDanger: PropTypes.bool,
        inputGroup: PropTypes.string,
        inputUser: PropTypes.string,
        searchText: PropTypes.string,
        trans: PropTypes.array,
        hotels: PropTypes.array,
        sites: PropTypes.array,
        totalPrice: PropTypes.number,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.handleInputGroup = this.handleInputGroup.bind(this);
        this.handleInputUser = this.handleInputUser.bind(this);

        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(atMain(true));
        this.props.dispatch(countTotalPrice());
    }

    componentWillUnmount() {
        this.props.dispatch(atMain(false));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchText !== this.props.searchText) {
             
        }
        if(nextProps.login !== this.props.login) this.props.dispatch(listPickTrans(this.props.searchText));
        if(nextProps.login !== this.props.login) this.props.dispatch(listPickHotels(this.props.searchText));
        if(nextProps.login !== this.props.login) this.props.dispatch(listPickSites(this.props.searchText));
        this.props.dispatch(countTotalPrice());
    }

    render() {
        const inputDanger = this.props.inputDanger ? 'has-danger' : '';
        return (
            <div className='result'>
                {!this.props.login ?
                    <div className='login'>
                        <h4 className='label'><i className="fa fa-sign-in" aria-hidden="true"></i>&nbsp;&nbsp;Login</h4>
                        <Alert color='warning' className={`${inputDanger}`}>
                            <div className='title'>
                            Group Name:<Input type='text' value={this.props.inputGroup} onChange={this.handleInputGroup} />
                            </div>
                            <div className='title'>
                            User  Name:<Input type='text' value={this.props.inputUser} onChange={this.handleInputUser} />
                            </div>
                            <br/>
                            <div className='d-flex justify-content-center'>
                            <Button className='btn-login ' color="warning" onClick={this.handleLogin}>Login</Button>
                            </div>
                        </Alert>
                        <div className='d-flex justify-content-between'>                        
                            <img className='size_control animated bounceInLeft' src='images/trans_img.jpg'></img>
                            <img className='size_control animated bounceInUp' src='images/hotel_img.png'></img>
                            <img className='size_control animated bounceInRight' src='images/site_img.png'></img>
                        </div>
                    </div> 
                    :
                    <div>
                        <h4 className='label'><i className="fa fa-car" aria-hidden="true"></i>&nbsp;&nbsp;Transportation</h4>
                        <TransList trans={this.props.trans} />
                        <h4 className='label'><i className="fa fa-bed" aria-hidden="true"></i>&nbsp;&nbsp;Hotel</h4>
                        <HotelList hotels={this.props.hotels} />
                        <h4 className='label'><i className="fa fa-tree" aria-hidden="true"></i>&nbsp;&nbsp;Site</h4>
                        <SiteList sites={this.props.sites} />
                        <div className='d-flex justify-content-center price'>
                            <div><h4><Badge color='warning'>TOTAL : {this.props.totalPrice}</Badge></h4></div>
                        </div>
                    </div>
                    
                }
            </div>
        );
    }

    handleInputGroup(e) {
        const group = e.target.value;
        this.props.dispatch(inputGroup(group));
        if(group && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handleInputUser(e) {
        const user = e.target.value;
        this.props.dispatch(inputUser(user));
        if(user && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handleLogin(e) {
        const {inputGroup, inputUser} = this.props;
        if(!inputGroup || !inputUser) {
            this.props.dispatch(inputDanger(true));
            return;
        }
        this.props.dispatch(login(true));
    }
}

export default connect(state => ({
    searchText: state.searchText,
    ...state.login,
    ...state.userInfo,
    ...state.result
}))(Result);