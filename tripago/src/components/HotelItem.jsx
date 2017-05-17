import React from 'react';
import PropTypes from 'prop-types';
import {
    Table,
    Card,
    CardText,
    CardHeader,
    CardBlock,
    Badge,
    Button
} from 'reactstrap';
import {connect} from 'react-redux';
import moment from 'moment';

import {createVote, pick, deleteHotel} from 'states/hotel-actions.js';

import './HotelItem.css';

class HotelItem extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        hotelLink: PropTypes.string,
        hotelPrice: PropTypes.string,
        hotelDiscript:PropTypes.string,
        wifi: PropTypes.bool,
        bf: PropTypes.bool,
        park: PropTypes.bool,
        gym: PropTypes.bool,
        pet: PropTypes.bool,
        pool: PropTypes.bool,
        totalPrice: PropTypes.number,
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
        const {id, user, name, hotelLink, hotelPrice, hotelDiscript, checkinTs, checkoutTs, wifi, bf, park, gym, pet, pool, totalPrice, votes, pick} = this.props;

        return (
            <div className='hotel-item'>
                {/*NAME and VOTES*/}
                <div className='top-box-big'>
                <div className='d-flex flex-column flex-sm-row justify-content-between'>
                        <div className='hotel-name'><a href={`${hotelLink}` } >{name}</a><span className='user'>&nbsp;&nbsp; {user}</span></div>
                        <div className='vote-plus align-self-center'>
                            <i className="fa fa-thumbs-up" aria-hidden="true" onClick={() => this.handleVote()}></i>
                            {votes > 0 && <span>{votes}</span>}
                        </div>
                </div>
                </div>
                <div className='top-box-small'>
                    <div className='d-flex'>
                    <div className='hotel-name-small'><a href={`${hotelLink}`} target='_blank'>{name}</a><span className='user'>&nbsp;&nbsp; {user}</span></div>
                    <div className='hotel-name-small ml-auto align-self-center'>
                        <i className="fa fa-thumbs-up" aria-hidden="true" onClick={() => this.handleVote()}></i>
                        {votes > 0 && <span>{votes}</span>}
                    </div>
                    </div>
                </div>
                
                {/*INFO*/}
                <div className='hotel-box'>
                    <div className='d-flex justify-content-center'>
                    <Card className='card-big'>
                        <CardHeader className='text-center title'>CHECK-IN</CardHeader>
                        <CardBlock>
                        <CardText className='text-center title'>{checkinTs}</CardText>
                        </CardBlock>
                    </Card>

                    <Card className='card-big'>
                        <CardHeader className='text-center'>CHECK-OUT</CardHeader>
                        <CardBlock>
                        <CardText className='text-center'>{checkoutTs}</CardText>
                        </CardBlock>
                    </Card>
                    </div>
                    <br/>

                    <Table responsive size="sm">
                        <tbody>
                        <tr>
                            <td>{wifi ? <i className="fa fa-check" aria-hidden="true"></i> : <div>&nbsp;&nbsp;</div>}</td>
                            <td>Wifi</td>
                            <td>{bf ? <i className="fa fa-check" aria-hidden="true"></i> : <div>&nbsp;&nbsp;</div>}</td>
                            <td>Breakfast</td>
                        </tr>
                        <tr>
                            <td>{park ? <i className="fa fa-check" aria-hidden="true"></i> : <div>&nbsp;&nbsp;</div>}</td>
                            <td>Parking</td>
                            <td>{gym ? <i className="fa fa-check" aria-hidden="true"></i> : <div>&nbsp;&nbsp;</div>}</td>
                            <td>Gym</td>
                        </tr>
                         <tr>
                            <td>{pet ? <i className="fa fa-check" aria-hidden="true"></i> : <div>&nbsp;&nbsp;</div>}</td>
                            <td>Pet Friendly</td>
                            <td>{pool ? <i className="fa fa-check" aria-hidden="true"></i> : <div>&nbsp;&nbsp;</div>}</td>
                            <td>Pool</td>
                        </tr>
                        </tbody>
                    </Table>
                    
                    <Card>
                        <CardText><spam className='discription'>{hotelDiscript}</spam><br/><br/></CardText>
                    </Card>
                    
                    
                    <div className='title to-right'>
                            Price per night : <Badge color="warning">{hotelPrice}</Badge>
                            <br/>
                            Price for {totalPrice/hotelPrice} nights: <Badge color="warning">{totalPrice}</Badge>
                        </div>
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
        this.props.dispatch(deleteHotel(this.props.id));
    }
}

export default connect((state) => ({
    
}))(HotelItem);
