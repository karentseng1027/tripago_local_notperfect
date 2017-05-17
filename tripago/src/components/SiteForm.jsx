import React from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    Input,
    Button,
    ButtonGroup,
    ButtonDropdown,
    Card,
    CardText,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import {connect} from 'react-redux';

import {createSite, inputSite, toggleType, selectType, daysOpen1, daysOpen2, daysOpen3, daysOpen4, daysOpen5, daysOpen6, daysOpen7,inputOpenTime, inputCloseTime, inputLink, inputPrice, inputDiscript, inputDanger} from 'states/site-actions.js';
import {getSiteIcon} from 'utilities/weather.js';
import './SiteForm.css';

class SiteForm extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        siteType: PropTypes.string,
        typeToggle: PropTypes.bool,
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
        inputDanger: PropTypes.bool,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.handleInputSiteName = this.handleInputSiteName.bind(this);
        this.handleTypeToggle = this.handleTypeToggle.bind(this);
        this.handleDropdownSelect = this.handleDropdownSelect.bind(this);
        this.checkboxClick1 = this.checkboxClick1.bind(this);
        this.checkboxClick2 = this.checkboxClick2.bind(this);
        this.checkboxClick3 = this.checkboxClick3.bind(this);
        this.checkboxClick4 = this.checkboxClick4.bind(this);
        this.checkboxClick5 = this.checkboxClick5.bind(this);
        this.checkboxClick6 = this.checkboxClick6.bind(this);
        this.checkboxClick7 = this.checkboxClick7.bind(this);
        this.handleInputOpenTime = this.handleInputOpenTime.bind(this);
        this.handleInputCloseTime = this.handleInputCloseTime.bind(this);
        this.handleInputSiteLink = this.handleInputSiteLink.bind(this);
        this.handleInputSitePrice = this.handleInputSitePrice.bind(this);
        this.handleInputSiteDiscript = this.handleInputSiteDiscript.bind(this);

        this.handlePost = this.handlePost.bind(this);
    }

    render() {
        const inputDanger = this.props.inputDanger ? 'has-danger' : '';

        return (
            <div className='site-form'>
                <Alert color='warning' className={`${inputDanger}`}>
                    <div className='align-self-start title'>&nbsp;NAME</div>
                    <div className='d-flex'>
                    <Input type='text' value={this.props.name} onChange={this.handleInputSiteName} placeholder='Site Name'/>
                    <ButtonDropdown type='buttom' isOpen={this.props.typeToggle} toggle={this.handleTypeToggle}>
                        <DropdownToggle className='type-toggle' type='button' caret color="secondary">
                            <i className="fa fa-question-circle-o" aria-hidden="true"></i>&nbsp;{
                                this.props.siteType === 'na' ? 'TYPE' : this.props.siteType
                            }
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Scenery')}><i className="material-icons big-icon align-self-center">local_florist</i>&nbsp;&nbsp;Scenery</DropdownItem>
                            <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Museum')}><i className="material-icons big-icon align-self-center">color_lens</i>&nbsp;&nbsp;Museum</DropdownItem>
                            <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Multimedia')}><i className="material-icons big-icon align-self-center">movie</i>&nbsp;&nbsp;Multimedia</DropdownItem>
                            <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Outdoor Activity')}><i className="material-icons big-icon align-self-center">wb_sunny</i>&nbsp;&nbsp;Outdoor Activity</DropdownItem>
                            <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Beach')}><i className="material-icons big-icon align-self-center">beach_access</i>&nbsp;&nbsp;Beach</DropdownItem>
                            <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Others')}><i className="material-icons big-icon align-self-center">tag_faces</i>&nbsp;&nbsp;Others</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                    </div>
                    <br/>

                    <div className='align-self-start title '>&nbsp;OPEN DAYS and HOURS</div>
                    <Card block>
                        <div className='box-big d-flex justify-content-between'>
                            <Button color="secondary" onClick={() => this.checkboxClick1()} active={this.props.mon}>Mon.</Button>
                            <Button color="secondary" onClick={() => this.checkboxClick2()} active={this.props.tue}>Tue.</Button>
                            <Button color="secondary" onClick={() => this.checkboxClick3()} active={this.props.wed}>Wed.</Button>
                            <Button color="secondary" onClick={() => this.checkboxClick4()} active={this.props.thur}>Thur.</Button>
                            <Button color="secondary" onClick={() => this.checkboxClick5()} active={this.props.fri}>Fri.</Button>
                            <Button color="secondary" onClick={() => this.checkboxClick6()} active={this.props.sat}>Sat.</Button>
                            <Button color="secondary" onClick={() => this.checkboxClick7()} active={this.props.sun}>Sun.</Button>
                        </div>
                        <div className='box-small d-flex justify-content-between'>
                            <Button className='btn-sm' color="secondary" onClick={() => this.checkboxClick1()} active={this.props.mon}>M</Button>
                            <Button className='btn-sm' color="secondary" onClick={() => this.checkboxClick2()} active={this.props.tue}>T</Button>
                            <Button className='btn-sm' color="secondary" onClick={() => this.checkboxClick3()} active={this.props.wed}>W</Button>
                            <Button className='btn-sm' color="secondary" onClick={() => this.checkboxClick4()} active={this.props.thur}>Th</Button>
                            <Button className='btn-sm' color="secondary" onClick={() => this.checkboxClick5()} active={this.props.fri}>F</Button>
                            <Button className='btn-sm' color="secondary" onClick={() => this.checkboxClick6()} active={this.props.sat}>Sa</Button>
                            <Button className='btn-sm' color="secondary" onClick={() => this.checkboxClick7()} active={this.props.sun}>Su</Button>
                        </div>

                        <div className='d-flex flex-column flex-sm-row justify-content-center'>
                            <div className='time-block title align-self-start'>&nbsp;FROM<Input type='time' value={this.props.openTime} onChange={this.handleInputOpenTime}/></div>
                            <div className='time-block title align-self-end'>&nbsp;TO<Input type='time' value={this.props.closeTime} onChange={this.handleInputCloseTime}/></div>
                        </div>
                    </Card>
                    <br/>

                    <div className='align-self-start title '>&nbsp;LINK</div>
                    <Input type='text' value={this.props.siteLink} onChange={this.handleInputSiteLink} placeholder='Booking or Site Link'/>
                    <br/>

                    <div className='align-self-start title '>&nbsp;PRICE</div>
                    <Input type='text' value={this.props.sitePrice} onChange={this.handleInputSitePrice} placeholder='Price per person'/>
                    <br/>

                    <div className='align-self-start title '>&nbsp;DISCRIPTION</div>
                    <Input type='textarea' value={this.props.siteDiscript} onChange={this.handleInputSiteDiscript} placeholder='Discription'/>
                    <br/>
                    
                    <div className='d-flex flex-column'>
                    <Button className='align-self-center btn-post' color="warning" onClick={this.handlePost}>Nominate</Button>
                    </div>
                </Alert>
            </div>
        );
    }

    handleInputSiteName(e) {
        const text = e.target.value;
        this.props.dispatch(inputSite(text));
        if (text && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handleTypeToggle(e) {
        this.props.dispatch(toggleType(!this.props.typeToggle));
    }

    handleDropdownSelect(type) {
        this.props.dispatch(selectType(type));
    }

    checkboxClick1() {
        this.props.dispatch(daysOpen1(!this.props.mon))
    }

    checkboxClick2() {
        this.props.dispatch(daysOpen2(!this.props.tue))
    }

    checkboxClick3() {
        this.props.dispatch(daysOpen3(!this.props.wed))
    }

    checkboxClick4() {
        this.props.dispatch(daysOpen4(!this.props.thur))
    }

    checkboxClick5() {
        this.props.dispatch(daysOpen5(!this.props.fri))
    }

    checkboxClick6() {
        this.props.dispatch(daysOpen6(!this.props.sat))
    }

    checkboxClick7() {
        this.props.dispatch(daysOpen7(!this.props.sun))
    }

    handleInputOpenTime(e) {
        const time = e.target.value;
        this.props.dispatch(inputOpenTime(time));
        if (time && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handleInputCloseTime(e) {
        const time = e.target.value;
        this.props.dispatch(inputCloseTime(time));
        if (time && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handleInputSiteLink(e) {
        const text = e.target.value;
        this.props.dispatch(inputLink(text));
        if (text && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handleInputSitePrice(e) {
        const text = e.target.value;
        this.props.dispatch(inputPrice(text));
        if (text && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handleInputSiteDiscript(e) {
        const text = e.target.value;
        this.props.dispatch(inputDiscript(text));
        if (text && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handlePost() {
        const {name, siteType, mon, tue, wed, thur, fri, sat, sun, openTime, closeTime, siteLink, sitePrice, siteDiscript} = this.props;
        if(siteType === 'na') {
            this.props.dispatch(toggleType(true));
        }
        if(!name || !openTime || !closeTime || !siteLink || !sitePrice || !siteDiscript) {
            this.props.dispatch(inputDanger(true));
            return;
        }

        this.props.dispatch(createSite(name, siteType, mon, tue, wed, thur, fri, sat, sun, openTime, closeTime, siteLink, sitePrice, siteDiscript));
        this.props.dispatch(inputSite(''));
        this.props.dispatch(selectType('na'));
        this.props.dispatch(daysOpen1(false));
        this.props.dispatch(daysOpen2(false));
        this.props.dispatch(daysOpen3(false));
        this.props.dispatch(daysOpen4(false));
        this.props.dispatch(daysOpen5(false));
        this.props.dispatch(daysOpen6(false));
        this.props.dispatch(daysOpen7(false));
        this.props.dispatch(inputOpenTime(''));
        this.props.dispatch(inputCloseTime(''));
        this.props.dispatch(inputLink(''));
        this.props.dispatch(inputPrice(''));
        this.props.dispatch(inputDiscript(''));
    }
}

export default connect(state => ({
    ...state.siteForm
}))(SiteForm);
