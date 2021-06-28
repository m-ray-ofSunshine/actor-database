

$("#searchBtn").on("click", storeInput)
var searchInput = localStorage.getItem("search")
var apiKey = "65e03376af118d009632cee16530207e"
var mediastackApiKey = "95cf4635444d7de781b2e3943b1b8db4"
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
        console.log(data)
        personID = data.results[0].id; 
        getPersonImage(personID);
        getPersonBio(personID);
        getMoviePopularity(personID)
        getPersonTwitterID(personID)
        //getMovieIDArr(movieIDArr, scoreIndex)
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
    fetch(apiUrlPersonGetMovieCredits)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data);
        
    })
}
function getPersonTwitterID(id) {
    apiUrlPersonGetTwitterID = "https://api.themoviedb.org/3/person/" + id + "/external_ids?api_key=" + apiKey 
    fetch(apiUrlPersonGetTwitterID)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        //console.log(data);
        personTwitterID = data.twitter_id;
        getTwitterTimeline(personTwitterID)
    })
}

function storeInput() {
    searchInput = $("#userInput").val()
    console.log(searchInput);
    localStorage.setItem("search", searchInput)
}

function getPersonImage(id) {
    apiUrlgetPersonImage = "https://api.themoviedb.org/3/person/" + id + "/images?api_key=" + apiKey;
    fetch(apiUrlgetPersonImage)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        //console.log(data);
        //console.log("https://www.themoviedb.org/t/p/original" + data.profiles[0].file_path );
        
        $("#personImage").attr("src","https://www.themoviedb.org/t/p/original" + data.profiles[0].file_path );
        $("#personImage").attr({width: "200", height: "250"} );
        
    })
}

function getPersonBio(id) {
    apiUrlgetPersonBio = "https://api.themoviedb.org/3/person/" + id + "?api_key=" + apiKey;
    fetch(apiUrlgetPersonBio)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        //console.log(data);
        //console.log(data.biography);
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

function getTwitterTimeline(twitterScreenName){
    twttr.widgets.createTimeline(
        {
          sourceType: 'profile',
          screenName: twitterScreenName
        },
        document.getElementById('timeline'),
        {
          width: '450',
          height: '700',
          related: 'twitterdev,twitterapi'
        }).then(function (el) {
          console.log('Embedded a timeline.')
        });
  
  
}

function getMoviePopularity(id) {
    apiUrlPersonGetMovieCredits = "https://api.themoviedb.org/3/person/" + id+ "/movie_credits?api_key="+ apiKey
    fetch(apiUrlPersonGetMovieCredits)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        data = data.cast
        for (var i=0; i<data.length;i++) {
            scoreArr.push(data[i].popularity)
        }
        getMovieName();
    })
}

function getMovieName() {
    fetch(apiUrlPersonGetMovieCredits)
    .then(function (response) {
    return response.json()
    })
    .then(function (data) {
        data = data.cast
        for (var i=0; i<data.length;i++) {
            movieArr.push(data[i].original_title)
        }
        getIndex();
    })
}

function getMovieID() {
    fetch(apiUrlPersonGetMovieCredits)
    .then(function (response) {
    return response.json()
    })
    .then(function (data) {
        data = data.cast
        for (var i=0; i<data.length;i++) {
            movieIDArr.push(data[i].id)

        }
    })
}

function getIndex() {
    for (var i=0; i<5;i++) {
        var indexValue = scoreArr.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
        scoreIndex.push(indexValue);
        scoreArr.splice(indexValue,1,0);
    }
    displayTopMovies();
}

function displayTopMovies() {
    movieOne.innerHTML = movieArr[scoreIndex[0]];
    movieTwo.innerHTML = movieArr[scoreIndex[1]];
    movieThree.innerHTML = movieArr[scoreIndex[2]];
    movieFour.innerHTML = movieArr[scoreIndex[3]];
    movieFive.innerHTML = movieArr[scoreIndex[4]];
    getMovieID();
}

function getNews(searchInput) {
    apiUrlNews = "http://api.mediastack.com/v1/news?access_key=" + mediastackApiKey + "&languages=en&keywords=" + searchInput + "&limit=10"
    fetch(apiUrlNews)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        var ul = $("<ul/>")
        data.data.forEach(function(item,index){
            console.log(item.title)
            var li = $("<li/>")
            var a =$("<a/>")
            a.attr('href',item.url)
            a.attr('target', '_blank')
            a.text(item.title)
            li.append(a)
            ul.append(li)
        })
        $(".newsList").append(ul)
    })
}


 
$( window ).on("load", getPersonID )

// use popular movies function to detect movieID
// run a getMovieID function?
// use MovieID to populate 