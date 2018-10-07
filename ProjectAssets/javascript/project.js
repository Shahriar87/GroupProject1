// Firebase setup & Comment Section: 

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCn2pxZTnTMzIA27cfSAaaAH9vjfSTyrGE",
    authDomain: "stock-memers.firebaseapp.com",
    databaseURL: "https://stock-memers.firebaseio.com",
    projectId: "stock-memers",
    storageBucket: "stock-memers.appspot.com",
    messagingSenderId: "781450269578"
};
firebase.initializeApp(config);

var database = firebase.database();

// const form = document.querySelector("form");

// form.addEventListener("submit", postComment);

$(document).on("click", "#commentSub", postComment);

const timeStamp = () => {
    let options = {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    };
    let now = new Date().toLocaleString('en-US', options);
    return now;
};

function postComment(e) {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let comment = document.getElementById("comment").value;

    if (name && comment) {
        database.ref().push({
            name: name,
            comment: comment,
            time: timeStamp()
        });
    }

    document.getElementById("name").value = '';
    document.getElementById("comment").value = '';
};

database.ref().on("child_added", function (snapshot) {
    let comment = snapshot.val();
    addComment(comment.name, comment.comment, comment.time);
});

const addComment = (name, comment, timeStamp) => {
    let comments = document.getElementById("comments");
    comments.innerHTML = `<hr><h5>${name} says<span id="timeSpan">${timeStamp}</span></h5><p>${comment}</p>${comments.innerHTML}`;
}


// Make list of Companies

$.getJSON("nasdaq-companies.json", function (json) {

    for (var i = 0; i < json.length; i++) {

        compName = json[i].fields.name;
        compSymbol = json[i].fields.symbol;

        $("#companyName").append("<option value='" + compSymbol + "' value2='" + compName + "'>" + compName + " (" + compSymbol + ")</option>");

    }
});

// Retriving stock data based on selected company

var symbol = "";
var Cname = "";
$("#companyName").change(function () {
    symbol = $(this).children(":selected").attr("value");
    Cname = $(this).children(":selected").attr("value2");
    console.log($(this).children(":selected").attr("value"));
});

$(document).on("click", "#submit", function (e) {
    e.preventDefault();
    stockPriceProcessing(symbol, Cname);
});

var percentChange = 0;
// Using Alpha Advantage API to get stock price information
function stockPriceProcessing(symbol, Cname) {

    var apiKey = "OITK8BXMQAB96E81";

    var companySymbol = symbol;

    var apiUrl2 = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE"

    var queryURL3 = apiUrl2 + "&symbol=" + companySymbol + "&apikey=" + apiKey;

    $.ajax({
        url: queryURL3,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        $("#stockData").empty();
        $("#stockData").append("<li><p>" + Cname + "</p></li>");
        $("#stockData").append("<li><p> Open Price: $" + response["Global Quote"]["02. open"] + "</p></li>");
        $("#stockData").append("<li><p> High Price: $" + response["Global Quote"]["03. high"] + "</p></li>");
        $("#stockData").append("<li><p> Low Price: $" + response["Global Quote"]["04. low"] + "</p></li>");
        $("#stockData").append("<li><p> Current Price: $" + response["Global Quote"]["05. price"] + "</p></li>");
        $("#stockData").append("<li><p> Latest Trading Day: " + response["Global Quote"]["07. latest trading day"] + "</p></li>");
        $("#stockData").append("<li><p> Previous Close: $" + response["Global Quote"]["08. previous close"] + "</p></li>");
        $("#stockData").append("<li><p> Change: " + response["Global Quote"]["09. change"] + "</p></li>");
        $("#stockData").append("<li><p> Change Percent: " + response["Global Quote"]["10. change percent"] + "</p></li>");

        percentChange = parseFloat(response["Global Quote"]["10. change percent"]);
        percentCheck(percentChange);

    });
};

// Meme Api call for Meme image

function percentCheck(percentChange) {
    var goodMeme =
    {
        goodImg: ["Corona", "Buddy-Christ", "Cool-Obama", "Metal-Jesus"],
        topT: ["Your investing"],
        bottomT: ["in the right shit"]
    };

    var badMeme =
    {
        badImg: ["Booty-Warrior", "Burn-Kitty", "Not-Bad", "Not-Okay-Rage-Face"],
        topT: ["Your investing"],
        bottomT: ["in the wrong shit"],
    };

    var apiUrl = "https://ronreiter-meme-generator.p.mashape.com/meme";
    var font = "Impact";
    var fontSize = "50";
    var topText;
    var bottomText;
    var meme;

    if (percentChange < 0) {
        meme = badMeme.badImg[1];
        topText = badMeme.topT[0];
        bottomText = badMeme.bottomT[0];
    } else {
        meme = goodMeme.goodImg[2];
        topText = goodMeme.topT[0];
        bottomText = goodMeme.bottomT[0];
    }

    var queryURL = apiUrl + "?bottom=" + bottomText + "&font=" + font + "&font_size=" + fontSize + "&meme=" + meme + "&top=" + topText;

    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            "X-Mashape-Key": "jCuQ07buCmmshB86bfe7bGRUwQOEp1TxvzWjsnsnNSN16soTiH",
            "Accept": "text/plain"
        },
    }).then(function (response) {
        $("#meme").html("<img src = 'http://apimeme.com/meme?meme=" + meme + "&top=" + topText + "&bottom=" + bottomText + "&test=2'>")
        
    });
};








