var express = require('express');
var router = express.Router();

var controller = require('../controllers/draftController');

router.post('/create', controller.createDraft);

router.post('/:draftId/join', controller.joinDraft);

router.post('/:draftId/start', controller.startDraft);

router.get('/:draftId/piles/:pileId', controller.checkPile);

router.post('/:draftId/piles/:pileId/take', controller.takePile);

router.post('/:draftId/piles/:pileId/skip', controller.skipPile);

router.get('/:draftId/started', controller.checkStarted);

router.get('/:draftId/status', controller.getStatus);

router.get('/:draftId/cube', controller.getCube);

module.exports = router;
