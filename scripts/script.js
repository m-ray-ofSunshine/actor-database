

$("#searchBtn").on("click", storeInput)
var searchInput = localStorage.getItem("search")
var apiKey = "65e03376af118d009632cee16530207e"
var mediastackApiKey = "95cf4635444d7de781b2e3943b1b8db4"
var mediastackApiKey2 = "469b5ecadc5450b6e320fec4bd026172"
var apiUrlPersonSearch = "https://api.themoviedb.org/3/search/person?api_key=" + apiKey + "&query=" + searchInput

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
var movieNameArr = [];
var movieOne = document.getElementById("movieOne");
var movieTwo = document.getElementById("movieTwo");
var movieThree = document.getElementById("movieThree");
var movieFour = document.getElementById("movieFour");
var movieFive = document.getElementById("movieFive");
var topSelections = $(".topSelections")
var topMoviesCard = $(".topMoviesCard")
var topMoviesTitle = $(".topMoviesTitle")
var topMoviesDetails = $(".topMoviesDetails")

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});


function getPersonID() {
    fetch(apiUrlPersonSearch)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            personID = data.results[0].id;
            getPersonImage(personID);
            getPersonBio(personID);
            getMoviePopularity(personID)
            getPersonTwitterID(personID)
            getNews(searchInput)
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

            $("#personImage").attr("src", "https://www.themoviedb.org/t/p/original" + data.profiles[0].file_path);
            $("#personImage").attr({ width: "200", height: "250" });

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


function getMovieDetails() {
    console.log(movieNameArr)
    movieNameArr.forEach(function (id) {
        apiUrlgetMovieDetails = "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + apiKey;
        fetch(apiUrlgetMovieDetails)
            .then(function (response) {
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
    })
    for (var i = 0; i < movieNameArr; i++) {

    }
}

function getTwitterTimeline(twitterScreenName) {
    twttr.widgets.createTimeline(
        {
            sourceType: 'profile',
            screenName: twitterScreenName
        },
        document.getElementById('timeline'),
        {
            width: '550',
            height: '700',
            chrome: "noscrollbar",
            theme: "dark"
        })


}

function getMoviePopularity(id) {
    apiUrlPersonGetMovieCredits = "https://api.themoviedb.org/3/person/" + id + "/movie_credits?api_key=" + apiKey
    fetch(apiUrlPersonGetMovieCredits)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            data = data.cast
            for (var i = 0; i < data.length; i++) {
                scoreArr.push(data[i].popularity)
            }
            getMovieName(data);
        })
}

function getMovieName(data) {
    for (var i = 0; i < data.length; i++) {
        movieArr.push(data[i].original_title)
    }


    getMovieID(data);
}
function getMovieID(data) {
    // console.log(data);


    for (var i = 0; i < data.length; i++) {
        movieIDArr.push(data[i].id)
    }
    //console.log(movieIDArr);

    getIndex();
}


//function getMovieID() {
//    for (var i = 0; i < movieNameArr.length; i++) {
//        var apiUrlgetMovieID = "https://api.themoviedb.org/3/search/movie?api_key="+apiKey+"&language=en-US&query="+movieNameArr[i]
//        fetch(apiUrlgetMovieID)
//            .then(function (response) {
//                return response.json()
//            })
//            .then(function (data) {
//               console.log(data);
//
//
//            })
//    }
//}

function getIndex() {
    for (var i = 0; i < 5; i++) {
        var indexValue = scoreArr.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
        scoreIndex.push(indexValue);
        scoreArr.splice(indexValue, 1, 0);
    }
    for (var i = 0; i < scoreIndex.length; i++) {
        var idx = scoreIndex[i]
        movieNameArr.push(movieIDArr[idx])
    }


    displayTopMovies();
    getMovieDetails(movieNameArr);
}

function displayTopMovies() {
    for (var i = 0; i < scoreIndex.length; i++) {

        apiUrlgetMovieDetails = "https://api.themoviedb.org/3/movie/" + movieNameArr[i] + "?api_key=" + apiKey;
        fetch(apiUrlgetMovieDetails)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                console.log(data);


                var row = $("<tr>")
                var movieTitle = $("<th/>").attr("scope", "row")
                //var movieDetails = $("<div/>").addClass("col-11 row movieDetails")
                movieTitle.text(data.title)
                console.log(data)


                var releaseDate = $("<td/>").text(data.release_date).addClass("col-2");
                var genre = $("<td/>").text(data.genres[0].name).addClass("col-2");
                var tagline = $("<td/>").text(data.tagline).addClass("col-2");
                var synopsis = $("<td/>").text(data.overview).addClass("col-2");
                var revenue = $("<td/>").text(formatter.format(data.revenue)).addClass("col-2");
                //movieDetails.append(releaseDate, genre, tagline, synopsis, revenue)
                //topMoviesTitle.append(movieTitle)
                row.append(movieTitle, releaseDate, genre, tagline, synopsis, revenue)
                //topMoviesCard.append()
                topMoviesDetails.append(row)

            })
    }
}

// movieOne.innerHTML = movieArr[scoreIndex[0]];
// movieTwo.innerHTML = movieArr[scoreIndex[1]];
// movieThree.innerHTML = movieArr[scoreIndex[2]];
// movieFour.innerHTML = movieArr[scoreIndex[3]];
// movieFive.innerHTML = movieArr[scoreIndex[4]];



function getNews(searchInput) {
    apiUrlNews = "http://api.mediastack.com/v1/news?access_key=" + mediastackApiKey2 + "&languages=en&keywords=" + searchInput + "&limit=10"
    fetch(apiUrlNews)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            var ul = $("<ul/>")
            data.data.forEach(function (item, index) {
                var li = $("<li/>")
                var a = $("<a/>")
                a.attr('href', item.url)
                a.attr('target', '_blank')
                a.text(item.title)
                li.append(a).addClass("list-group-item list-group-item-action list-group-item-dark")
                ul.append(li)
            })
            $(".newsList").append(ul)
        })
}



$(window).on("load", getPersonID)

// use popular movies function to detect movieID
// run a getMovieID function?
// use MovieID to populate 