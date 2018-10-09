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

//Make a list of companies//
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
    timeSeries(symbol, Cname);
    console.log("submit")
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

        //percentChange = parseFloat(response["Global Quote"]["10. change percent"]);
        //percentCheck(percentChange);

    });

};

function timeSeries(symbol, Cname) {

    var apiKey = "OITK8BXMQAB96E81";

    var companySymbol = symbol;

    var apiUrl2 = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY"

    var queryURL3 = apiUrl2 + "&symbol=" + companySymbol + "&apikey=" + apiKey;

    $.ajax({
        url: queryURL3,
        method: "GET",
    }).then(function (response) {

        $("#container").empty();

        //Tranforming Object into Array and then locating them with Index number

        var myObj = response["Time Series (Daily)"];
        var key = Object.keys(myObj)[0];

        console.log(key);
        console.log(myObj[key]);

        // Dynamically calling last 30 days open, high, low and close price and putting them into an array

        var keys;
        var timeSeriesData = [];

        for (var i = 0; i < 30; i++) {
            keys = Object.keys(myObj)[i]
            timeSeriesData.push([keys, parseFloat(myObj[keys]["1. open"]), parseFloat(myObj[keys]["2. high"]), parseFloat(myObj[keys]["3. low"]), parseFloat(myObj[keys]["4. close"])])
        };

        console.log(timeSeriesData);


        (function () {
            function ac_add_to_head(el) {
                var head = document.getElementsByTagName('head')[0];
                head.insertBefore(el, head.firstChild);
            }
            function ac_add_link(url) {
                var el = document.createElement('link');
                el.rel = 'stylesheet'; el.type = 'text/css'; el.media = 'all'; el.href = url;
                ac_add_to_head(el);
            }
            function ac_add_style(css) {
                var ac_style = document.createElement('style');
                if (ac_style.styleSheet) ac_style.styleSheet.cssText = css;
                else ac_style.appendChild(document.createTextNode(css));
                ac_add_to_head(ac_style);
            }
            ///////////////
            console.log("here");
            //////////////////////
            ac_add_style(document.getElementById("ac_style_samples-stock-candlestick-01").innerHTML);
            ac_add_style(".anychart-embed-samples-stock-candlestick-01{width:600px;height:450px;}");
        })();


        //// data for anychart

        anychart.onDocumentReady(function () {

            // set the data
            table = anychart.data.table();

            table.addData(timeSeriesData);

            // table.addData([
            //     // this is just filler data to how the chart works
            //     ['2004-01-12', 91.21, 92.14, 91.21, 91.55],
            //     ['2001-01-13', 91.45, 91.51, 89.01, 89.70],
            //     ['2001-04-14', 89.90, 90.46, 89.75, 90.31],
            //     ['2001-08-15', 95.07, 95.65, 93.55, 94.02],
            //     ['2002-01-16', 95.00, 95.35, 94.71, 95.32],
            //     ['2002-04-20', 96.00, 97.44, 95.73, 97.10],
            //     ['2002-08-21', 97.23, 98.04, 96.64, 97.70],
            //     ['2003-01-22', 97.84, 98.16, 97.32, 97.51],
            //     ['2003-04-23', 97.82, 98.21, 97.10, 97.90],
            //     ['2003-08-26', 97.90, 99.85, 97.56, 99.85],
            //     ['2004-01-27', 99.40, 99.67, 98.70, 98.80],
            //     ['2004-08-28', 99.15, 99.42, 97.28, 97.38]
            // ]);


            // map the data
            //mapping = table.mapAs();
            //mapping.addField(response["Global Quote"]["02. open"]);
            //mapping.addField(response["Global Quote"]["03. high"]);
            //mapping.addField(response["Global Quote"]["04. low"]);
            //mapping.addField(response["Global Quote"]["05. price"]);

            // map the data
            mapping = table.mapAs();
            mapping.addField('open', 1);
            mapping.addField('high', 2);
            mapping.addField('low', 3);
            mapping.addField('close', 4);

            var chart = anychart.stock();
            /////////////////////////
            // console.log(mapping);
            /////////////////
            // set the series
            var series = chart.plot(0).candlestick(mapping);
            series.name(Cname);

            chart.title(companySymbol);
            chart.container('container');

            chart.draw();
        });

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







