import {
    listPickTrans as listPickTransFromApi,
    listPickHotels as listPickHotelsFromApi,
    listPickSites as listPickSitesFromApi,
} from 'api/results.js';

/* UserInfo */

export function inputGroup(group) {
    return {
        type: '@USER_INFO/INPUT_GROUP',
        group
    };
};

export function inputUser(user) {
    return {
        type: '@USER_INFO/INPUT_USER',
        user
    };
};

/* Login */

export function login(login) {
    return {
        type: '@LOGIN/LOGIN',
        login
    };
};

/* atMain */

export function atMain(bool) {
    return {
        type: '@AT_MAIN/AT_MAIN',
        bool
    };
};

/* Result */

export function inputDanger(danger) {
    return {
        type: '@RESULT/INPUT_DANGER',
        danger
    };
};

function startLoading() {
    return {
        type: '@RESULT/START_LOADING'
    };
}

function endLoading() {
    return {
        type: '@RESULT/END_LOADING'
    };
}

function endListPickTrans(trans) {
    return {
        type: '@RESULT/END_LIST_PICK_TRANS',
        trans
    };
}

function endListPickHotels(hotels) {
    return {
        type: '@RESULT/END_LIST_PICK_HOTELS',
        hotels
    };
}

function endListPickSites(sites) {
    return {
        type: '@RESULT/END_LIST_PICK_SITES',
        sites
    };
}

export function listPickTrans(searchText, loading = false) {
    return (dispatch, getState) => {
        if (!loading)
            dispatch(startLoading());

        return listPickTransFromApi(getState().userInfo, searchText).then(trans => {
            dispatch(endListPickTrans(trans));
            dispatch(endLoading());
        }).catch(err => {
            console.error('Error listing trans', err);
            dispatch(endLoading());
        });
    };
};

export function listPickHotels(searchText, loading = false) {
    return (dispatch, getState) => {
        if (!loading)
            dispatch(startLoading());

        return listPickHotelsFromApi(getState().userInfo, searchText).then(hotels => {
            dispatch(endListPickHotels(hotels));
            dispatch(endLoading());
        }).catch(err => {
            console.error('Error listing hotels', err);
            dispatch(endLoading());
        });
    };
};

export function listPickSites(searchText, loading = false) {
    return (dispatch, getState) => {
        if (!loading)
            dispatch(startLoading());

        return listPickSitesFromApi(getState().userInfo, searchText).then(sites => {
            dispatch(endListPickSites(sites));
            dispatch(endLoading());
        }).catch(err => {
            console.error('Error listing sites', err);
            dispatch(endLoading());
        });
    };
};

function endCountTotalPrice(totalPrice) {
    return {
        type: '@RESULT/END_COUNT_TOTALPRICE',
        totalPrice
    };
};

export function countTotalPrice() {
    return(dispatch, getState) => {
        const results = getState().result;
        let totalPrice = 0;
        if(results.hotels.length > 0) {
            results.hotels.map(h => {
                totalPrice += h.totalPrice;
            })
        }
        if(results.trans.length > 0) {
            results.trans.map(t => {
                totalPrice += parseInt(t.transPrice);
            })
        }
        if(results.sites.length > 0) {
            results.sites.map(s => {
                totalPrice += parseInt(s.sitePrice);
            })
        }
        dispatch(endCountTotalPrice(totalPrice));
    }
}