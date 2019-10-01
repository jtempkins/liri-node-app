require("dotenv").config();
var keys = require("./keys.js");
var request = require('request');
// var spotify = new Spotify(keys.spotify)
var Spotify = require('node-spotify-api');
var fs = require("fs");
var axios = require("axios");




var command = process.argv[2];
console.log(command);

var artistSongMovie = process.argv.slice(3).join(" ") ;

switch (command) {
  case "spotify-this-song":
    mySpotify();
    break;

  case "movie-this":
    myMovie();
    break;

  case "concert-this":
    myConcert();
    break;

  case "do-what-it-says":
    doFromInput();
    break;

  default:
    console.log("Invalid Command");

};

function mySpotify() {

  var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });

  var searchTerm = artistSongMovie || "The Sign";

  spotify.search({ type: 'track', query: searchTerm }, function (err, data) {
    if (err) {
      console.log('Error occurred: ', err);
    }

    console.log(data.tracks.items[0].artists[0].name)
    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[3].preview_url);
    console.log(data.tracks.items[0].album.name);
    




    // console.log(data.tracks.items)
  });


};

function myMovie() {

  var searchTerm = artistSongMovie || "Mr. Nobody";

  axios.get('http://www.omdbapi.com/?t=' + searchTerm + '&apikey=6e8b6a0').then
  (function(response) {
    console.log(response.data.Title);
    console.log(response.data.Year);
    console.log(response.data.imdbRating);
    console.log(response.data.Ratings[1]);
    console.log(response.data.Country);
    console.log(response.data.Language);
    console.log(response.data.Plot);
    console.log(response.data.Actors);
  })};

  function myConcert() {

    var searchTerm = artistSongMovie;
  
    axios.get('http://rest.bandsintown.com/artists/' + searchTerm + '/events?app_id=codingbootcamp').then
    (function(response) {
    console.log(response.venue.name);
    console.log(response.venue.city);
    console.log(moment(response.datetime).format("MM/DD/YYYY"));
   })}
  





// var queryBands = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  // console.log(queryBands);


// axios.get(queryBands).then (function(response) {
//     console.log(response.data);

    // .catch(function(error) {
      // if (error.response) {

  // request(queryBands, function (error, response, body) {
    // if (error) console.log(error);
    //   };
    // else { 
    // var result  =  JSON.parse(body)[0];
    // console.log(response);
    // console.log("Venue name " + response.venue.name);
    // console.log("Venue location " + response.venue.city);
    // console.log("Date of Event " +  moment(response.datetime).format("MM/DD/YYYY"));

  // artist.getvenue(function( artist ){
  //   for(var i = 0; i < artist.length; i++){
  //     console.log( artist[i].venue.city + ", " + artist[i].venue.region );
  //   }
  // },function( errors ){
  //   console.log(errors);
  // });