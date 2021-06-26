$("#searchBtn").on("click", storeInput)
var searchInput = localStorage.getItem("search")
var apiKey = "65e03376af118d009632cee16530207e"
var apiUrlPersonSearch = "https://api.themoviedb.org/3/search/person?api_key="+ apiKey + "&query=" + searchInput

var apiUrlPersonGetDetails;
var apiUrlPersonGetMovieCredits;
var apiUrlPersonGetTwitterID;
var personTwitterID;

var apiUrlgetPersonImage;
var apiUrlgetPersonBio;
var apiUrlgetPersonName;

var scoreArr = [];
var scoreIndex = [];
var movieArr = [];
var movieIDArr = [];
var movieOne = document.getElementById("movieOne");
var movieTwo = document.getElementById("movieTwo");
var movieThree = document.getElementById("movieThree");
var movieFour = document.getElementById("movieFour");
var movieFive = document.getElementById("movieFive");


function getPersonID() {
    fetch(apiUrlPersonSearch)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        personID = data.results[0].id; 
    })
    
}
function getPersonDetails() {
    apiUrlPersonGetDetails = "https://api.themoviedb.org/3/person/" + personID + "?api_key=" + apiKey 
    fetch(apiUrlPersonGetDetails)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        //console.log(data);
        
    })
}
function getPersonMovieCredits() {
    apiUrlPersonGetMovieCredits = "https://api.themoviedb.org/3/person/" + personID+ "/movie_credits?api_key="+ apiKey
    fetch(apiUrlPersonGetMovieCredits)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        //console.log(data);
        
    })
}
function getPersonTwitterID() {
    apiUrlPersonGetTwitterID = "https://api.themoviedb.org/3/person/" + personID + "/external_ids?api_key=" + apiKey 
    fetch(apiUrlPersonGetTwitterID)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        //console.log(data);
        personTwitterID = data.twitter_id;
        
    })
}

function storeInput() {
    searchInput = $("#userInput").val()
    console.log(searchInput);
    localStorage.setItem("search", searchInput)
}

function getPersonImage() {
    apiUrlgetPersonImage = "https://api.themoviedb.org/3/person/" +personID + "/images?api_key=" + apiKey;
    fetch(apiUrlgetPersonImage)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data);
        console.log("https://www.themoviedb.org/t/p/original" + data.profiles[0].file_path );
        
        $("#personImage").attr("src","https://www.themoviedb.org/t/p/original" + data.profiles[0].file_path );
        $("#personImage").attr({width: "200", height: "250"} );
        
    })
}

function getPersonBio() {
    apiUrlgetPersonBio = "https://api.themoviedb.org/3/person/" + personID + "?api_key=" + apiKey;
    fetch(apiUrlgetPersonBio)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        //console.log(data);
        console.log(data.biography);
        //alert("Text: " 
        $("#personBio").text(data.biography);
        $("#personName").text(data.name);
        
    })
}


