const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const siteModel = require('../model/sites.js');

const router = express.Router();

router.use(bodyParser.json());
router.use(accessController);

// List
router.get('/sites', function(req, res, next) {
    siteModel.list(req.query.group, req.query.user, req.query.searchText).then(sites => {
        res.json(sites);
    }).catch(next);
});

// Create
router.post('/sites', function(req, res, next) {
    const { userInfo, name, siteType, mon, tue, wed, thur, fri, sat, sun, openTime, closeTime, siteLink, sitePrice, siteDiscript } = req.body;
    if (!userInfo || !name || !siteType || !openTime || !closeTime || !siteLink || !sitePrice || !siteDiscript) {
        const err = new Error('input are not complete');
        err.status = 400;
        throw err;
    }
    siteModel.create(userInfo, name, siteType, mon, tue, wed, thur, fri, sat, sun, openTime, closeTime, siteLink, sitePrice, siteDiscript).then(site => {
        res.json(site);
    }).catch(next);
});

// Vote
router.post('/sites/:id', function(req, res, next) {
    const { id } = req.params;
    const { userInfo } = req.body;
    if (!id) {
        const err = new Error('Sites ID are required');
        err.status = 400;
        throw err;
    }
    siteModel.vote(userInfo, id).then(site => {
        res.json(site);
    }).catch(next);
});

// Pick
router.post('/sites-pick/:id', function(req, res, next) {
    const { id } = req.params;
    if (!id) {
        const err = new Error('Site ID are required');
        err.status = 400;
        throw err;
    }
    siteModel.pick(id).then(site => {
        res.json(site);
    }).catch(next);
});

// List Picked Sites
router.get('/pickedsites', function(req, res, next) {
    siteModel.listPickSite(req.query.group, req.query.user, req.query.searchText).then(sites => {
        res.json(sites);
    }).catch(next);
});

// Delete Site
router.post('/sites-delete/:id', function(req, res, next) {
    const { id } = req.params;
    if (!id) {
        const err = new Error('Site ID are required');
        err.status = 400;
        throw err;
    }
    siteModel.deleteSite(id).then(sites => {
        res.json(sites);
    }).catch(next);
});

module.exports = router;