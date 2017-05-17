import axios from 'axios';

// Develop server URL
const postBaseUrl = 'http://localhost:3000/api';

// Production server URL
//const postBaseUrl = 'http://tripago.us-west-2.elasticbeanstalk.com/api';

export function listPickTrans(userInfo, searchText = '') {
    let url = `${postBaseUrl}/pickedtrans`;
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

export function listPickHotels(userInfo, searchText = '') {
    let url = `${postBaseUrl}/pickedhotels`;
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

export function listPickSites(userInfo, searchText = '') {
    let url = `${postBaseUrl}/pickedsites`;
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