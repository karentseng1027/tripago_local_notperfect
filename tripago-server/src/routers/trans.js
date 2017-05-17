const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const transModel = require('../model/trans.js');

const router = express.Router();

router.use(bodyParser.json());
router.use(accessController);

// List
router.get('/trans', function(req, res, next) {
    transModel.list(req.query.group, req.query.user, req.query.searchText).then(trans => {
        res.json(trans);
    }).catch(next);
});

// Create
router.post('/trans', function(req, res, next) {
    const { userInfo, name, transType, transDepart, transArrive, departDate, arriveDate, departTime, arriveTime, transLink, transPrice, transDiscript } = req.body;
    if (!userInfo || !name || !transType || !transDepart || !transArrive || !departDate || !arriveDate || !departTime || !arriveTime || !transLink || !transPrice || !transDiscript) {
        const err = new Error('input are not complete');
        err.status = 400;
        throw err;
    }
    transModel.create(userInfo, name, transType, transDepart, transArrive, departDate, arriveDate, departTime, arriveTime, transLink, transPrice, transDiscript).then(trans => {
        res.json(trans);
    }).catch(next);
});

// Vote
router.post('/trans/:id', function(req, res, next) {
    const { id } = req.params;
    const { userInfo } = req.body;
    if (!id) {
        const err = new Error('Trans ID are required');
        err.status = 400;
        throw err;
    }
    transModel.vote(userInfo, id).then(trans => {
        res.json(trans);
    }).catch(next);
});

// Pick
router.post('/trans-pick/:id', function(req, res, next) {
    const { id } = req.params;
    if (!id) {
        const err = new Error('Trans ID are required');
        err.status = 400;
        throw err;
    }
    transModel.pick(id).then(trans => {
        res.json(trans);
    }).catch(next);
});

// List Picked Trans
router.get('/pickedtrans', function(req, res, next) {
    transModel.listPickTrans(req.query.group, req.query.user, req.query.searchText).then(trans => {
        res.json(trans);
    }).catch(next);
});

// Delete Trans
router.post('/trans-delete/:id', function(req, res, next) {
    const { id } = req.params;
    if (!id) {
        const err = new Error('Trans ID are required');
        err.status = 400;
        throw err;
    }
    transModel.deleteTrans(id).then(trans => {
        res.json(trans);
    }).catch(next);
});

module.exports = router;