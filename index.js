//this works!!!!
//gets data from server
// run using  127.0.0.1:8080  http://localhost:8080/index.html

function fetchJSON(url) {
  return fetch(url).then(function(response) {
    var contentType = response.headers.get("content-type");
    if(contentType && contentType.indexOf("application/json") !== -1) {
      return response.json();
    } else {
      console.log("Oops, we haven't got JSON!");
    }
  });
}

//calculates hash, calculates url, and then gets the json from the url
function marvelFactory(config) {
  return function(path) {
    var timestamp = new Date().getTime();
    var hash = CryptoJS.MD5(timestamp + config.privateKey + config.publicKey).toString();
    var url = config.hostname + '/v' + config.version + '/public' + path + '?limit=100&apikey=' + config.publicKey + '&ts=' + timestamp + '&hash=' + hash;
    console.log(url);

    return fetchJSON(url);
  }
}

// Get an instance of the marvel api
var marvel = marvelFactory({
  hostname: 'http://gateway.marvel.com',
  publicKey: '11baddac3441be34e5ab00c3395622ae',
  privateKey: 'c0409eaf5b34286b2722603cd90db4cb71cf200c',
  version: '1'
});


var characterName = prompt("Input character name");

marvel('/characters').then(function(json) {  //returns a promise, needs .then
//  json.data.results.map(function(character){
  var singleCharacterArray = json.data.results.filter(function(character){
    var name = character.name;

      if (name.toLowerCase().indexOf(characterName.toLowerCase()) > -1) {
        var id = character.id;
        return character;
      }
  });
  console.log(singleCharacterArray[0].thumbnail.path);  //http address
  console.log(singleCharacterArray[0].thumbnail.extension);  //jpg

//  firstone + "." + extension
});


// DESIRED STRUCTURE:
//
//  <top-banner>
//  </top-banner>
//
//   <character-frame>
//
//     <character-name>
//            character.name
//      </character-name>
//
//     <character-picture>
//     <img src="thumbnail.jpg" />
//      </character-picture>
//
//   <character-description>
//      character.description
//    </character-description>
//
//   </character-frame>



// START HERE WITH BUILDING THE STRUCTURE






// marvel('/characters').then(function(json) {
//   json.data.results.map(function(character){
//     var characterContainer = document.createElement('character') //<character>
//     var imgPath = character.thumbnail.path + '.' + character.thumbnail.extension;
//     var img = document.createElement('img'); // Create an element node
//     img.setAttribute('src', imgPath); // Set some properties on the node
//     document.querySelector('body').appendChild(img);
//
//
//     var name = character.name
//     var text = document.createTextNode('character');
//     var nameTag = document.createElement("character-name");  //<p> <span> <character-name>
// // how do I put name inside nameTag
//     var nameTextNode = document.createTextNode(name);
//
//     nameTag.appendChild(nameTextNode); // <character-name>
//     var body = document.querySelector("body");
//
//     //add the character tag to the overall list of characters
//    var container = document.querySelector('characters');
//
//     //container.appendChild(characterContainer);
//     //add different properties for a single character
//
//     characterContainer.appendChild(nameTag);
//     characterContainer.appendChild(img);
//
//     if (imgPath !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"){
//       container.appendChild(characterContainer);
//     }
//
//   });
// });
