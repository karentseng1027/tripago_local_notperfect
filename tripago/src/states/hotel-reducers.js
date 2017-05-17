/* SearchText */

export function searchText(state = '', action) {
    switch (action.type) {
        case '@SEARCH_TEXT/SET_SEARCH_TEXT':
            return action.searchText;
        default:
            return state;
    };
};

/* Hotels */

const initHotelState = {
    hotelLoading: false,
    hotels: []
};

export function hotel(state = initHotelState, action) {
    switch (action.type) {
        case '@HOTEL/START_LOADING':
            return {
                ...state,
                hotelLoading: true
            };
        case '@HOTEL/END_LOADING':
            return {
                ...state,
                hotelLoading: false
            };
        case '@HOTEL/END_LIST_HOTELS':
            return {
                ...state,
                hotels: action.hotels
            };
        default:
            return state;
    }
}

/* HotelForm */

const initHotelFormState = {
    name: '',
    checkinTs: '',
    checkoutTs: '',
    hotelLink: '',
    hotelPrice: '',
    hotelDiscript: '',
    wifi: false,
    bf: false,
    park: false,
    gym: false,
    pet: false,
    pool: false,
    inputDanger: false
}

export function hotelForm(state = initHotelFormState, action) {
    switch (action.type) {
        case '@HOTEL_FORM/INPUT_HOTEL':
            return {
                ...state,
                name: action.name
            };
        case '@HOTEL_FORM/INPUT_LINL':
            return {
                ...state,
                hotelLink: action.hotelLink
            };
        case '@HOTEL_FORM/INPUT_PRICE':
            return {
                ...state,
                hotelPrice: action.hotelPrice
            };
        case '@HOTEL_FORM/INPUT_DISCRIPT':
            return {
                ...state,
                hotelDiscript: action.hotelDiscript
            };
        case '@HOTEL_FORM/INPUT_CHECKIN_TIME':
            return {
                ...state,
                checkinTs: action.checkinTs
            };
        case '@HOTEL_FORM/INPUT_CHECKOUT_TIME':
            return {
                ...state,
                checkoutTs: action.checkoutTs
            };
        case '@HOTEL_FORM/CHECK_WIFI':
            return {
                ...state,
                wifi: action.haveWifi
            };
        case '@HOTEL_FORM/CHECK_BF':
            return {
                ...state,
                bf: action.haveBf
            };
            case '@HOTEL_FORM/CHECK_PARK':
            return {
                ...state,
                park: action.havePark
            }
        case '@HOTEL_FORM/CHECK_GYM':
            return {
                ...state,
                gym: action.haveGym
            }
        case '@HOTEL_FORM/CHECK_PET':
            return {
                ...state,
                pet: action.havePet
            }
        case '@HOTEL_FORM/CHECK_POOL':
            return {
                ...state,
                pool: action.havePool
            }
        case '@HOTEL_FORM/INPUT_DANGER':
            return {
                ...state,
                inputDanger: action.danger
            };
        default:
            return state;
    };
};

/* HotelItem */