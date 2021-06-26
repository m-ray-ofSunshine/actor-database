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
var apiUrlgetMovieDetails;
var apiUrlgetTwitterTimeline;

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
        console.log(data);
        
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

function getMovieDetails(movieID){
    apiUrlgetMovieDetails = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=" +apiKey;
    fetch(apiUrlgetMovieDetails)
    .then(function (response){
        return response.json()
    })
    .then(function (data) {
        //console.log(data);
        $(".releaseDate").text(data.release_date);
        $(".genre").text(data.genres.name);
        $(".tagline").text(data.tagline);
        $(".synopsis").text(data.overview);
        $(".revenue").text(data.revenue);
    })
}

function getTwitterTimeline(){
    apiUrlgetTwitterTimeline = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" + twitterName + "&count=2"
    fetch(apiUrlgetTwitterTimeline)
    .then(function (response){
        return response.json()
    })
}



// use popular movies function to detect movieID
// run a getMovieID function?
// use MovieID to populate 