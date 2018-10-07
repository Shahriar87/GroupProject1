
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
        $("#container").empty();

        //percentChange = parseFloat(response["Global Quote"]["10. change percent"]);
        //percentCheck(percentChange);


        (function(){
            function ac_add_to_head(el){
                var head = document.getElementsByTagName('head')[0];
                head.insertBefore(el,head.firstChild);
            }
            function ac_add_link(url){
                var el = document.createElement('link');
                el.rel='stylesheet';el.type='text/css';el.media='all';el.href=url;
                ac_add_to_head(el);
            }
            function ac_add_style(css){
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
                table.addData([
            
                ]);
              
                // map the data
                mapping = table.mapAs();
                mapping.addField(response["Global Quote"]["02. open"]);
                mapping.addField(response["Global Quote"]["03. high"]);
                mapping.addField(response["Global Quote"]["04. low"]);
                mapping.addField(response["Global Quote"]["05. price"]);
            
                // map the data
                // mapping = table.mapAs();
                // mapping.addField('open', 1);
                // mapping.addField('high', 2);
                // mapping.addField('low', 3);
                // mapping.addField('close', 4);
                
                var chart = anychart.stock();
            /////////////////////////
                console.log(mapping);
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

////////anychart js

// (function(){
//     function ac_add_to_head(el){
//         var head = document.getElementsByTagName('head')[0];
//         head.insertBefore(el,head.firstChild);
//     }
//     function ac_add_link(url){
//         var el = document.createElement('link');
//         el.rel='stylesheet';el.type='text/css';el.media='all';el.href=url;
//         ac_add_to_head(el);
//     }
//     function ac_add_style(css){
//         var ac_style = document.createElement('style');
//         if (ac_style.styleSheet) ac_style.styleSheet.cssText = css;
//         else ac_style.appendChild(document.createTextNode(css));
//         ac_add_to_head(ac_style);
//     }
//     console.log("here");
//     ac_add_style(document.getElementById("ac_style_samples-stock-candlestick-01").innerHTML);
//     ac_add_style(".anychart-embed-samples-stock-candlestick-01{width:600px;height:450px;}");
//     })();


//     //// data for anychart

//     anychart.onDocumentReady(function () {
        
//         // set the data
//         table = anychart.data.table();
//         table.addData([
    
//         ]);
      
//         // map the data
//         mapping = table.mapAs();
//         mapping.addField('open', 1);
//         mapping.addField('high', 2);
//         mapping.addField('low', 3);
//         mapping.addField('close', 4);
    
//         // chart type
//         var chart = anychart.stock();
    
//         console.log("here2");
//         // set the series
//         var series = chart.plot(0).candlestick(mapping);
//         series.name("ACME Corp. stock prices");
    
//         chart.title('Stock Candlestick Demo: ACME Corp. Stock prices \n(Array data notation)');
//         chart.container('container');
    
//         chart.draw();
//     });