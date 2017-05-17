const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');

function list(group = '', user = '', searchText = '') {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync('data-trans.json')) {
            fs.writeFileSync('data-trans.json', '');
        }

        fs.readFile('data-trans.json', 'utf8', (err, data) => {
            if (err) reject(err);

            let trans = data ? JSON.parse(data) : [];
            if (trans.length > 0 && group && user) {
                trans = trans.filter(t => {
                    return t.group === group;
                });
            }
            if (trans.length > 0 && searchText) {
                trans = trans.filter(t => {
                    return t.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
                });
            }
            resolve(trans);
        });
    });
}

function create(userInfo, name, transType, transDepart, transArrive, departDate, arriveDate, departTime, arriveTime, transLink, transPrice, transDiscript) {
    return new Promise((resolve, reject) => {
        const newTrans = {
            id: uuid(),
            group: userInfo.inputGroup,
            user: userInfo.inputUser,
            name: name,
            transType: transType,
            transDepart: transDepart,
            transArrive: transArrive,
            departDate: departDate,
            arriveDate: arriveDate,
            departTime: departTime,
            arriveTime: arriveTime,
            transLink: transLink,
            transPrice: transPrice,
            transDiscript: transDiscript,
            votes: 0,
            votedPeople: [],
            pick: false
        };

        list().then(trans => {
            trans = [
                newTrans,
                ...trans
            ];
            fs.writeFile('data-trans.json', JSON.stringify(trans), err => {
                if (err) reject(err);

                resolve(newTrans);
            });
        });
    });
}

function vote(userInfo, transId) {
    return new Promise((resolve, reject) => {
        let votedTrans = null;
        list().then(trans => {
            trans = trans.map(t => {
                if (t.id === transId) {
                    let index = t.votedPeople.indexOf(userInfo.inputUser);
                    if (index === -1) {
                        t.votedPeople.push(userInfo.inputUser);
                        votedTrans = t;
                        t['votes']++;
                    } else {
                        t.votedPeople.splice(index, 1);
                        votedTrans = t;
                        t['votes']--;
                    }
                }
                return t;
            });

            fs.writeFile('data-trans.json', JSON.stringify(trans), err => {
                if (err) reject(err);

                resolve(votedTrans);
            });
        });
    });
}

function pick(transId) {
    return new Promise((resolve, reject) => {
        let pickedTrans = null;
        list().then(trans => {
            trans = trans.map(t => {
                if (t.id === transId) {
                    t.pick = !t.pick;
                    pickedTrans = t;
                }
                return t;
            });

            fs.writeFile('data-trans.json', JSON.stringify(trans), err => {
                if (err) reject(err);

                resolve(pickedTrans);
            });
        });
    });
}

function listPickTrans(group = '', user = '', searchText = '') {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync('data-trans.json')) {
            fs.writeFileSync('data-trans.json', '');
        }

        fs.readFile('data-trans.json', 'utf8', (err, data) => {
            if (err) reject(err);

            let trans = data ? JSON.parse(data) : [];
            if (trans.length > 0 && group && user) {
                trans = trans.filter(t => {
                    return t.group === group && t.pick === true;
                });
            }
            if (trans.length > 0 && searchText) {
                trans = trans.filter(t => {
                    return t.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
                });
            }
            resolve(trans);
        });
    });
}

function deleteTrans(transId) {
    return new Promise((resolve, reject) => {
        let deletedTrans = null;
        list().then(trans => {
            trans = trans.filter(t => {
                return t.id !== transId;
            });

            fs.writeFile('data-trans.json', JSON.stringify(trans), err => {
                if (err) reject(err);

                resolve(trans);
            });
        });
    });
}

module.exports = {
    list,
    create,
    vote,
    pick,
    listPickTrans,
    deleteTrans
};