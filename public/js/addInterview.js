$(document).ready(function (e) {

    var curexperiment = $("#sidebar-current").val();

    $.getJSON('http://leanpad.herokuapp.com/experiments/' + curexperiment + '.json?callback=?', function (response) {

        //$("#body").html(JSON.stringify(response));

        var infoDiv = $("#interviewData");

        $("#experiment_id").attr("value", curexperiment);

        var demographic = response.demofields;
        var pains = response.painhypos;
        var gains = response.gainhypos;

        var stringToAppend;

        infoDiv.append("<h2>Demographics</h2>");

        stringToAppend = "<div class='control-group demographics'>";
        for (var i = 0; i < demographic.length; i++) {
            stringToAppend += "<input name='demoValues[][title]' type='hidden' value='" + demographic[i].title + "' />";
            stringToAppend += "<input name='demoValues[][value]' class='input-xlarge' type='text' placeholder='" + demographic[i].title + "' />";
            stringToAppend += "<br />";

        }
        stringToAppend += "</div>";
        infoDiv.append(stringToAppend);

        infoDiv.append("<h2>Pains</h2>");

        stringToAppend = '';
        for (var i = 0; i < pains.length; i++) {
            stringToAppend += "<div class='control-group pains'>";

            stringToAppend += "<input name='pains[" + i + "][title]' type='hidden' value='" + pains[i].title + "' />";
            stringToAppend += "<p>" + pains[i].title + "</p>"


            stringToAppend += "<label class='radio inline'><input type='radio' name='pains[" + i + "][intensity]' value='0' checked>None</label><label class='radio inline'><input type='radio' name='pains[" + i + "][intensity]' value='3'> High intensity</label><label class='radio inline'><input type='radio' name='pains[" + i + "][intensity]' value='2'> Medium intensity</label><label class='radio inline'><input type='radio' name='pains[" + i + "][intensity]' value='1'> Low intensity</label>"
            stringToAppend += "<br />";
            stringToAppend += "<label class='radio inline'><input type='radio' name='pains[" + i + "][priority]' value='0' checked>None</label><label class='radio inline'><input type='radio' name='pains[" + i + "][priority]' value='3'> High frequency</label><label class='radio inline'><input type='radio' name='pains[" + i + "][priority]' value='2'> Medium frequency</label><label class='radio inline'><input type='radio' name='pains[" + i + "][priority]' value='1'> Low frequency</label>"
            stringToAppend += "<br />";

            stringToAppend += "</div>";
        }

        infoDiv.append(stringToAppend);

        infoDiv.append("<h2>Gains</h2>");

        stringToAppend = '';
        for (var i = 0; i < gains.length; i++) {
            stringToAppend += "<div class='control-group pains'>";

            stringToAppend += "<input name='gains[" + i + "][title]' type='hidden' value='" + gains[i].title + "' />";
            stringToAppend += "<p>" + gains[i].title + "</p>"


            stringToAppend += "<label class='radio inline'><input type='radio' name='gains[" + i + "][intensity]' value='0' checked>None</label><label class='radio inline'><input type='radio' name='gains[" + i + "][intensity]' value='3'> High intensity</label><label class='radio inline'><input type='radio' name='gains[" + i + "][intensity]' value='2'> Medium intensity</label><label class='radio inline'><input type='radio' name='gains[" + i + "][intensity]' value='1'> Low intensity</label>"
            stringToAppend += "<br />";
            stringToAppend += "<label class='radio inline'><input type='radio' name='gains[" + i + "][priority]' value='0' checked>None</label><label class='radio inline'><input type='radio' name='gains[" + i + "][priority]' value='3'> High frequency</label><label class='radio inline'><input type='radio' name='gains[" + i + "][priority]' value='2'> Medium frequency</label><label class='radio inline'><input type='radio' name='gains[" + i + "][priority]' value='1'> Low frequency</label>"
            stringToAppend += "<br />";

            stringToAppend += "</div>";
        }

        infoDiv.append(stringToAppend);

    })

    $("#btn-add-interview").click(function (e) {

        var jsonForm = $('#interviewData').serializeObject();
        var jsonObject = JSON.stringify(jsonForm);

        $.ajax({
            type: "POST",
            url: "http://leanpad.herokuapp.com/interviews.json",
            data: jsonObject,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                
            }
        });

    });
});