var express = require('express');
var router = express.Router();

var controller = require('../controllers/draftController');

router.post('/create', controller.createDraft);

router.post('/:draftId/join', controller.joinDraft);

router.post('/:draftId/start', controller.startDraft);

module.exports = router;
