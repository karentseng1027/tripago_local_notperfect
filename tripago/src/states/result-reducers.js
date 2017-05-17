const initUserInfoState = {
    inputGroup: '',
    inputUser: '',
}

export function userInfo(state = initUserInfoState, action) {
    switch (action.type) {
        case '@USER_INFO/INPUT_GROUP':
            return {
                ...state,
                inputGroup: action.group
            };
        case '@USER_INFO/INPUT_USER':
            return {
                ...state,
                inputUser: action.user
            };
        default:
            return state;
    };
};

const initLoginState = {
    login: false
};

export function login(state = initLoginState, action) {
    switch (action.type) {
        case '@LOGIN/LOGIN':
            return {
                ...state,
                login: action.login
            };
        default:
            return state;
    };
};

const initAtMainState = {
    atMain: false
};

export function atMain(state = initAtMainState, action) {
    switch (action.type) {
        case '@AT_MAIN/AT_MAIN':
            return {
                ...state,
                atMain: action.bool
            };
        default:
            return state;
    };
};

const initResultState = {
    loading: false,
    trans: [],
    hotels: [],
    sites: [],
    totalPrice: 0,
    inputDanger: false
};

export function result(state = initResultState, action) {
    switch (action.type) {
        case '@RESULT/INPUT_DANGER':
            return {
                ...state,
                inputDanger: action.danger
            };
        case '@RESULT/START_LOADING':
            return {
                ...state,
                loading: true
            };
        case '@RESULT/END_LOADING':
            return {
                ...state,
                loading: false
            };
        case '@RESULT/END_LIST_PICK_TRANS':
            return {
                ...state,
                trans: action.trans
            };
        case '@RESULT/END_LIST_PICK_HOTELS':
            return {
                ...state,
                hotels: action.hotels
            };
        case '@RESULT/END_LIST_PICK_SITES':
            return {
                ...state,
                sites: action.sites
            };
        case '@RESULT/END_COUNT_TOTALPRICE':
            return {
                ...state,
                totalPrice: action.totalPrice
            };
        default:
            return state;
    };
};