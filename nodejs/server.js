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


var images = [];

function callFiles() {

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
            images.push(file);
          });
        });

      }
    });
  });

  setTimeout(() => {
    images.forEach(file => {
      console.log(file);
    })}, 1000);
}

// simple route
app.get('/images', function (req, res) {
  res.send(images);
  console.log("call for images");
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);

  callFiles();
});