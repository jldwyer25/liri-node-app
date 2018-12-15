//imports environmental files
require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
//imports spotify api keys
var keys = require("./keys.js");
//imports spotify node package
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var search =  process.argv.slice(3).join(" "); 

// Then run a request with axios to the OMDB API with the movie specified
function movieThis(){
axios.get(`http://www.omdbapi.com/?t=${search}&y=&plot=short&apikey=trilogy`).then(
  function(response) {
      
      if (process.argv[2] === "movie-this"){
    console.log("The movie is: " + response.data.Title);
    console.log("The movie was released in: " + response.data.Year);
    console.log("The movie was rated: " + response.data.Rated);
    console.log("The movie's Rotten Tomatoes rating is: " + response.data.Ratings[1].Value);
    console.log("The movie's Imdb rating is: " + response.data.imdbRating);
    console.log("The movie was released in this language: " + response.data.Language);
    console.log("The movie is about: " + response.data.Plot);
    console.log("The movie stars: " + response.data.Actors);
    console.log("-------------------------------------------------------------------------------");
      }
  }
)
};

//Then run a request with axios with the Bands in town API
function concertThis(){
axios.get(`https://rest.bandsintown.com/artists/${search}/events?app_id=codingbootcamp&date=upcoming`).then(
  function(response) {
      if (process.argv[2]==="concert-this"){
          for (var i=0; i < response.data.length; i++){
          console.log("The venue is called: " + response.data[i].venue.name);
          console.log("The venue is in: " + response.data[i].venue.city);
          console.log("The concer is on: " + moment(response.data[i].datetime).format('MM/DD/YYYY'));
          console.log("------------------------------------------------------");
        }
      }   
    })
  };

//makes a call from the spotify API
function spotifyThis(){
  spotify.search({ type: 'track', query: search }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log("Artist name: " + data.tracks.items[0].artists[0].name);
    console.log("The song's name: " + data.tracks.items[0].name);
    console.log("Preview link of the song " + data.tracks.items[0].preview_url);
    console.log("Album: " + data.tracks.items[0].album.name);
  });
}

function doWhatItSays(){
  fs.readFile("random.txt","utf8", function (err, data){
    if(err){
      return console.log(err);
    }
    console.log(data);
    let dataArr = data.split(",");
    console.log(dataArr[1]);
    function spotifyThis(){
      spotify.search({ type: 'track', query: dataArr[1] }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("Artist name: " + data.tracks.items[0].artists[0].name);
        console.log("The song's name: " + data.tracks.items[0].name);
        console.log("Preview link of the song " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
      });
    }
    spotifyThis();
  })
}


switch(command)
{
  case "concert-this":
  concertThis();
  break;
  case "movie-this":
  if (search.trim().length === 0){
    search = "mr+nobody";
    movieThis();
  } else {
    movieThis();
  };
  break;
  case "spotify-this-song":
  if (search.trim().length===0){
    search = "The Ace of Base";
    spotifyThis();
  } else {
    spotifyThis();
  }
  break;
  case "do-what-it-says":
  doWhatItSays();
  break;
}