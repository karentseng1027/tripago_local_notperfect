import axios from 'axios';

// Develop server URL
const postBaseUrl = 'http://localhost:3000/api';

// Production server URL
//const postBaseUrl = 'http://tripago.us-west-2.elasticbeanstalk.com/api';

export function listSites(userInfo, searchText = '') {
    let url = `${postBaseUrl}/sites`;
    url += `?group=${userInfo.inputGroup}&user=${userInfo.inputUser}`
    if (searchText)
        url += `&searchText=${searchText}`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function createSite(userInfo, name, siteType, mon, tue, wed, thur, fri, sat, sun, openTime, closeTime, siteLink, sitePrice, siteDiscript) {
    let url = `${postBaseUrl}/sites`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
        userInfo,
        name,
        siteType,
        mon,
        tue,
        wed,
        thur,
        fri,
        sat,
        sun,
        openTime,
        closeTime,
        siteLink,
        sitePrice,
        siteDiscript
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function createVote(userInfo, id) {
    let url = `${postBaseUrl}/sites/${id}`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, { userInfo }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function pick(id) {
    let url = `${postBaseUrl}/sites-pick/${id}`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function deleteSite(id) {
    let url = `${postBaseUrl}/sites-delete/${id}`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}