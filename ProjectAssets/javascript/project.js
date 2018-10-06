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