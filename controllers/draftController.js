var State = require('../state/state');
var Card = require('../state/card');

exports.createDraft = function(req, res) {
  var cubeJSON = req.body.cube;
  var cube = parseCubeJSON(cubeJSON);

  var draftType = req.body.draftType;
  var cardsPerPlayer = req.body.cardsPerPlayer;

  var draftID = global.state.newDraft(draftType, cardsPerPlayer, cube);

  res.send(global.state.drafts[draftID]);
};

var parseCubeJSON = function(cubeJSON) {
  var cube = [];
  for (var key in cubeJSON) {
    var card = cubeJSON[key];
    var cardObj = new Card(name = card.name, color = card.color, cost = card.cost, imageUrl = card.imageUrl);
    cube.push(cardObj);
  }
  return cube;
}

exports.joinDraft = function (req, res) {
  var draftId = req.params.draftId;
  global.state.drafts[draftId].drafters++;
  
  res.send({ "ID" : (global.state.drafts[draftId].drafters - 1) });
};

exports.startDraft = function (req, res) {
  var draftId = req.params.draftId;
  global.state.drafts[draftId].start();

  res.send(global.state.drafts[draftId]);
};