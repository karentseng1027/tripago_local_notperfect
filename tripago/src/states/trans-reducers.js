/* Trans */

const initTransState = {
    transLoading: false,
    trans: []
};

export function trans(state = initTransState, action) {
    switch (action.type) {
        case '@TRANS/START_LOADING':
            return {
                ...state,
                transLoading: true
            };
        case '@TRANS/END_LOADING':
            return {
                ...state,
                transLoading: false
            };
        case '@TRANS/END_LIST_TRANS':
            return {
                ...state,
                trans: action.trans
            };
        default:
            return state;
    }
}

/* TransForm */

const initTransFormState = {
    name: '',
    transType: 'na',
    typeToggle: false,
    transDepart: '',
    transArrive: '',
    departDate: '',
    arriveDate: '',
    departTime: '',
    arriveTime: '',
    transLink: '',
    transPrice: '',
    transDiscript: '',
    inputDanger: false
};

export function transForm(state = initTransFormState, action) {
    switch (action.type) {
        case '@TRANS_FORM/INPUT_TRANS':
            return {
                ...state,
                name: action.name
            };
        case '@TRANS_FORM/TOGGLE_TYPE':
            return {
                ...state,
                typeToggle: action.toggle
            };
        case '@TRANS_FORM/SELECT_TYPE':
            return {
                ...state,
                transType: action.trans_type
            };
        case '@TRANS_FORM/INPUT_DEPART':
            return {
                ...state,
                transDepart: action.station
            };
        case '@TRANS_FORM/INPUT_ARRIVE':
            return {
                ...state,
                transArrive: action.station
            };
        case '@TRANS_FORM/INPUT_DEPART_DATE':
            return {
                ...state,
                departDate: action.date
            };
        case '@TRANS_FORM/INPUT_ARRIVE_DATE':
            return {
                ...state,
                arriveDate: action.date
            };
        case '@TRANS_FORM/INPUT_DEPART_TIME':
            return {
                ...state,
                departTime: action.time
            };
        case '@TRANS_FORM/INPUT_ARRIVE_TIME':
            return {
                ...state,
                arriveTime: action.time
            };
        case '@TRANS_FORM/INPUT_LINK':
            return {
                ...state,
                transLink: action.link
            };
        case '@TRANS_FORM/INPUT_PRICE':
            return {
                ...state,
                transPrice: action.price
            };
        case '@TRANS_FORM/INPUT_DISCRIPT':
            return {
                ...state,
                transDiscript: action.discript
            };
        case '@TRANS_FORM/INPUT_DANGER':
            return {
                ...state,
                inputDanger: action.danger
            };
        default:
            return state;
    };
};