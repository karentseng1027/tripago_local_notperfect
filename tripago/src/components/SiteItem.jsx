import React from 'react';
import PropTypes from 'prop-types';
import {
    Badge,
    Card,
    CardText,
    Button
} from 'reactstrap';
import {connect} from 'react-redux';
import moment from 'moment';

import {getSiteIcon} from 'utilities/weather.js';
import {createVote, pick, deleteSite} from 'states/site-actions.js';

import './SiteItem.css';

class SiteItem extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        siteType: PropTypes.string,
        mon: PropTypes.bool,
        tue: PropTypes.bool,
        wed: PropTypes.bool,
        thur: PropTypes.bool,
        fri: PropTypes.bool,
        sat: PropTypes.bool,
        sun: PropTypes.bool,
        openTime: PropTypes.string,
        closeTime: PropTypes.string,
        siteLink: PropTypes.string,
        sitePrice: PropTypes.string,
        siteDiscript: PropTypes.string,
        votes: PropTypes.number,
        pick: PropTypes.bool,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleVote = this.handleVote.bind(this);
    }

    render() {
        const {id, name, user, siteType, mon, tue, wed, thur, fri, sat, sun, openTime, closeTime, siteLink, sitePrice, siteDiscript, votes, pick} = this.props;

        return (
            <div className='site-item'>
                <div className='top-box-big'>
                <div className='d-flex flex-column flex-sm-row justify-content-between'>
                        <div className='site-name'><i className="material-icons big-icon align-self-center">{getSiteIcon(siteType)}</i>&nbsp;<a href={`${siteLink}`} target='_black' >{name}</a><span className='user'>&nbsp;&nbsp; {user}</span></div>
                        <div className='vote-plus align-self-center'>
                            <i className="fa fa-thumbs-up" aria-hidden="true" onClick={() => this.handleVote()}></i>
                            {votes > 0 && <span>{votes}</span>}
                        </div>
                </div>
                </div>

                <div className='top-box-small'>
                    <div className='d-flex'>
                    <div className='site-name-small'><i className="material-icons  small-icon align-self-center">{getSiteIcon(siteType)}</i>&nbsp;<a href={`${siteLink}`} target='_blank'>{name}</a><span className='user'>&nbsp;&nbsp; {user}</span></div>
                    <div className='site-name-small ml-auto align-self-center'>
                        <i className="fa fa-thumbs-up" aria-hidden="true" onClick={() => this.handleVote()}></i>
                        {votes > 0 && <span>{votes}</span>}
                    </div>
                    </div>
                </div>

                <div className='d-flex justify-content-between box-big'>
                    {mon ? <h3><Badge color='warning'>Mon</Badge>&nbsp;</h3> : <h3><Badge color='default'>Mon</Badge>&nbsp;</h3>}
                    {tue ? <h3><Badge color='warning'>Tue</Badge>&nbsp;</h3> : <h3><Badge color='default'>Tue</Badge>&nbsp;</h3>}
                    {wed ? <h3><Badge color='warning'>Wed</Badge>&nbsp;</h3> : <h3><Badge color='default'>Wed</Badge>&nbsp;</h3>}
                    {thur ? <h3><Badge color='warning'>Thur</Badge>&nbsp;</h3> : <h3><Badge color='default'>Thur</Badge>&nbsp;</h3>}
                    {fri ? <h3><Badge color='warning'>Fri</Badge>&nbsp;</h3> : <h3><Badge color='default'>Fri</Badge>&nbsp;</h3>}
                    {sat ? <h3><Badge color='warning'>Sat</Badge>&nbsp;</h3> : <h3><Badge color='default'>Sat</Badge>&nbsp;</h3>}
                    {sun ? <h3><Badge color='warning'>Sun</Badge></h3> : <h3><Badge color='default'>Sun</Badge></h3>}
                </div>


                <div className='d-flex justify-content-between box-small'>
                    {mon ? <h5><Badge color='warning'>Mon</Badge>&nbsp;</h5> : <h5><Badge color='default'>Mon</Badge>&nbsp;</h5>}
                    {tue ? <h5><Badge color='warning'>Tue</Badge>&nbsp;</h5> : <h5><Badge color='default'>Tue</Badge>&nbsp;</h5>}
                    {wed ? <h5><Badge color='warning'>Wed</Badge>&nbsp;</h5> : <h5><Badge color='default'>Wed</Badge>&nbsp;</h5>}
                    {thur ? <h5><Badge color='warning'>Thur</Badge>&nbsp;</h5> : <h5><Badge color='default'>Thur</Badge>&nbsp;</h5>}
                    {fri ? <h5><Badge color='warning'>Fri</Badge>&nbsp;</h5> : <h5><Badge color='default'>Fri</Badge>&nbsp;</h5>}
                    {sat ? <h5><Badge color='warning'>Sat</Badge>&nbsp;</h5> : <h5><Badge color='default'>Sat</Badge>&nbsp;</h5>}
                    {sun ? <h5><Badge color='warning'>Sun</Badge></h5> : <h5><Badge color='default'>Sun</Badge></h5>}
                </div>

                <Card>
                    <CardText><spam className='discription'>{siteDiscript}</spam><br/><br/></CardText>
                </Card>
                
                <div className='title to-right'>
                        Price per person : <Badge color="warning">{sitePrice}</Badge>
                </div>

                <div className='d-flex justify-content-center'>
                        {!pick && <Button type="button" className="btn btn-secondary pick-btn" onClick={this.handleClick}>PICK</Button>}
                        {pick && <Button type="button" className="btn btn-warning pick-btn" onClick={this.handleClick}>PICKED</Button>}
                        <div><Button type="button" className="btn btn-danger delete-btn" onClick={this.handleDelete}>DELETE</Button></div>
                </div>
            </div>
        );
    }

    handleVote() {
        this.props.dispatch(createVote(this.props.id));
    }

    handleClick() {
        this.props.dispatch(pick(this.props.id));
    }

    handleDelete() {
        this.props.dispatch(deleteSite(this.props.id));
    }
}

export default connect((state) => ({
    
}))(SiteItem);
