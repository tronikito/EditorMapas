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

// simple route
app.get("/", (req, res) => {
    callFiles();
    //res.json();
});
        
function callFiles() {
    const testFolder = '../EditorMapas/src/assets';
    const fs = require('fs');
    //var textFiles = "";
    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
            if (file.charAt(0) != ".") console.log(file);
        });
    });
    //return textFiles;
}

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});