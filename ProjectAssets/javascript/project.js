//Stock info chart display

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
    
    ac_add_style(document.getElementById("ac_style_samples-stock-candlestick-01").innerHTML);
    ac_add_style(".anychart-embed-samples-stock-candlestick-01{width:600px;height:450px;}");
    })();
    
   
    anychart.onDocumentReady(function () {
    
        // set the data
        table = anychart.data.table();
        table.addData([
    ['2004-01-02', 92.86, 93.05, 91.20, 91.55],
    ['2004-01-05', 92.00, 93.09, 92.00, 93.05],
    ['2004-01-06', 100.20, 93.19, 92.14, 93.06],
    ['2004-01-07', 93.14, 93.38, 92.47, 92.78],
    ['2004-01-08', 93.21, 93.21, 92.03, 93.04],
    ['2004-01-09', 91.75, 92.35, 91.00, 91.21],
    ['2004-01-12', 91.21, 92.14, 91.21, 91.55],
    ['2004-01-13', 91.45, 91.51, 89.01, 89.70],
    ['2004-01-14', 89.90, 90.46, 89.75, 90.31],
    ['2004-01-15', 95.07, 95.65, 93.55, 94.02],
    ['2004-01-16', 95.00, 95.35, 94.71, 95.32],
    ['2004-01-20', 96.00, 97.44, 95.73, 97.10],
    ['2004-01-21', 97.23, 98.04, 96.64, 97.70],
    ['2004-01-22', 97.84, 98.16, 97.32, 97.51],
    ['2004-01-23', 97.82, 98.21, 97.10, 97.90],
    ['2004-01-26', 97.90, 99.85, 97.56, 99.85],
    ['2004-01-27', 99.40, 99.67, 98.70, 98.80],
    ['2004-01-28', 99.15, 99.42, 97.28, 97.38],
    ['2004-01-29', 98.10, 98.60, 96.55, 98.01],
    ['2004-01-30', 98.02, 99.33, 97.84, 99.23],
    ['2004-02-02', 99.15, 99.94, 98.50, 99.39],
    ['2004-02-03', 99.00, 99.00, 98.95, 99.00],
    ['2004-02-04', 99.38, 99.43, 99.30, 99.19],
    ['2004-02-05', 99.00, 99.09, 98.26, 98.86],
    ['2004-02-06', 98.85, 99.24, 98.25, 98.94],
    ['2004-02-09', 99.31, 99.44, 98.60, 98.95],
    ['2004-02-10', 98.45, 99.97, 98.41, 99.61],
    ['2004-02-11', 99.20, 99.31, 98.80, 99.96],
    ['2004-02-12', 99.06, 99.30, 99.30, 99.30],
    ['2004-02-13', 99.10, 99.99, 99.08, 99.71],
    ['2004-02-17', 99.99, 99.00, 99.32, 99.37],
    ['2004-02-18', 99.31, 99.77, 98.15, 98.42],
    ['2004-02-19', 98.42, 99.23, 97.52, 97.80],
    ['2004-02-20', 98.60, 98.60, 97.19, 97.31],
    ['2004-02-23', 97.40, 97.51, 95.46, 95.96],
    ['2004-02-24', 95.20, 97.46, 95.20, 96.79],
    ['2004-02-25', 96.50, 97.09, 96.23, 96.54],
    ['2004-02-26', 96.27, 97.26, 96.25, 96.79],
    ['2004-02-27', 96.80, 97.38, 96.10, 96.50],
    ['2004-03-01', 96.50, 97.25, 96.15, 97.04],
    ['2004-03-02', 97.60, 97.60, 96.62, 96.82],
    ['2004-03-03', 96.57, 96.89, 95.60, 96.84],
    ['2004-03-04', 96.58, 96.92, 96.13, 96.39],
    ['2004-03-05', 95.95, 96.98, 95.56, 96.45],
    ['2004-03-08', 96.49, 96.88, 94.59, 94.59],
    ['2004-03-09', 94.30, 95.28, 93.77, 94.53],
    ['2004-03-10', 94.38, 94.74, 92.68, 93.06],
    ['2004-03-11', 92.00, 92.98, 91.15, 91.21],
    ['2004-03-12', 92.00, 93.38, 91.68, 93.30],
    ['2004-03-15', 92.60, 92.69, 90.88, 91.82],
    ['2004-03-16', 92.40, 92.70, 91.42, 92.45],
    ['2004-03-17', 92.57, 93.79, 92.45, 93.39],
    ['2004-03-18', 93.05, 93.18, 91.90, 92.85],
    ['2004-03-19', 92.86, 92.97, 91.51, 91.62],
    ['2004-03-22', 91.27, 91.48, 90.28, 91.02],
    ['2004-03-23', 91.60, 92.16, 90.68, 91.32],
    ['2004-03-24', 91.57, 92.49, 91.04, 91.77],
    ['2004-03-25', 92.15, 92.63, 91.45, 92.39],
    ['2004-03-26', 92.39, 93.25, 92.16, 92.77],
    ['2004-03-29', 92.99, 93.61, 92.18, 92.68],
    ['2004-03-30', 92.67, 92.67, 91.35, 92.32],
    ['2004-03-31', 92.07, 92.24, 91.51, 91.84]
        ]);
      
        // map the data
        mapping = table.mapAs();
        mapping.addField('open', 1);
        mapping.addField('high', 2);
        mapping.addField('low', 3);
        mapping.addField('close', 4);
    
        // chart type
        var chart = anychart.stock();
    
        // set the series
        var series = chart.plot(0).candlestick(mapping);
        series.name("ACME Corp. stock prices");
    
        chart.title('Stock Candlestick Demo: ACME Corp. Stock prices \n(Array data notation)');
        chart.container('container');
    
        chart.draw();
    });

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

const form = document.querySelector("form");

form.addEventListener("submit", postComment);

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
    comments.innerHTML = `<hr><h4>${name} says<span id="timeSpan">${timeStamp}</span></h4><p>${comment}</p>${comments.innerHTML}`;
}

// basic javascript filler\

var apiUrl = "https://ronreiter-meme-generator.p.mashape.com/meme";
var topText = "Your investing";
var bottomText = "in the right shit";
var font = "Impact";
var fontSize = "50";
var meme = "Metal-Jesus";
var queryURL = apiUrl+"?bottom="+bottomText+"&font="+font+"&font_size="+fontSize+ "&meme="+meme +"&top="+topText;

$.ajax({
    url: queryURL,
    method: "GET",
    headers: {
        "X-Mashape-Key": "jCuQ07buCmmshB86bfe7bGRUwQOEp1TxvzWjsnsnNSN16soTiH",
        "Accept": "text/plain"
    },
}).then(function (response) {
    $("#meme").append("<img src = 'http://apimeme.com/meme?meme=" + meme +"&top="+topText+"&bottom="+bottomText+"&test=2'>")
    console.log(response);
    console.log("------------------------------------------------------------------------------");
});

var goodImg = ["Corona","Buddy-Christ","Brain-Griffin","Metal-Jesus"];
var badImg =  ["Booty-Warrior","Burn-Kitty","Not-Bad","Not-Okay-Rage-Face"];



//"https://ronreiter-meme-generator.p.mashape.com/meme?bottom=Bottom+text&font=Impact&font_size=50&meme=Condescending-Wonka&top=Top+text")
//'https://ronreiter-meme-generator.p.mashape.com/meme?bottom=Bottom+text&font=Impact&font_size=50&meme=Cool-Obama&top=Top+text' 
// http://apimeme.com/meme?meme=Condescending-Wonka&top=Top+text&bottom=Bottom+text&test=1
