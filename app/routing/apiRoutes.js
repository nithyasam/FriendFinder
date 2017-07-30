let friendsData = require("../data/friends.js");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  app.post("/api/addSurvey", function(req, res) {
      let newFriend = req.body;
      let newFriendScores = JSON.parse(newFriend.scores);
      newFriend.scores = newFriendScores;
      let arr_pos = findMatch(newFriendScores);
      friendsData.push(req.body);
      res.json(friendsData[arr_pos]);
  });

  function findMatch(scores){
  	let resultArr = [];

    friendsData.forEach((eachFriend) => {
      resultArr.push(eachFriend.scores.reduce((sum, value, index) => {
        return sum + Math.abs(scores[index] - value);
      },0));
    });
    
    let min = Math.min(...resultArr);
    let pos = resultArr.indexOf(min);
    return pos;
  }
};