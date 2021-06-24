$("#searchBtn").on("click", storeInput)
var searchInput = localStorage.getItem("search")
var apiKey = "65e03376af118d009632cee16530207e"
var apiUrlPersonSearch = "https://api.themoviedb.org/3/search/person?api_key="+ apiKey + "&query=" + searchInput
var personID; 
var apiUrlPersonGetDetails;
var apiUrlPersonGetMovieCredits;
var apiUrlPersonGetTwitterID;
var personTwitterID;

function getPersonID() {
    fetch(apiUrlPersonSearch)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        personID = data.results[0].id;
        apiUrlPersonGetDetails = "https://api.themoviedb.org/3/person/" + personID + "?api_key=" + apiKey 
        apiUrlPersonGetMovieCredits = "https://api.themoviedb.org/3/person/" + personID+ "/movie_credits?api_key="+ apiKey
        apiUrlPersonGetTwitterID = "https://api.themoviedb.org/3/person/" + personID + "/external_ids?api_key=" + apiKey 
        
        })

}
function getPersonDetails() {
    fetch(apiUrlPersonGetDetails)
        .then(function (response) {
        return response.json()
        })
        .then(function (data) {
            //console.log(data);

        })
}
function getPersonMovieCredits() {
    fetch(apiUrlPersonGetMovieCredits)
        .then(function (response) {
        return response.json()
        })
        .then(function (data) {
            //console.log(data);

        })
}
function getPersonTwitterID() {
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