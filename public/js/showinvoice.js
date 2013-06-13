$(document).ready(function (e) {

    $.getJSON($.url() + ".json", function (response) {
        $(".loading").fadeOut("slow", function () {
            $(".content-master").fadeIn("slow");
        });

        $(".content-master").html("");

        var leString = "<h1>Informacion de la Solicitud</h1>";

        for (var key in p) {
            if (p.hasOwnProperty(key) && validKey(key)) {
                leString += "<p style='margin-top:2em; line-height:1.5em;'><strong>"+ key + ": </strong>" + p[key] + "<br/>";
            }
        }

        $(".content-master").html(leString);
        

    });

});


function validKey(string) {
    if (string != "deleted_at" && string != "updated_at" && string != "created_at" && string != "_id" && string != "version") {
        return true;
    }
    else {
        return false;
    }
}