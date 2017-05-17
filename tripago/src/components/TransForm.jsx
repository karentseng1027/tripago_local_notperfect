import React from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    Input,
    Button,
    ButtonDropdown,
    Card,
    CardHeader,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import {connect} from 'react-redux';

import {getTransIcon} from 'utilities/weather.js';
import {createTrans, inputTrans, toggleType, selectType, inputDepart, inputArrive, inputDepartDate, inputArriveDate,
        inputDepartTime, inputArriveTime, inputLink, inputPrice, inputDiscript, inputDanger} from 'states/trans-actions.js';

import './TransForm.css';

class TransForm extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        transType: PropTypes.string,
        typeToggle: PropTypes.bool,
        transDepart: PropTypes.string,
        transArrive: PropTypes.string,
        departDate: PropTypes.string,
        arriveDate: PropTypes.string,
        departTime: PropTypes.string,
        arriveTime: PropTypes.string,
        transLink: PropTypes.string,
        transPrice: PropTypes.string,
        transDiscript: PropTypes.string,
        inputDanger: PropTypes.bool,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.handleInputTransName = this.handleInputTransName.bind(this);
        this.handleTypeToggle = this.handleTypeToggle.bind(this);
        this.handleDropdownSelect = this.handleDropdownSelect.bind(this);
        this.handleInputTransDepart = this.handleInputTransDepart.bind(this);
        this.handleInputTransArrive = this.handleInputTransArrive.bind(this);
        this.handleDepartDate = this.handleDepartDate.bind(this);
        this.handleArriveDate = this.handleArriveDate.bind(this);
        this.handleDepartTime = this.handleDepartTime.bind(this);
        this.handleArriveTime = this.handleArriveTime.bind(this);
        this.handleInputTransLink = this.handleInputTransLink.bind(this);
        this.handleInputTransPrice = this.handleInputTransPrice.bind(this);
        this.handleInputTransDiscript = this.handleInputTransDiscript.bind(this);

        this.handlePost = this.handlePost.bind(this);
    }

    render() {
        const inputDanger = this.props.inputDanger ? 'has-danger' : '';

        return (
            <div className='trans-form'>
                <Alert color='warning' className={`${inputDanger}`}>
                    <div className='align-self-start title'>&nbsp;NAME</div>
                    <div className='d-flex'>
                        <Input type='text' value={this.props.name} onChange={this.handleInputTransName} placeholder='Transportation Name'/>
                        <ButtonDropdown type='buttom' isOpen={this.props.typeToggle} toggle={this.handleTypeToggle}>
                            <DropdownToggle className='type-toggle' type='button' caret color="secondary">
                                <i className={getTransIcon(this.props.transType)}></i>
                                &nbsp;{
                                    this.props.transType === 'na' ? 'TYPE' : this.props.transType
                                }
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Airplane')}><i className="fa fa-plane" aria-hidden="true"></i>&nbsp;&nbsp;Airplane</DropdownItem>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Train')}><i className="fa fa-train" aria-hidden="true"></i>&nbsp;&nbsp;Train</DropdownItem>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Bus')}><i className="fa fa-bus" aria-hidden="true"></i>&nbsp;&nbsp;Bus</DropdownItem>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Subway')}><i className="fa fa-subway" aria-hidden="true"></i>&nbsp;&nbsp;Subway</DropdownItem>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Taxi')}><i className="fa fa-taxi" aria-hidden="true"></i>&nbsp;&nbsp;Taxi</DropdownItem>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Ship')}><i className="fa fa-ship" aria-hidden="true"></i>&nbsp;&nbsp;Ship</DropdownItem>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Rocket')}><i className="fa fa-rocket" aria-hidden="true"></i>&nbsp;&nbsp;Rocket</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </div>
                    

                    <br/>

                    <div className='d-flex flex-column flex-sm-row justify-content-center'>
                        <div className='station-input title align-self-start'>&nbsp;DEPARTURE</div>
                        <div className='station-input title align-self-end'>&nbsp;ARRIVAL</div>
                    </div>

                    <div className='d-flex justify-content-center'>
                    <Card className='card-big'>
                        <div className='station-input title-sm'>&nbsp;STATION<Input type='text' value={this.props.transDepart} onChange={this.handleInputTransDepart} placeholder='Depart Station'/></div>
                        <div className='station-input title-sm'>&nbsp;DATE <Input type='date' value={this.props.departDate} onChange={this.handleDepartDate}/></div>
                        <div className='station-input title-sm'>&nbsp;TIME <Input type='time' value={this.props.departTime} onChange={this.handleDepartTime}/></div>
                    </Card>
                    <Card className='card-big'>
                        <div className='station-input title-sm'>&nbsp;STATION<Input type='text' value={this.props.transArrive} onChange={this.handleInputTransArrive} placeholder='Arrive Station'/></div>
                        <div className='station-input title-sm'>&nbsp;DATE <Input type='date' value={this.props.arriveDate} onChange={this.handleArriveDate}/></div>
                        <div className='station-input title-sm'>&nbsp;TIME <Input type='time' value={this.props.arriveTime} onChange={this.handleArriveTime}/></div>
                    </Card>
                    </div>

                    {/*<div className='d-flex flex-column flex-sm-row justify-content-center'>
                        <div className='station-input title align-self-start'>&nbsp;DEPART STATION<Input type='text' value={this.props.transDepart} onChange={this.handleInputTransDepart} placeholder='Depart Station'/></div>
                        <div className='station-input title align-self-end'>&nbsp;ARRIVE STATION<Input type='text' value={this.props.transArrive} onChange={this.handleInputTransArrive} placeholder='Arrive Station'/></div>
                    </div>
                    <div className='title'>
                    <div className='d-flex flex-column flex-sm-row justify-content-center'>
                        <div className='station-input title align-self-start'>&nbsp;Depart DATE <Input type='date' value={this.props.departDate} onChange={this.handleDepartDate}/></div>
                        <div className='station-input title align-self-start'>&nbsp;Arrive DATE <Input type='date' value={this.props.arriveDate} onChange={this.handleArriveDate}/></div>
                    </div>
                    <div className='d-flex flex-column flex-sm-row justify-content-center'>
                        <div className='station-input title align-self-start'>&nbsp;Depart TIME <Input type='time' value={this.props.departTime} onChange={this.handleDepartTime}/></div>
                        <div className='station-input title align-self-start'>&nbsp;Arrive TIME <Input type='time' value={this.props.arriveTime} onChange={this.handleArriveTime}/></div>
                    </div>*/}
                    
                    <br/>

                    <div className='align-self-start title '>&nbsp;LINK</div>
                    <Input type='text' value={this.props.transLink} onChange={this.handleInputTransLink} placeholder='Booking Link'/>
                    <br/>

                    <div className='align-self-start title '>&nbsp;PRICE</div>
                    <Input type='text' value={this.props.transPrice} onChange={this.handleInputTransPrice} placeholder='Price per person'/>
                    <br/>

                    <div className='align-self-start title '>&nbsp;DISCRIPTION</div>
                    <Input type='textarea' value={this.props.transDiscript} onChange={this.handleInputTransDiscript} placeholder='Discription'/>
                    <br/>

                    <div className='d-flex flex-column'>
                    <Button className='btn-post align-self-center' color="warning" onClick={this.handlePost}>Nominate</Button>
                    </div>
                </Alert>
            </div>
        );
    }

    handleInputTransName(e) {
        const text = e.target.value;
        this.props.dispatch(inputTrans(text));
        if(text && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handleTypeToggle(e) {
        this.props.dispatch(toggleType(!this.props.typeToggle));
    }

    handleDropdownSelect(type) {
        this.props.dispatch(selectType(type));
    }

    handleInputTransDepart(e) {
        const text = e.target.value;
        this.props.dispatch(inputDepart(text));
        if(text && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handleInputTransArrive(e) {
        const text = e.target.value;
        this.props.dispatch(inputArrive(text));
        if(text && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handleDepartDate(e) {
        const date = e.target.value;
        this.props.dispatch(inputDepartDate(date));
        if(date && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handleArriveDate(e) {
        const date = e.target.value;
        this.props.dispatch(inputArriveDate(date));
        if(date && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handleDepartTime(e) {
        const time = e.target.value;
        this.props.dispatch(inputDepartTime(time));
        if(time && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handleArriveTime(e) {
        const time = e.target.value;
        this.props.dispatch(inputArriveTime(time));
        if(time && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handleInputTransLink(e) {
        const text = e.target.value;
        this.props.dispatch(inputLink(text));
        if(text && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }
    
    handleInputTransPrice(e) {
        const text = e.target.value;
        this.props.dispatch(inputPrice(text));
        if(text && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handleInputTransDiscript(e) {
        const text = e.target.value;
        this.props.dispatch(inputDiscript(text));
        if(text && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handlePost() {
        const {name, transType, typeToggle, transDepart, transArrive, departDate, arriveDate, departTime, arriveTime, transLink, transPrice, transDiscript} = this.props;
        if(transType === 'na') {
            this.props.dispatch(toggleType(true));
        }
        if(!name || !transDepart || !transArrive || !departDate || !arriveDate || !departTime || !arriveTime || !transLink || !transLink || !transDiscript) {
            this.props.dispatch(inputDanger(true));
            return;
        }

        this.props.dispatch(createTrans(name, transType, transDepart, transArrive, departDate, arriveDate, departTime, arriveTime, transLink, transPrice, transDiscript));
        this.props.dispatch(inputTrans(''));
        this.props.dispatch(selectType('na'));
        this.props.dispatch(inputDepart(''));
        this.props.dispatch(inputArrive(''));
        this.props.dispatch(inputDepartDate(''));
        this.props.dispatch(inputArriveDate(''));
        this.props.dispatch(inputDepartTime(''));
        this.props.dispatch(inputArriveTime(''));
        this.props.dispatch(inputLink(''));
        this.props.dispatch(inputPrice(''));
        this.props.dispatch(inputDiscript(''));
    }
}

export default connect(state => ({
    ...state.transForm
}))(TransForm);