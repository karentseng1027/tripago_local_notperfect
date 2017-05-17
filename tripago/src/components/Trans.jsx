import React from 'react';
import PropTypes from 'prop-types';
import {Alert} from 'reactstrap';
import {connect} from 'react-redux';
import {Button} from 'reactstrap';

import {listTrans} from 'states/trans-actions.js';
import TransForm from 'components/TransForm.jsx';
import TransList from 'components/TransList.jsx';

import './Trans.css';

class Transportation extends React.Component {
    static propTypes = {
        searchText: PropTypes.string,
        trans: PropTypes.array,
        transLoading: PropTypes.bool,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(listTrans(this.props.searchText));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchText !== this.props.searchText) {
            this.props.dispatch(listTrans(nextProps.searchText));
        }
    }

    render() {
        return (
            <div className='transportation'>
                <div className='trans'>
                    <h4 className='label'><i className="fa fa-car" aria-hidden="true"></i>&nbsp;&nbsp;Transportation</h4>
                    <TransForm />
                    <TransList trans={this.props.trans} />{
                        this.props.transLoading &&
                        <Alert color='warning' className='loading'>Loading...</Alert>
                    }
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    searchText: state.searchText,
    ...state.trans
}))(Transportation);