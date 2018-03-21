var State = require('../state/state');
var Card = require('../state/card');

exports.createDraft = function(req, res) {
  var cubeJSON = req.body.cube;
  var cube = parseCubeJSON(cubeJSON);
  var draftID = global.state.newDraft(cube);
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

exports.startDraft = function (req, res) {
  var id = req.params.draftId;
  res.send('Started draft ' + id);
};