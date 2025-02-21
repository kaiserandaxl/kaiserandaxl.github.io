var btn = document.getElementById("newsBtn");

var news = ['a','b','c','d','e',];

function newNews (e) {
    e.preventDefault();
    var randomNumber = Math.floor(Math.random()*(news.length));
    document.getElementById('newsDisplay').innerHTML = news[randomNumber];
}

btn.addEventListener("click", newNews);
btn.addEventListener("touchstart", newNews);
