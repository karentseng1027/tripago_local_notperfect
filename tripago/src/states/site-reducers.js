/* Sites */

const initSiteState = {
    siteLoading: false,
    sites: []
};

export function site(state = initSiteState, action) {
    switch (action.type) {
        case '@SITE/START_LOADING':
            return {
                ...state,
                siteLoading: true
            };
        case '@SITE/END_LOADING':
            return {
                ...state,
                siteLoading: false
            };
        case '@SITE/END_LIST_SITES':
            return {
                ...state,
                sites: action.sites
            };
        default:
            return state;
    }
}

/* SiteForm */

const initSiteFormState = {
    name: '',
    siteType: 'na',
    typeToggle: false,
    mon: false,
    tue: false,
    wed: false,
    thur: false,
    fri: false,
    sat: false,
    sun: false,
    openTime: '',
    closeTime: '',
    siteLink: '',
    sitePrice: '',
    siteDiscript: '',
    inputDanger: false
};

export function siteForm(state = initSiteFormState, action) {
    switch (action.type) {
        case '@SITE_FORM/INPUT_SITE':
            return {
                ...state,
                name: action.name
            };
        case '@SITE_FORM/TOGGLE_TYPE':
            return {
                ...state,
                typeToggle: action.toggle
            };
        case '@SITE_FORM/SELECT_TYPE':
            return {
                ...state,
                siteType: action.site_type
            };
        case '@SITE_FORM/DAYS_OPEN_1':
            return {
                ...state,
                mon: action.open
            };
        case '@SITE_FORM/DAYS_OPEN_2':
            return {
                ...state,
                tue: action.open
            };
        case '@SITE_FORM/DAYS_OPEN_3':
            return {
                ...state,
                wed: action.open
            };
        case '@SITE_FORM/DAYS_OPEN_4':
            return {
                ...state,
                thur: action.open
            };
        case '@SITE_FORM/DAYS_OPEN_5':
            return {
                ...state,
                fri: action.open
            };
        case '@SITE_FORM/DAYS_OPEN_6':
            return {
                ...state,
                sat: action.open
            };
        case '@SITE_FORM/DAYS_OPEN_7':
            return {
                ...state,
                sun: action.open
            };
        case '@SITE_FORM/INPUT_OPEN_TIME':
            return {
                ...state,
                openTime: action.time
            };
        case '@SITE_FORM/INPUT_CLOSE_TIME':
            return {
                ...state,
                closeTime: action.time
            };
        case '@SITE_FORM/INPUT_LINK':
            return {
                ...state,
                siteLink: action.link
            };
        case '@SITE_FORM/INPUT_PRICE':
            return {
                ...state,
                sitePrice: action.price
            };
        case '@SITE_FORM/INPUT_DISCRIPT':
            return {
                ...state,
                siteDiscript: action.discript
            };
        case '@SITE_FORM/INPUT_DANGER':
            return {
                ...state,
                inputDanger: action.danger
            };
        default:
            return state;
    }
}