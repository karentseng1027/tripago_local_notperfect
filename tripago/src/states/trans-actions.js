import {
    listTrans as listTransFromApi,
    createTrans as createTransFromApi,
    createVote as createVoteFromApi,
    pick as pickFromApi,
    deleteTrans as deleteTransFromApi
} from 'api/trans.js';

import { listPickTrans } from './result-actions';

/* Trans */

function startLoading() {
    return {
        type: '@TRANS/START_LOADING'
    };
}

function endLoading() {
    return {
        type: '@TRANS/END_LOADING'
    };
}

function endListTrans(trans) {
    return {
        type: '@TRANS/END_LIST_TRANS',
        trans
    };
}

export function listTrans(searchText, loading = false) {
    return (dispatch, getState) => {
        if (!loading)
            dispatch(startLoading());

        return listTransFromApi(getState().userInfo, searchText).then(trans => {
            dispatch(endListTrans(trans));
            dispatch(endLoading());
        }).catch(err => {
            console.error('Error listing trans', err);
            dispatch(endLoading());
        });
    };
};

export function createTrans(name, transType, transDepart, transArrive, departDate, arriveDate, departTime, arriveTime, transLink, transPrice, transDiscript) {
    return (dispatch, getState) => {
        dispatch(startLoading());

        return createTransFromApi(getState().userInfo, name, transType, transDepart, transArrive, departDate, arriveDate, departTime, arriveTime, transLink, transPrice, transDiscript).then(trans => {
            dispatch(listTrans(getState().searchText, true));
        }).catch(err => {
            console.error('Error creating trans', err);
            dispatch(endLoading());
        });
    };
};

export function createVote(id) {
    return (dispatch, getState) => {
        dispatch(startLoading());

        return createVoteFromApi(getState().userInfo, id).then(trans => {
            dispatch(listTrans(getState().searchText, true));
        }).catch(err => {
            console.error('Error creating vote', err);
            dispatch(endLoading());
        });
    };
};

/* TransForm */

export function inputTrans(name) {
    return {
        type: '@TRANS_FORM/INPUT_TRANS',
        name
    };
};

export function toggleType(toggle) {
    return {
        type: '@TRANS_FORM/TOGGLE_TYPE',
        toggle
    };
};

export function selectType(trans_type) {
    return {
        type: '@TRANS_FORM/SELECT_TYPE',
        trans_type
    };
};

export function inputDepart(station) {
    return {
        type: '@TRANS_FORM/INPUT_DEPART',
        station
    };
};

export function inputArrive(station) {
    return {
        type: '@TRANS_FORM/INPUT_ARRIVE',
        station
    };
};

export function inputDepartDate(date) {
    return {
        type: '@TRANS_FORM/INPUT_DEPART_DATE',
        date
    };
};

export function inputArriveDate(date) {
    return {
        type: '@TRANS_FORM/INPUT_ARRIVE_DATE',
        date
    };
};

export function inputDepartTime(time) {
    return {
        type: '@TRANS_FORM/INPUT_DEPART_TIME',
        time
    };
};

export function inputArriveTime(time) {
    return {
        type: '@TRANS_FORM/INPUT_ARRIVE_TIME',
        time
    };
};

export function inputLink(link) {
    return {
        type: '@TRANS_FORM/INPUT_LINK',
        link
    };
};

export function inputPrice(price) {
    return {
        type: '@TRANS_FORM/INPUT_PRICE',
        price
    };
};

export function inputDiscript(discript) {
    return {
        type: '@TRANS_FORM/INPUT_DISCRIPT',
        discript
    };
};

export function inputDanger(danger) {
    return {
        type: '@TRANS_FORM/INPUT_DANGER',
        danger
    };
};

/* TransItem */

export function pick(id) {
    return (dispatch, getState) => {
        dispatch(startLoading());

        return pickFromApi(id).then(trans => {
            dispatch(listTrans(getState().searchText, true));
            dispatch(listPickTrans(getState().searchText, true));
        }).catch(err => {
            console.error('Error picking', err);
            dispatch(endLoading());
        });
    };
};

export function deleteTrans(id) {
    return (dispatch, getState) => {
        dispatch(startLoading());

        return deleteTransFromApi(id).then(trans => {
            dispatch(listTrans(getState().searchText, true));
            dispatch(listPickTrans(getState().searchText, true));
        }).catch(err => {
            console.error('Error deleting', err);
            dispatch(endLoading());
        });
    };
}