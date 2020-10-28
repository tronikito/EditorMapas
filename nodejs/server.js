const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


var blocks = [];
var weapons = [];
var enemys = [];

function callFiles() {
  callForBlocks();
  callForWeapons();
  callForEnemys();
}

function callForWeapons() {

  //server assets filesystem    

  const fs = require('fs');
  const folder = '../src/assets/weapon';

  fs.readdir(folder, (err, folder) => {
    folder.forEach(weapon => {
        if (!(weapon.charAt(0) == ".")) {
            weapons.push(weapon);
        }
      });
  });

  setTimeout(() => {
    weapons.forEach(file => {
      console.log(file);
    })}, 1000);
}

function callForEnemys() {

  //server assets filesystem    

  const fs = require('fs');
  const folder = '../src/assets/enemy';

  fs.readdir(folder, (err, folder) => {
    folder.forEach(enemy => {
        if (!(enemy.charAt(0) == ".")) {
            enemys.push(enemy);
        }
      });
  });

  setTimeout(() => {
    enemys.forEach(file => {
      console.log(file);
    })}, 1000);
}

function callForBlocks() {

  //server assets filesystem    

  const fs = require('fs');
  const folders = '../src/assets';

  fs.readdir(folders, (err, dirs) => {
    dirs.forEach(dir => {

      if (!(dir.charAt(0) == "." ||
        dir.localeCompare("buttom") == 0 ||
        dir.localeCompare("enemy") == 0 ||
        dir.localeCompare("weapon")== 0 ||
        dir.localeCompare("empty.png") == 0)) {

        var filesDir = '../src/assets/' + dir + "/";
        fs.readdir(filesDir, (err, file) => {
          file.forEach(file => {
            blocks.push(file);
          });
        });

      }
    });
  });

  setTimeout(() => {
    blocks.forEach(file => {
      console.log(file);
    })}, 1000);
}

// simple route
app.get('/blocks', function (req, res) {
  res.send(blocks);
  console.log("call for blocks");
});
app.get('/weapons', function (req, res) {
  res.send(weapons);
  console.log("call for weapons");
});
app.get('/enemys', function (req, res) {
  res.send(enemys);
  console.log("call for enemys");
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);

  callFiles();
});