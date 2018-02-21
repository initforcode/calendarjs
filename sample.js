function helloWorld() {
    $("p").addClass("classy");
    if ($("p").text().startsWith("Who let")) {
        console.log("hello there!!")
    }
}

function runHelloAgain() {
    helloWorld();
}

var runHelloWorld = function () {
    helloWorld();    
}

$(document).ready(runHelloWorld);
