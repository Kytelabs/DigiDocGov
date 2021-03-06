$(document).ready(function (e) {

    var pathname = window.location.pathname;
    pathname += ".json";
    $.getJSON(pathname, function (response) {
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

        leString += "<div class='sigPad signed'><div class='sigWrapper'><div class='typed'>" + response.signeeName + "</div><canvas id='signature-canvas' class='pad' width='500' height='250'></canvas></div></div>"

        $(".content-master").html(leString);

        executeSignature();


    });

});

function executeSignature() {
    var _canvas = document.getElementById("signature-canvas");
    var _context = _canvas.getContext('2d');
    var pathname = window.location.pathname;
    pathname += ".json";
    $.get(pathname, function (sig) {
        var new_width = 1000;  // CHOOSE WIDTH HERE
        var new_height = (sig.canvasHeight / sig.canvasWidth) * new_width;
        var width_scale = new_width / (sig.canvasWidth);
        var height_scale = new_height / (sig.canvasWidth);
        _context.scale(width_scale, height_scale);
        $('.sigPad').signaturePad({ displayOnly: true }).regenerate(sig.signature);
    });
}



function validKey(string) {
    if (string != "deleted_at" && string != "updated_at" && string != "created_at" && string != "_id" && string != "version" && string != "canvasHeight" && string != "canvasWidth" && string != "signature") {
        return true;
    }
    else {
        return false;
    }
}