var fs = require("fs");
var derequire = require("derequire");

function derequireFile(filename) {
  fs.writeFileSync(
    filename,
    derequire(
      fs.readFileSync(filename, 'utf8')
    )
  );
}
derequireFile(__dirname + '/../dist/acorn.js');
derequireFile(__dirname + '/../dist/acorn_loose.js');
derequireFile(__dirname + '/../dist/walk.js');