const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');

function list(group = '', user = '', searchText = '') {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync('data-sites.json')) {
            fs.writeFileSync('data-sites.json', '');
        }

        fs.readFile('data-sites.json', 'utf8', (err, data) => {
            if (err) reject(err);

            let sites = data ? JSON.parse(data) : [];
            if (sites.length > 0 && group && user) {
                sites = sites.filter(s => {
                    return s.group === group;
                });
            }
            if (sites.length > 0 && searchText) {
                sites = sites.filter(s => {
                    return s.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
                });
            }
            resolve(sites);
        });
    });
}

function create(userInfo, name, siteType, mon, tue, wed, thur, fri, sat, sun, openTime, closeTime, siteLink, sitePrice, siteDiscript) {
    return new Promise((resolve, reject) => {
        const newSite = {
            id: uuid(),
            group: userInfo.inputGroup,
            user: userInfo.inputUser,
            name: name,
            siteType: siteType,
            mon: mon,
            tue: tue,
            wed: wed,
            thur: thur,
            fri: fri,
            sat: sat,
            sun: sun,
            openTime: openTime,
            closeTime: closeTime,
            siteLink: siteLink,
            sitePrice: sitePrice,
            siteDiscript: siteDiscript,
            votes: 0,
            votedPeople: []
        };

        list().then(sites => {
            sites = [
                newSite,
                ...sites
            ];
            fs.writeFile('data-sites.json', JSON.stringify(sites), err => {
                if (err) reject(err);

                resolve(newSite);
            });
        });
    });
}

function vote(userInfo, siteId) {
    return new Promise((resolve, reject) => {
        let votedSite = null;
        list().then(sites => {
            sites = sites.map(s => {
                if (s.id === siteId) {
                    let index = s.votedPeople.indexOf(userInfo.inputUser);
                    if (index === -1) {
                        s.votedPeople.push(userInfo.inputUser);
                        votedSite = s;
                        s['votes']++;
                    } else {
                        s.votedPeople.splice(index, 1);
                        votedSite = s;
                        s['votes']--;
                    }
                }
                return s;
            });

            fs.writeFile('data-sites.json', JSON.stringify(sites), err => {
                if (err) reject(err);

                resolve(votedSite);
            });
        });
    });
}

function pick(siteId) {
    return new Promise((resolve, reject) => {
        let pickedSite = null;
        list().then(sites => {
            sites = sites.map(s => {
                if (s.id === siteId) {
                    s.pick = !s.pick;
                    pickedSite = s;
                }
                return s;
            });

            fs.writeFile('data-sites.json', JSON.stringify(sites), err => {
                if (err) reject(err);

                resolve(pickedSite);
            });
        });
    });
}

function listPickSite(group = '', user = '', searchText = '') {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync('data-sites.json')) {
            fs.writeFileSync('data-sites.json', '');
        }

        fs.readFile('data-sites.json', 'utf8', (err, data) => {
            if (err) reject(err);

            let sites = data ? JSON.parse(data) : [];
            if (sites.length > 0 && group && user) {
                sites = sites.filter(s => {
                    return s.group === group && s.pick === true;
                });
            }
            if (sites.length > 0 && searchText) {
                sites = sites.filter(s => {
                    return s.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
                });
            }
            resolve(sites);
        });
    });
}

function deleteSite(siteId) {
    return new Promise((resolve, reject) => {
        let deletedSite = null;
        list().then(sites => {
            sites = sites.filter(s => {
                return s.id !== siteId;
            });

            fs.writeFile('data-sites.json', JSON.stringify(sites), err => {
                if (err) reject(err);

                resolve(sites);
            });
        });
    });
}

module.exports = {
    list,
    create,
    vote,
    pick,
    listPickSite,
    deleteSite
};