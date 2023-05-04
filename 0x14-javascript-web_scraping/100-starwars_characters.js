#!/usr/bin/node

//script that prints all characters of a Star Wars movie:
// The first argument is the Movie ID - example: 3 = “Return of the Jedi”
// Display one character name by line
// You must use the Star wars API
// You must use the module request
// 1st argument: The Movie ID - is passed as argument in the script command line
// You must use the module request
function getCharacter (url) {
  return new Promise(function (resolve, reject) {
    request(url, function (err, res, body) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(body).name);
      }
    });
  });
}

request('http://swapi.co/api/films/' + process.argv[2], function (err, res, body){
  if (err) {
    console.log(err);
  } else {
    let characters = JSON.parse(body).characters;
    let promises = [];
    for (let i = 0; i < characters.length; i++) {
      promises.push(getCharacter(characters[i]));
    }
    Promise.all(promises).then(function (names) {
      for (let i = 0; i < names.length; i++) {
        console.log(names[i]);
      }
    });
  }
)