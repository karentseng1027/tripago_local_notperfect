const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');

function list(group = '', user = '', searchText = '') {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync('data-hotels.json')) {
            fs.writeFileSync('data-hotels.json', '');
        }

        fs.readFile('data-hotels.json', 'utf8', (err, data) => {
            if (err) reject(err);

            let hotels = data ? JSON.parse(data) : [];
            if (hotels.length > 0 && group && user) {
                hotels = hotels.filter(h => {
                    return h.group === group;
                });
            }
            if (hotels.length > 0 && searchText) {
                hotels = hotels.filter(h => {
                    return h.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
                });
            }
            resolve(hotels);
        });
    });
}

function create(userInfo, name, hotelLink, hotelPrice, hotelDiscript, checkinTs, checkoutTs, wifi, bf, park, gym, pet, pool) {
    const checkinTime = Date.parse(new Date(checkinTs));
    const checkoutTime = Date.parse(new Date(checkoutTs));
    const totalPrice = ((checkoutTime / 1000) - (checkinTime / 1000)) / 86400 * hotelPrice;
    return new Promise((resolve, reject) => {
        const newHotel = {
            id: uuid(),
            group: userInfo.inputGroup,
            user: userInfo.inputUser,
            name: name,
            hotelLink: hotelLink,
            hotelPrice: hotelPrice,
            hotelDiscript: hotelDiscript,
            checkinTs: checkinTs,
            checkoutTs: checkoutTs,
            wifi: wifi,
            bf: bf,
            park: park,
            gym: gym,
            pet: pet,
            pool: pool,
            totalPrice: totalPrice,
            votes: 0,
            votedPeople: [],
            pick: false
        };

        list().then(hotels => {
            hotels = [
                newHotel,
                ...hotels
            ];
            fs.writeFile('data-hotels.json', JSON.stringify(hotels), err => {
                if (err) reject(err);

                resolve(newHotel);
            });
        });
    });
}

function vote(userInfo, hotelId) {
    return new Promise((resolve, reject) => {
        let votedHotel = null;
        list().then(hotels => {
            hotels = hotels.map(h => {
                if (h.id === hotelId) {
                    let index = h.votedPeople.indexOf(userInfo.inputUser);
                    if (index === -1) {
                        h.votedPeople.push(userInfo.inputUser);
                        votedHotel = h;
                        h['votes']++;
                    } else {
                        h.votedPeople.splice(index, 1);
                        votedHotel = h;
                        h['votes']--;
                    }
                }
                return h;
            });

            fs.writeFile('data-hotels.json', JSON.stringify(hotels), err => {
                if (err) reject(err);

                resolve(votedHotel);
            });
        });
    });
}

function pick(hotelId) {
    return new Promise((resolve, reject) => {
        let pickedHotel = null;
        list().then(hotels => {
            hotels = hotels.map(h => {
                if (h.id === hotelId) {
                    h.pick = !h.pick;
                    pickedHotel = h;
                }
                return h;
            });

            fs.writeFile('data-hotels.json', JSON.stringify(hotels), err => {
                if (err) reject(err);

                resolve(pickedHotel);
            });
        });
    });
}

function listPickHotel(group = '', user = '', searchText = '') {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync('data-hotels.json')) {
            fs.writeFileSync('data-hotels.json', '');
        }

        fs.readFile('data-hotels.json', 'utf8', (err, data) => {
            if (err) reject(err);

            let hotels = data ? JSON.parse(data) : [];
            if (hotels.length > 0 && group && user) {
                hotels = hotels.filter(h => {
                    return h.group === group && h.pick === true;
                });
            }
            if (hotels.length > 0 && searchText) {
                hotels = hotels.filter(h => {
                    return h.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
                });
            }
            resolve(hotels);
        });
    });
}

function deleteHotel(hotelId) {
    return new Promise((resolve, reject) => {
        let deletedHotel = null;
        list().then(hotels => {
            hotels = hotels.filter(h => {
                return h.id !== hotelId;
            });

            fs.writeFile('data-hotels.json', JSON.stringify(hotels), err => {
                if (err) reject(err);

                resolve(hotels);
            });
        });
    });
}

module.exports = {
    list,
    create,
    vote,
    pick,
    listPickHotel,
    deleteHotel
};