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
      for(let i=0;i<friendsData.length;i++){
      	let currFriend = friendsData[i];
      	let tempVal = 0;
      	for(j=0;j<10;j++){
      		tempVal= tempVal + Math.abs(scores[j] - currFriend.scores[j]);
      	}
      	resultArr.push(tempVal);
      }
      let min = Math.min(...resultArr);
      let pos = resultArr.indexOf(min);
      return pos;
  }
};