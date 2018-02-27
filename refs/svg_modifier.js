var fs = require("fs");
var path = require("path");

const cardMaker = filename => {
  fs.readFile(path.join(__dirname, filename), "utf8", function(err, data) {
    if (err) {
      // check and handle err

      console.log("oogly boogly");
    }
    console.log(data);
    const modifiedData = data.replace(``, "");
    fs.writeFile(path.join(__dirname, filename), modifiedData, function(err) {
      console.log("oogly BOOOGLY");
    });
  });
};

// cardMaker("QH.svg");

fs.readdir(__dirname, (e, d) => {
  d.forEach(f => cardMaker(f));
});

// var fs = require("fs");

// fs.readFile(path.join(__dirname, "QH.svg"), "utf8", function(err, data) {
//   if (err) throw err;
//   console.log(data);
// });
