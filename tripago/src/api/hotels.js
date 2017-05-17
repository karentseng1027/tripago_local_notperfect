import axios from 'axios';

// Develop server URL
const postBaseUrl = 'http://localhost:3000/api';

// Production server URL
//const postBaseUrl = 'http://tripago.us-west-2.elasticbeanstalk.com/api';

export function listHotels(userInfo, searchText = '') {
    let url = `${postBaseUrl}/hotels`;
    url += `?group=${userInfo.inputGroup}&user=${userInfo.inputUser}`;
    if (searchText)
        url += `&searchText=${searchText}`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function createHotel(userInfo, name, hotelLink, hotelPrice, hotelDiscript, checkinTs, checkoutTs, wifi, bf, park, gym, pet, pool) {
    let url = `${postBaseUrl}/hotels`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
        userInfo,
        name,
        hotelLink,
        hotelPrice,
        hotelDiscript,
        checkinTs,
        checkoutTs,
        wifi,
        bf,
        park,
        gym,
        pet,
        pool
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function createVote(userInfo, id) {
    let url = `${postBaseUrl}/hotels/${id}`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, { userInfo }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function pick(id) {
    let url = `${postBaseUrl}/hotels-pick/${id}`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function deleteHotel(id) {
    let url = `${postBaseUrl}/hotels-delete/${id}`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}