



var searchInput = localStorage.getItem("search")
var apiKey = "65e03376af118d009632cee16530207e"
var personID; 
var personTwitterID;
var apiUrlPersonSearch; 
var apiUrlPersonGetTwitterID;



function getPersonID() {
    apiUrlPersonSearch = "https://api.themoviedb.org/3/search/person?api_key="+ apiKey + "&query=" + searchInput
    fetch(apiUrlPersonSearch)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        personID = data.results[0].id;
        getPersonDetails(personID);
        
    })
}

function getPersonDetails(id) {
    var apiUrlPersonGetDetails = "https://api.themoviedb.org/3/person/" + id + "?api_key=" + apiKey 

    fetch(apiUrlPersonGetDetails)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data);

        getPersonMovieCredits(id)
    })
    
}
function getPersonMovieCredits(id) {
    var apiUrlPersonGetMovieCredits = "https://api.themoviedb.org/3/person/" + id+ "/movie_credits?api_key="+ apiKey
    fetch(apiUrlPersonGetMovieCredits)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log( data);
        getPersonTwitterID(id)
    })
}
function getPersonTwitterID(id) {
    apiUrlPersonGetTwitterID = "https://api.themoviedb.org/3/person/" + id + "/external_ids?api_key=" + apiKey 
    fetch(apiUrlPersonGetTwitterID)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data)
    })
   
}

function storeInput() {
    searchInput = $("#userInput").val()
    console.log(searchInput);
    localStorage.setItem("search", searchInput)
    renderPage()
}
function setIDs() {
        
    getPersonID()
  
   renderPage()
    
    
}
function renderPage() {
    getPersonDetails()
    
}
$(window).on("load" , function () {
    
    
    //sets the id
    getPersonID();

    //use the id to get the details
    
    
    

});

