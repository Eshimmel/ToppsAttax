const express = require('express');
const fs = require('fs');
var sqlite3 = require('sqlite3');

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
  else if (year = 5) return "Graduated";
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

function newYear(teamList) {
  for (var x in teamList) {
    for (var y in teamList[x]) {
      var classInt = parseInt(teamList[x][y].class) + 1;
      console.log(teamList[x][y]);
      if (classInt > 5) {
        var index = teamList[x].indexOf(teamList[x][y])
        console.log(index);
        teamList[x].splice(index, 1)
      } else if (classInt <= 5) {
        teamList[x][y].class = JSON.stringify(classInt)
        console.log(teamList[x][y]);
      }
    }
  }
  return teamList
}


app.get('/', function(req, res) {
  res.render('home', {

  })
})

app.post('/', function(req, res) {
  var playerName = req.body.playerName
  var playerClass = req.body.playerClass
  var playerTeam = req.body.playerTeam
  var rawTeam = fs.readFileSync('./static/team.json')
  var teamList = JSON.parse(rawTeam)
  player = new Player(playerName, playerClass)
  teamList = teamSelector(player, playerTeam, teamList)
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
  // console.log(teamList);
  res.render('teamList', {
    teams: teamList
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

app.get('/newyear', (req, res) => {
  var rawTeam = fs.readFileSync('./static/team.json')
  var teamList = JSON.parse(rawTeam)
  teamList = newYear(teamList);
  teamList = JSON.stringify(teamList)
  fs.writeFile('./static/team.json', teamList, 'utf8', function() {
    console.log('Wrote ' + teamList + ' to file');
  })
  res.redirect('/teams')
});

app.listen(4000)
