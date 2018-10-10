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

// Make Dropdown list of Memes

$.getJSON("meme-images.json", function (json2) {
    // console.log(json2);
    for (var i = 0; i < json2.length; i++) {
        memeName = json2[i];
        $("#memeImageName").append("<option value='" + memeName + "'>" + memeName + "</option>");
    }
});

// User Meme Comment Post

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

var mName = "";
var name = "";
var topTxt = "";
var bottomTxt = "";
var memeId = "";

$("#memeImageName").change(function () {
    mName = $(this).children(":selected").attr("value");
});

$(document).on("click", "#commentSub", function (e) {
    e.preventDefault();
    name = $("#name").val().trim();
    topTxt = $("#topText").val();
    bottomTxt = $("#bottomText").val();
    // console.log(mName);
    // console.log(name);
    // console.log(topTxt)

    if (name && topTxt && bottomTxt && mName) {
        database.ref().push({
            name: name,
            mName: mName,
            topTxt: topTxt,
            bottomTxt: bottomTxt,
            time: timeStamp()
        });
    }
    $("#name").val("");
    $("#topText").val("");
    $("#bottomText").val("");
    $("#memeImageName").val($("#memeImageName").data("default-value"));

    mName = "";
    name = "";
    topTxt = "";
    bottomTxt = "";
});

database.ref().on("child_added", function (childSnapshot) {
    let comment = childSnapshot.val();
    memeId = childSnapshot.key;
    addComment(comment.name, comment.mName, comment.topTxt, comment.bottomTxt, comment.time, memeId);
    // console.log(memeId);
});

const addComment = (name, mName, topTxt, bottomTxt, timeStamp, memeId) => {
    // console.log(memeId);
    $("#uMeme").prepend("<div id='" + memeId + "'><hr><h5><b>" + name + " says on <span id='timeSpan'>" + timeStamp
        + "                    </b><i class='material-icons delete' data-train='" + memeId +
        "' style='font-size:30px; color: red'>close</i></span></h5><img src='http://apimeme.com/meme?meme="
        + mName + "&top=" + topTxt + "&bottom=" + bottomTxt + "&test=1'</img></div>");
}

// Delete Meme Comments

$(document).on('click', '.delete', function () {
    var memeKey = $(this).attr('data-train');
    database.ref(memeKey).remove();
    $("#" + memeKey).remove();
});

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

// console.log(symbol);

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
        $("#stockData").append("<li><b>" + Cname + "</b></li><br>");
        $("#stockData").append("<li><b>Open Price:</b> $" + response["Global Quote"]["02. open"] + "</li>");
        $("#stockData").append("<li><b>High Price:</b> $" + response["Global Quote"]["03. high"] + "</li>");
        $("#stockData").append("<li><b>Low Price:</b> $" + response["Global Quote"]["04. low"] + "</li>");
        $("#stockData").append("<li><b>Current Price:</b> $" + response["Global Quote"]["05. price"] + "</li>");
        $("#stockData").append("<li><b>Latest Trading Day:</b> " + response["Global Quote"]["07. latest trading day"] + "</li>");
        $("#stockData").append("<li><b>Previous Close:</b> $" + response["Global Quote"]["08. previous close"] + "</li>");
        $("#stockData").append("<li><b>Change:</b> " + response["Global Quote"]["09. change"] + "</li>");
        $("#stockData").append("<li><b>Change Percent:</b> " + response["Global Quote"]["10. change percent"] + "</li>");

        percentChange = parseFloat(response["Global Quote"]["10. change percent"]);
        percentCheck(percentChange);

    });
};


function timeSeries(symbol, Cname) {

    var apiKey = "WW3QMLRBLCZIJBV2";

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

// Meme Api call for Stock Meme image

function percentCheck(percentChange) {
    
    var goodMeme =
    {
        goodImg: ["Cool-Obama", "Buddy-Christ", "Chuck-Norris-Approves", "Metal-Jesus", "Gangnam-Style-PSY","Fast-Furious-Johnny-Tran","Ghetto-Jesus"],
        topT: ["Your Investing", "Right On", "Because", "You", "OPA","Money is","Draaank"],
        bottomT: ["In the Right Shit", "Buddy", "He bought it too", "rock!", "Gangnam style","own my mind","Is on Me!"]
    };

    var badMeme =
    {
        badImg: ["Booty-Warrior", "Burn-Kitty", "Bitch-Please", "Angry-Baby", "Aaaaand-Its-Gone","Criana","Dave-Chappelle","III-Have-You-Know-Spongebob"],
        topT: ["Cant you read", "Burn", "your money", "Get your", "Aaaaand","We not making","Can I Have","I Mean"],
        bottomT: ["before you invest", " ", "is screwed", "Shit together", "Its-Gone","No Money!","A Dollar","Its Whatever"],
    };

    var apiUrl = "https://ronreiter-meme-generator.p.mashape.com/meme";
    var font = "Impact";
    var fontSize = "50";
    var topText;
    var bottomText;
    var meme;
    var i = 0;

    if (percentChange < 0) {
        i = Math.floor(Math.random() * badMeme.badImg.length);
        console.log(i);
        meme = badMeme.badImg[i];
        topText = badMeme.topT[i];
        bottomText = badMeme.bottomT[i];
    } else {
        i = Math.floor(Math.random() * goodMeme.goodImg.length);
        console.log(i);
        meme = goodMeme.goodImg[i];
        topText = goodMeme.topT[i];
        bottomText = goodMeme.bottomT[i];
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
        // console.log(response);
        $("#cMeme").html("<img src = 'http://apimeme.com/meme?meme=" + meme + "&top=" + topText + "&bottom=" + bottomText + "&test=1'>")

    });
};















