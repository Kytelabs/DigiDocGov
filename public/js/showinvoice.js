$(document).ready(function (e) {

    var pathname = window.location.pathname;
    pathname += ".json";
    $.getJSON( pathname, function (response) {
        $(".loading").fadeOut("slow", function () {
            $(".content-master").fadeIn("slow");
        });

        $(".content-master").html("");

        var leString = "<h1>Informacion de la Solicitud</h1>";

        for (var key in response) {
            if (response.hasOwnProperty(key) && validKey(key)) {
                leString += "<p style='margin-top:2em; line-height:1.5em;'><strong>" + key + ": </strong>" + response[key] + "<br/>";
            }
        }

        leString += "<div class='sigPad signed'><div class='sigWrapper'><div class='typed'>Sir John A. Macdonald</div><canvas id='signature-canvas' class='pad' width='500' height='250'></canvas></div></div>"
            
        $(".content-master").html(leString);


    });

});


function validKey(string) {
    if (string != "deleted_at" && string != "updated_at" && string != "created_at" && string != "_id" && string != "version" && string != "canvasHeight" && string != "canvasWidth" && string != "signature") {
        return true;
    }
    else {
        return false;
    }
}