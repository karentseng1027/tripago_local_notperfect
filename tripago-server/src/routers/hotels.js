const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const hotelModel = require('../model/hotels.js');

const router = express.Router();

router.use(bodyParser.json());
router.use(accessController);

// List
router.get('/hotels', function(req, res, next) {
    hotelModel.list(req.query.group, req.query.user, req.query.searchText).then(hotels => {
        res.json(hotels);
    }).catch(next);
});

// Create
router.post('/hotels', function(req, res, next) {
    const { userInfo, name, hotelLink, hotelPrice, hotelDiscript, checkinTs, checkoutTs, wifi, bf, park, gym, pet, pool } = req.body;
    if (!userInfo || !name || !hotelLink || !hotelPrice || !hotelDiscript || !checkinTs || !checkoutTs) {
        const err = new Error('input are not complete');
        err.status = 400;
        throw err;
    }
    hotelModel.create(userInfo, name, hotelLink, hotelPrice, hotelDiscript, checkinTs, checkoutTs, wifi, bf, park, gym, pet, pool).then(hotel => {
        res.json(hotel);
    }).catch(next);
});

// Vote
router.post('/hotels/:id', function(req, res, next) {
    const { id } = req.params;
    const { userInfo } = req.body;
    if (!id) {
        const err = new Error('Hotel ID are required');
        err.status = 400;
        throw err;
    }
    hotelModel.vote(userInfo, id).then(hotel => {
        res.json(hotel);
    }).catch(next);
});

// Pick
router.post('/hotels-pick/:id', function(req, res, next) {
    const { id } = req.params;
    if (!id) {
        const err = new Error('Hotel ID are required');
        err.status = 400;
        throw err;
    }
    hotelModel.pick(id).then(hotel => {
        res.json(hotel);
    }).catch(next);
});

// List Picked Hotels
router.get('/pickedhotels', function(req, res, next) {
    hotelModel.listPickHotel(req.query.group, req.query.user, req.query.searchText).then(hotels => {
        res.json(hotels);
    }).catch(next);
});

// Delete Hotel
router.post('/hotels-delete/:id', function(req, res, next) {
    const { id } = req.params;
    if (!id) {
        const err = new Error('Hotel ID are required');
        err.status = 400;
        throw err;
    }
    hotelModel.deleteHotel(id).then(hotels => {
        res.json(hotels);
    }).catch(next);
});

module.exports = router;