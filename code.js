var btn = document.getElementById("newsBtn");

var news = ['a','b','c','d','e',];

function newNews (e) {
    alert("Touched")
}

btn.addEventListener("click", newNews);
btn.addEventListener("touchstart", newNews);
