

var searchInput = localStorage.getItem("search")
var apiKey = "65e03376af118d009632cee16530207e"
var mediastackApiKey = "95cf4635444d7de781b2e3943b1b8db4"

var apiUrlPersonGetDetails;
var apiUrlPersonGetMovieCredits;
var apiUrlPersonGetTwitterID;
var personTwitterID;
var apiUrlgetTwitterTimeline;

var scoreArr = [];
var scoreIndex = [];
var movieArr = [];
var movieIDArr = [];
var movieNameArr = [];
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

//Fetches the Persons ID and sets it to a global variable then runs other functions using that ID
function getPersonID() {
    var apiUrlPersonSearch = "https://api.themoviedb.org/3/search/person?api_key=" + apiKey + "&query=" + searchInput
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
        })

}

//Fetches the persons twitter screen name
//Runs getTwitterTimeline() and passes the persons twiiter screen name to it
function getPersonTwitterID(id) {
    apiUrlPersonGetTwitterID = "https://api.themoviedb.org/3/person/" + id + "/external_ids?api_key=" + apiKey
    fetch(apiUrlPersonGetTwitterID)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            personTwitterID = data.twitter_id;
            getTwitterTimeline(personTwitterID)
        })
}

//Fetches person's image and places it on our page with correct dimensions 
function getPersonImage(id) {
    apiUrlgetPersonImage = "https://api.themoviedb.org/3/person/" + id + "/images?api_key=" + apiKey;
    fetch(apiUrlgetPersonImage)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            $("#personImage").attr("src", "https://www.themoviedb.org/t/p/original" + data.profiles[0].file_path);
            $("#personImage").attr({ width: "200", height: "250" });

        })
}
//Fetches person's bio and name and places it on our page
function getPersonBio(id) {
    apiUrlgetPersonBio = "https://api.themoviedb.org/3/person/" + id + "?api_key=" + apiKey;
    fetch(apiUrlgetPersonBio)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            $("#personBio").text(data.biography);
            $("#personName").text(data.name);

        })
}



//Takes in a twitter screen name and displays an embedded timeline based on 
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
//Fetches movie credits that the person has been a cast in
//then pushes the popularity number of each movie into scoreArr array
//then runs getMovieName() and passes movie credits data to it
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
//Pushes the title of each movie into movieArr array
//then runs getMovieID() and passes movie credits data to it
function getMovieName(data) {
    for (var i = 0; i < data.length; i++) {
        movieArr.push(data[i].original_title)
    }
    getMovieID(data);
}
//Pushes the Movie ID of each movie into movieIDArr array
//then runs getIndex()
function getMovieID(data) {
    for (var i = 0; i < data.length; i++) {
        movieIDArr.push(data[i].id)
    }
    getIndex();
}


//Grabs the indexs of the top 5 movies based on popularity and pushes those indexes into scoreIndex
//Each time it grabs a index it changes the popularity of that movie to 0 to not grab it again
//Grabs the ID of each movie based on popularity and adds it to movieNameArr
//Runs displayTopMovies()
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
    
}
//Iterates of the top 5 movies
//Dynamically adds the title, release date, genre, tagline, synopsis, and revenue to a table row
//Appends the table row to the table
function displayTopMovies() {
    for (var i = 0; i < scoreIndex.length; i++) {

        apiUrlgetMovieDetails = "https://api.themoviedb.org/3/movie/" + movieNameArr[i] + "?api_key=" + apiKey;
        fetch(apiUrlgetMovieDetails)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
              


                var row = $("<tr>")
                var movieTitle = $("<th/>").attr("scope", "row")
                movieTitle.text(data.title)
                


                var releaseDate = $("<td/>").text(data.release_date).addClass("col-2");
                var genre = $("<td/>").text(data.genres[0].name).addClass("col-2");
                var tagline = $("<td/>").text(data.tagline).addClass("col-2");
                var synopsis = $("<td/>").text(data.overview).addClass("col-2");
                var revenue = $("<td/>").text(formatter.format(data.revenue)).addClass("col-2");
                row.append(movieTitle, releaseDate, genre, tagline, synopsis, revenue)
                topMoviesDetails.append(row)

            })
    }
}




//Passes in the search input into the function
//Makes a link for the top 10 news stories
//Appends the link to a unordered list
function getNews(searchInput) {
    apiUrlNews = "http://api.mediastack.com/v1/news?access_key=" + mediastackApiKey + "&languages=en&keywords=" + searchInput + "&limit=10"
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

//When the window loads run getPersonID() Function

$(window).on("load", getPersonID)
