import {
    listHotels as listHotelsFromApi,
    createHotel as createHotelFromApi,
    createVote as createVoteFromApi,
    pick as pickFromApi,
    deleteHotel as deleteHotelFromApi
} from 'api/hotels.js';

import { listPickHotels } from './result-actions';

/* SearchText */

export function setSearchText(searchText) {
    return {
        type: '@SEARCH_TEXT/SET_SEARCH_TEXT',
        searchText
    };
};

/* Hotels */

function startLoading() {
    return {
        type: '@HOTEL/START_LOADING'
    };
}

function endLoading() {
    return {
        type: '@HOTEL/END_LOADING'
    };
}

function endListHotels(hotels) {
    return {
        type: '@HOTEL/END_LIST_HOTELS',
        hotels
    };
}

export function listHotels(searchText, loading = false) {
    return (dispatch, getState) => {
        if (!loading)
            dispatch(startLoading());

        return listHotelsFromApi(getState().userInfo, searchText).then(hotels => {
            dispatch(endListHotels(hotels));
            dispatch(endLoading());
        }).catch(err => {
            console.error('Error listing hotels', err);
            dispatch(endLoading());
        });
    };
};

export function createHotel(name, hotelLink, hotelPrice, hotelDiscript, checkinTs, checkoutTs, wifi, bf, park, gym, pet, pool) {
    return (dispatch, getState) => {
        dispatch(startLoading());

        return createHotelFromApi(getState().userInfo, name, hotelLink, hotelPrice, hotelDiscript, checkinTs, checkoutTs, wifi, bf, park, gym, pet, pool).then(hotel => {
            dispatch(listHotels(getState().searchText, true));
        }).catch(err => {
            console.error('Error creating hotel', err);
            dispatch(endLoading());
        });
    };
};

export function createVote(id) {
    return (dispatch, getState) => {
        dispatch(startLoading());

        return createVoteFromApi(getState().userInfo, id).then(hotel => {
            dispatch(listHotels(getState().searchText, true));
        }).catch(err => {
            console.error('Error creating vote', err);
            dispatch(endLoading());
        });
    };
};

/* HotelForm */

export function inputHotel(name) {
    return {
        type: '@HOTEL_FORM/INPUT_HOTEL',
        name
    };
};

export function inputLink(hotelLink) {
    return {
        type: '@HOTEL_FORM/INPUT_LINL',
        hotelLink
    };
};

export function inputPrice(hotelPrice) {
    return {
        type: '@HOTEL_FORM/INPUT_PRICE',
        hotelPrice
    };
};

export function inputDiscript(hotelDiscript) {
    return {
        type: '@HOTEL_FORM/INPUT_DISCRIPT',
        hotelDiscript
    };
};

export function inputCheckinTime(checkinTs) {
    return {
        type: '@HOTEL_FORM/INPUT_CHECKIN_TIME',
        checkinTs
    };
};

export function inputCheckoutTime(checkoutTs) {
    return {
        type: '@HOTEL_FORM/INPUT_CHECKOUT_TIME',
        checkoutTs
    };
};

export function checkWifi(haveWifi) {
    return {
        type: '@HOTEL_FORM/CHECK_WIFI',
        haveWifi
    };
};

export function checkBf(haveBf) {
    return {
        type: '@HOTEL_FORM/CHECK_BF',
        haveBf
    };
};

export function checkPark(havePark) {
    return {
        type: '@HOTEL_FORM/CHECK_PARK',
        havePark
    }
}

export function checkGym(haveGym) {
    return {
        type: '@HOTEL_FORM/CHECK_GYM',
        haveGym
    }
}

export function checkPet(havePet) {
    return {
        type: '@HOTEL_FORM/CHECK_PET',
        havePet
    }
}
export function checkPool(havePool) {
    return {
        type: '@HOTEL_FORM/CHECK_POOL',
        havePool
    }
}
export function inputDanger(danger) {
    return {
        type: '@HOTEL_FORM/INPUT_DANGER',
        danger
    };
};

/* HotelItem */

export function pick(id) {
    return (dispatch, getState) => {
        dispatch(startLoading());

        return pickFromApi(id).then(hotel => {
            dispatch(listHotels(getState().searchText, true));
            dispatch(listPickHotels(getState().searchText, true));
        }).catch(err => {
            console.error('Error picking', err);
            dispatch(endLoading());
        });
    };
};

export function deleteHotel(id) {
    return (dispatch, getState) => {
        dispatch(startLoading());

        return deleteHotelFromApi(id).then(hotel => {
            dispatch(listHotels(getState().searchText, true));
            dispatch(listPickHotels(getState().searchText, true));
        }).catch(err => {
            console.error('Error deleting', err);
            dispatch(endLoading());
        });
    };
}