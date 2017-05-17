import axios from 'axios';

// Develop server URL
const postBaseUrl = 'http://localhost:3000/api';

// Production server URL
//const postBaseUrl = 'http://tripago.us-west-2.elasticbeanstalk.com/api';

export function listTrans(userInfo, searchText = '') {
    let url = `${postBaseUrl}/trans`;
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

export function createTrans(userInfo, name, transType, transDepart, transArrive, departDate, arriveDate, departTime, arriveTime, transLink, transPrice, transDiscript) {
    let url = `${postBaseUrl}/trans`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
        userInfo,
        name,
        transType,
        transDepart,
        transArrive,
        departDate,
        arriveDate,
        departTime,
        arriveTime,
        transLink,
        transPrice,
        transDiscript
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function createVote(userInfo, id) {
    let url = `${postBaseUrl}/trans/${id}`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, { userInfo }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function pick(id) {
    let url = `${postBaseUrl}/trans-pick/${id}`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function deleteTrans(id) {
    let url = `${postBaseUrl}/trans-delete/${id}`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}