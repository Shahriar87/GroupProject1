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