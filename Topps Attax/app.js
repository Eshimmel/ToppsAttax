const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.urlencoded({
  extended: false
}));

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

class Player {
  constructor(name, years) {
    this.name = name
    this.class = years
  }
}

function classSelector(year) {
  if (year = 1) return "Freshman";
  else if (year = 2) return "Sophomore";
  else if (year = 3) return "Junior";
  else if (year = 4) return "Senior";
  else return "Pick a number 1 through 4";
}

function teamSelector(player, team, teamList) {
  console.log(team);
  if (team == 'E1') {
    teamList.E1.push(player)
    return teamList
  } else if (team == 'E2') {
    teamList.E2.push(player)
    return teamList
  } else if (team == 'E3') {
    teamList.E3.push(player)
    return teamList
  } else if (team == 'E4') {
    teamList.E4.push(player)
    return teamList
  } else if (team == 'E5') {
    teamList.E5.push(player)
    return teamList
  } else if (team == 'E6') {
    teamList.E6.push(player)
    return teamList
  } else {
    return teamList
  }
}

function removePlayer(teamList, playerName, playerTeam) {
  for (var player of teamList[playerTeam]) {
    console.log(player);
    for (var x in teamList[playerTeam]) {
      console.log(x);
      if (playerName == player.name) {
        var index = teamList[playerTeam].indexOf(player)
        console.log(index);
        console.log(teamList[playerTeam][x]);
        teamList[playerTeam].splice(index, 1)
        return teamList
      }
    }
  }
}


app.get('/', function(req, res) {
  res.render('home', {

  })
})

app.post('/', function(req, res) {
  var playerName = req.body.playerName
  var playerClass = req.body.playerClass
  var playerTeam = req.body.playerTeam
  /*const adjective = req.body.adjective
  var feedBack = {
    name: user,
    comment: adjective
   var rawcomments = fs.readFileSync('./static/feedback.json');
  feed = JSON.parse(rawcomments);
  console.log(feed);
  comments = feed.comments
  comments.push(feedBack);
  var feed = {
    comments: comments
  }
  var feed = JSON.stringify(feed);

  fs.writeFile('./static/feedback.json', feed, 'utf8', function() {
    console.log('Wrote to file');
    console.log(feed)
  });
  */
  var rawTeam = fs.readFileSync('./static/team.json')
  var teamList = JSON.parse(rawTeam)
  console.log(teamList);
  player = new Player(playerName, playerClass)
  console.log(player);
  teamList = teamSelector(player, playerTeam, teamList)
  console.log(teamList);
  teamList = JSON.stringify(teamList)
  fs.writeFile('./static/team.json', teamList, 'utf8', function() {
    console.log('Wrote ' + teamList + ' to file');
  })

  res.render('homepost', {
    playerName: playerName,
    playerClass: classSelector(playerClass)
  })
})

app.get('/teams', function(req, res) {
  var rawTeam = fs.readFileSync('./static/team.json')
  var teamList = JSON.parse(rawTeam)
  console.log(teamList);
  res.render('teamList', {
    teams: JSON.stringify(teamList)
  })
})

app.get('/removeplayer', (req, res) => {
  res.render('removeplayer', {

  })
});

app.post('/removeplayer', (req, res) => {
  var playerName = req.body.playerName
  var playerTeam = req.body.playerTeam

  var rawTeam = fs.readFileSync('./static/team.json')
  var teamList = JSON.parse(rawTeam)
  teamList = removePlayer(teamList, playerName, playerTeam)
  teamList = JSON.stringify(teamList)
  fs.writeFile('./static/team.json', teamList, 'utf8', function() {
    console.log('Wrote ' + teamList + ' to file');
  })

  res.render('playerremoved', {
    playerName: playerName
  })
});

app.listen(4000)
