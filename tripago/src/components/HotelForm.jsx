import React from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    Input,
    Table,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import {connect} from 'react-redux';

import {
    createHotel,
    inputHotel,
    inputLink,
    inputPrice,
    inputDiscript,
    inputCheckinTime,
    inputCheckoutTime,
    checkWifi,
    checkBf,
    checkPark,
    checkGym,
    checkPet,
    checkPool,
    inputDanger} from 'states/hotel-actions.js';

import './HotelForm.css';

class HotelForm extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        checkinTs: PropTypes.string,
        checkoutTs: PropTypes.string,
        hotelLink: PropTypes.string,
        hotelPrice: PropTypes.string,
        hotelDiscript: PropTypes.string, 
        wifi: PropTypes.bool,
        bf: PropTypes.bool,
        park: PropTypes.bool,
        gym: PropTypes.bool,
        pet: PropTypes.bool,
        pool: PropTypes.bool,
        inputDanger: PropTypes.bool,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.handleInputHotelName = this.handleInputHotelName.bind(this);
        this.handleCheckInTime = this.handleCheckInTime.bind(this);
        this.handleCheckOutTime = this.handleCheckOutTime.bind(this);
        this.handleInputLink = this.handleInputLink.bind(this);
        this.handleInputPrice = this.handleInputPrice.bind(this);
        this.handleInputDiscript = this.handleInputDiscript.bind(this);
        this.handleCheckWifi = this.handleCheckWifi.bind(this);
        this.handleCheckBf = this.handleCheckBf.bind(this);
        this.handleCheckPark = this.handleCheckPark.bind(this);
        this.handleCheckGym = this.handleCheckGym.bind(this);
        this.handleCheckPet = this.handleCheckPet.bind(this);
        this.handleCheckPool = this.handleCheckPool.bind(this);

        this.handlePost = this.handlePost.bind(this);
    }

    render() {
        const inputDanger = this.props.inputDanger ? 'has-danger' : '';

        return (
            <div className='hotel-form'>
                <Alert color='warning' className={`${inputDanger}`}>
                    <div className='align-self-start title'>&nbsp;NAME</div>
                    <Input className='' type='text' value={this.props.name} onChange={this.handleInputHotelName} placeholder="Hotel Name"></Input>
                    <br/>
                    <div className='d-flex flex-column flex-sm-row justify-content-center'>
                        <div className='dateinput align-self-start title'>&nbsp;CHECK-IN DATE<Input className='' type='date' value={this.props.checkinTs} onChange={this.handleCheckInTime} /></div>
                        <div className='dateinput align-self-end title'>&nbsp;CHECK-OUT DATE<Input className='' type='date' value={this.props.checkoutTs} onChange={this.handleCheckOutTime} /></div>
                    </div>
                    <br/>
                    <div className='align-self-start title '>&nbsp;LINK</div>
                    <Input type='text' value={this.props.hotelLink} onChange={this.handleInputLink} placeholder="Booking Link"/>
                    <br/>
                    <div className='align-self-start title'>&nbsp;PRICE</div>
                    <Input type='text' value={this.props.hotelPrice} onChange={this.handleInputPrice} placeholder="Price per night (per person)"/>
                    
                    <br/>
                        <Table responsive>
                        <tbody>
                        <tr>
                            <td>{this.props.wifi ? //wifi
                                        <input type='checkbox' value='wifi' checked onClick={this.handleCheckWifi}/>
                                        :
                                        <input type='checkbox' value='wifi' onClick={this.handleCheckWifi}/>
                                    }</td>
                            <td className='title'><i className="material-icons font-size">wifi</i>&nbsp;&nbsp;WiFi</td>
                            <td>{this.props.bf ?    //bf
                                        <input type='checkbox' value='breakfast' checked onClick={this.handleCheckBf}/>
                                        :
                                        <input type='checkbox' value='breakfast' onClick={this.handleCheckBf}/>
                                    }</td>
                            <td className='title'><i className="material-icons font-size">free_breakfast</i>&nbsp;&nbsp;Breakfast</td>
                        </tr>
                        <tr>
                            <td>{this.props.park ?  //park
                                        <input type='checkbox' value='park' checked onClick={this.handleCheckPark}/>
                                        :
                                        <input type='checkbox' value='park' onClick={this.handleCheckPark}/>
                                    }</td>
                            <td className='title'><i className="material-icons font-size">local_parking</i>&nbsp;&nbsp;Parking</td>
                            <td>{this.props.gym ?   //gym
                                        <input type='checkbox' value='gym' checked onClick={this.handleCheckGym}/>
                                        :
                                        <input type='checkbox' value='gym' onClick={this.handleCheckGym}/>
                                    }</td>
                            <td className='title'><i className="material-icons font-size">fitness_center</i>&nbsp;&nbsp;Gym</td>
                        </tr>
                        <tr>
                            <td>{this.props.pet ?  //pet
                                        <input type='checkbox' value='pet' checked onClick={this.handleCheckPet}/>
                                        :
                                        <input type='checkbox' value='pet' onClick={this.handleCheckPet}/>
                                    }</td>
                            <td className='title'><i className="material-icons font-size">pets</i>&nbsp;&nbsp;Pet <spam className='hide'>Friendly</spam></td>
                            <td>{this.props.pool ?  //pool
                                        <input type='checkbox' value='pool' checked onClick={this.handleCheckPool}/>
                                        :
                                        <input type='checkbox' value='pool' onClick={this.handleCheckPool}/>
                                    }</td>
                            <td className='title'><i className="material-icons font-size">pool</i>&nbsp;&nbsp;Pool</td>
                        </tr>
                        </tbody>
                    </Table>
                    
                    <br/>
                    <div className='align-self-start title '>&nbsp;DISCRIPTION</div>
                    <Input type='textarea' rows='5' value={this.props.hotelDiscript} onChange={this.handleInputDiscript} placeholder="Discription"/>
                    <br/>
                    <div className='d-flex flex-column'>
                    <Button className='align-self-center btn-post' color="warning" onClick={this.handlePost}>Nominate</Button>
                    </div>
                    <br/>
                </Alert>
            </div>
        );
    }

    handleInputHotelName(e) {
        const text = e.target.value
        this.props.dispatch(inputHotel(text));
        if (text && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handleCheckInTime(e) {
        const time = e.target.value;
        this.props.dispatch(inputCheckinTime(time));
        if (time && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handleCheckOutTime(e) {
        const time = e.target.value;
        this.props.dispatch(inputCheckoutTime(time));
        if (time && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handleInputLink(e) {
        const link = e.target.value
        this.props.dispatch(inputLink(link));
        if (link && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handleInputPrice(e) {
        const price = e.target.value;
        this.props.dispatch(inputPrice(price));
        if (price && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handleInputDiscript(e) {
        const discription = e.target.value;
        this.props.dispatch(inputDiscript(discription));
        if (discription && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handleCheckWifi(e) {
            this.props.dispatch(checkWifi(!this.props.wifi))
    }

    handleCheckBf(e) {
        this.props.dispatch(checkBf(!this.props.bf));
    }

    handleCheckPark(e) {
        this.props.dispatch(checkPark(!this.props.park));
    }

    handleCheckGym(e) {
        this.props.dispatch(checkGym(!this.props.gym));
    }

    handleCheckPet(e) {
        this.props.dispatch(checkPet(!this.props.pet));
    }

    handleCheckPool(e) {
        this.props.dispatch(checkPool(!this.props.pool));
    }
    handlePost() {
        if(!this.props.name) {
            console.log("name");
            this.props.dispatch(inputDanger(true));
            return;
        }
        if(this.props.checkinTs === 0) {
            console.log("in");
            this.props.dispatch(inputDanger(true));
            return;
        }
        if(this.props.checkoutTs === 0) {
            console.log("out");
            this.props.dispatch(inputDanger(true));
            return;
        }
        if(!this.props.hotelLink) {
            console.log("link");
            this.props.dispatch(inputDanger(true));
            return;
        }
        if(!this.props.hotelPrice) {
            console.log("$");
            this.props.dispatch(inputDanger(true));
            return;
        }
        if(!this.props.hotelDiscript) {
            console.log("dis");
            this.props.dispatch(inputDanger(true));
            return;
        }

        this.props.dispatch(createHotel(this.props.name, this.props.hotelLink, this.props.hotelPrice, 
            this.props.hotelDiscript, this.props.checkinTs, this.props.checkoutTs, this.props.wifi, this.props.bf, this.props.park, this.props.gym, this.props.pet, this.props.pool));
        this.props.dispatch(inputHotel(''));
        this.props.dispatch(inputPrice(''));
        this.props.dispatch(inputLink(''));
        this.props.dispatch(inputDiscript(''));
        this.props.dispatch(inputCheckinTime(''));
        this.props.dispatch(inputCheckoutTime(''));
        this.props.dispatch(checkWifi(false));
        this.props.dispatch(checkBf(false));
        this.props.dispatch(checkPark(false));
        this.props.dispatch(checkGym(false));
        this.props.dispatch(checkPet(false));
        this.props.dispatch(checkPool(false));
    }
}

export default connect(state => ({
    ...state.hotelForm
}))(HotelForm);
