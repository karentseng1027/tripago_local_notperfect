import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardHeader,
    CardBlock,
    CardText,
    Badge,
    Button
} from 'reactstrap';
import {connect} from 'react-redux';
import moment from 'moment';

import {getTransIcon} from 'utilities/weather.js';
import {createVote, pick, deleteTrans} from 'states/trans-actions.js';

import './TransItem.css';

class TransItem extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        transType: PropTypes.string,
        transDepart: PropTypes.string,
        transArrive: PropTypes.string,
        departDate: PropTypes.string,
        arriveDate: PropTypes.string,
        departTime: PropTypes.string,
        arriveTime: PropTypes.string,
        transLink: PropTypes.string,
        transPrice: PropTypes.string,
        transDiscript: PropTypes.string,
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
        const {id, name, user, transType, transDepart, transArrive, departDate, arriveDate, departTime, arriveTime, transLink, transPrice, transDiscript, votes, pick} = this.props;

        return (
            <div className='trans-item'>
                <div className='top-box-big'>
                <div className='d-flex flex-column flex-sm-row justify-content-between'>
                        <div className='trans-name'><i className={`big-icon align-self-center ${getTransIcon(transType)}`} aria-hidden="true"></i>&nbsp;<a href={`${transLink}`} target='_black' >{name}</a><span className='user'>&nbsp;&nbsp; {user}</span></div>
                        <div className='vote-plus align-self-center'>
                            <i className="fa fa-thumbs-up" aria-hidden="true" onClick={() => this.handleVote()}></i>
                            {votes > 0 && <span>{votes}</span>}
                        </div>
                </div>
                </div>

                <div className='top-box-small'>
                    <div className='d-flex'>
                    <div className='trans-name-small'><i className={`small-icon align-self-center ${getTransIcon(transType)}`} aria-hidden="true"></i>&nbsp;<a href={`${transLink}`} target='_blank'>{name}</a><span>&nbsp;&nbsp; {user}</span></div>
                    <div className='trans-name-small ml-auto align-self-center'>
                        <i className="fa fa-thumbs-up" aria-hidden="true" onClick={() => this.handleVote()}></i>
                        {votes > 0 && <span>{votes}</span>}
                    </div>
                    </div>
                </div>
                
                <div className='d-flex justify-content-center'>
                 <Card className='card-big'>
                    <CardHeader className='text-center title'>DEPARTURE</CardHeader>
                    <CardBlock>
                    <CardText className='text-center'>{transDepart} <br/> {departDate} {departTime}</CardText>
                    </CardBlock>
                </Card>

                <Card className='card-big'>
                    <CardHeader className='text-center title'>ARRIVAL</CardHeader>
                    <CardBlock>
                    <CardText className='text-center'>{transArrive} <br/> {arriveDate} {arriveTime}</CardText>
                    </CardBlock>
                </Card>
                </div>
                <br/>
                <Card>
                    <CardText><spam className='discription'>{transDiscript}</spam><br/><br/></CardText>
                </Card>
                
                
                <div className='title to-right'>
                        Price per person : <Badge color="warning">{transPrice}</Badge>
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
        this.props.dispatch(deleteTrans(this.props.id));
    }
}

export default connect((state) => ({
    
}))(TransItem);
