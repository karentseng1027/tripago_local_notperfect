import {
    listSites as listSitesFromApi,
    createSite as createSiteFromApi,
    createVote as createVoteFromApi,
    pick as pickFromApi,
    deleteSite as deleteSiteFromApi
} from 'api/sites.js';

import { listPickSites } from './result-actions';

/* Sites */

function startLoading() {
    return {
        type: '@SITE/START_LOADING'
    };
}

function endLoading() {
    return {
        type: '@SITE/END_LOADING'
    };
}

function endListSites(sites) {
    return {
        type: '@SITE/END_LIST_SITES',
        sites
    };
}

export function listSites(searchText, loading = false) {
    return (dispatch, getState) => {
        if (!loading)
            dispatch(startLoading());

        return listSitesFromApi(getState().userInfo, searchText).then(sites => {
            dispatch(endListSites(sites));
            dispatch(endLoading());
        }).catch(err => {
            console.error('Error listing sites', err);
            dispatch(endLoading());
        });
    };
};

export function createSite(name, siteType, mon, tue, wed, thur, fri, sat, sun, openTime, closeTime, siteLink, sitePrice, siteDiscript) {
    return (dispatch, getState) => {
        dispatch(startLoading());

        return createSiteFromApi(getState().userInfo, name, siteType, mon, tue, wed, thur, fri, sat, sun, openTime, closeTime, siteLink, sitePrice, siteDiscript).then(site => {
            dispatch(listSites(getState().searchText, true));
        }).catch(err => {
            console.error('Error creating site', err);
            dispatch(endLoading());
        });
    };
};

export function createVote(id) {
    return (dispatch, getState) => {
        dispatch(startLoading());

        return createVoteFromApi(getState().userInfo, id).then(site => {
            dispatch(listSites(getState().searchText, true));
        }).catch(err => {
            console.error('Error creating vote', err);
            dispatch(endLoading());
        });
    };
};

/* SiteForm */

export function inputSite(name) {
    return {
        type: '@SITE_FORM/INPUT_SITE',
        name
    };
};

export function toggleType(toggle) {
    return {
        type: '@SITE_FORM/TOGGLE_TYPE',
        toggle
    };
};

export function selectType(site_type) {
    return {
        type: '@SITE_FORM/SELECT_TYPE',
        site_type
    };
};

export function daysOpen1(open) {
    return {
        type: '@SITE_FORM/DAYS_OPEN_1',
        open
    };
};

export function daysOpen2(open) {
    return {
        type: '@SITE_FORM/DAYS_OPEN_2',
        open
    };
};

export function daysOpen3(open) {
    return {
        type: '@SITE_FORM/DAYS_OPEN_3',
        open
    };
};

export function daysOpen4(open) {
    return {
        type: '@SITE_FORM/DAYS_OPEN_4',
        open
    };
};

export function daysOpen5(open) {
    return {
        type: '@SITE_FORM/DAYS_OPEN_5',
        open
    };
};

export function daysOpen6(open) {
    return {
        type: '@SITE_FORM/DAYS_OPEN_6',
        open
    };
};

export function daysOpen7(open) {
    return {
        type: '@SITE_FORM/DAYS_OPEN_7',
        open
    };
};

export function inputOpenTime(time) {
    return {
        type: '@SITE_FORM/INPUT_OPEN_TIME',
        time
    };
};

export function inputCloseTime(time) {
    return {
        type: '@SITE_FORM/INPUT_CLOSE_TIME',
        time
    };
};

export function inputLink(link) {
    return {
        type: '@SITE_FORM/INPUT_LINK',
        link
    };
};

export function inputPrice(price) {
    return {
        type: '@SITE_FORM/INPUT_PRICE',
        price
    };
};

export function inputDiscript(discript) {
    return {
        type: '@SITE_FORM/INPUT_DISCRIPT',
        discript
    };
};

export function inputDanger(danger) {
    return {
        type: '@SITE_FORM/INPUT_DANGER',
        danger
    };
};

/* SiteItem */

export function pick(id) {
    return (dispatch, getState) => {
        dispatch(startLoading());

        return pickFromApi(id).then(site => {
            dispatch(listSites(getState().searchText, true));
            dispatch(listPickSites(getState().searchText, true));
        }).catch(err => {
            console.error('Error picking', err);
            dispatch(endLoading());
        });
    };
};

export function deleteSite(id) {
    return (dispatch, getState) => {
        dispatch(startLoading());

        return deleteSiteFromApi(id).then(site => {
            dispatch(listSites(getState().searchText, true));
            dispatch(listPickSites(getState().searchText, true));
        }).catch(err => {
            console.error('Error deleting', err);
            dispatch(endLoading());
        });
    };
}