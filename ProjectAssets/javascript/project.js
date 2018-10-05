// basic javascript filler
// basic javascript filler\

var apiUrl = "https://ronreiter-meme-generator.p.mashape.com/meme";
var topText = "Fast";
var bottomText = "Slow";
var font = "Impact";
var fontSize = "50";
var meme = "Cool-Obama";
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





//"https://ronreiter-meme-generator.p.mashape.com/meme?bottom=Bottom+text&font=Impact&font_size=50&meme=Condescending-Wonka&top=Top+text")
//'https://ronreiter-meme-generator.p.mashape.com/meme?bottom=Bottom+text&font=Impact&font_size=50&meme=Cool-Obama&top=Top+text' 
// http://apimeme.com/meme?meme=Condescending-Wonka&top=Top+text&bottom=Bottom+text&test=1