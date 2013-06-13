$(document).ready(function (e) {

    console.log($.url().param('form'));
    var formID = $.url().param('form');

    $.getJSON('http://digidocgov.herokuapp.com/forms/' + formID + '.json', function (response) {
        $(".loading").fadeOut("slow", function () {
            $(".content-master").fadeIn("slow");
        });

        $(".content-master").html("");

        $(".content-master").append("<h1>Llenar Formulario</h1><form id='formData'><p style='margin-top:2em; line-height:1.5em;'><strong>Titulo: </strong>" + response.title + "<br/><strong>Descripcion: </strong>" + response.description + "<br/><strong>Agencia: </strong>" + response.agency + "<br/><strong>Tipo de Contrato: </strong>" + response.documentType + "</p><hr />");

        var datafields = response.datafields;

        var stringToAppend = "<div class='control-group dynamicInputs dynamicForms'>";
        for (var i = 0; i < datafields.length; i++) {
            //<input name='datafields[][name]' class='input-xxlarge' type='text' placeholder='Ej. Tipo de Contrato, Jefe de Agencia, etc.' /> <select name='datafields[][fieldType]'><option value='text' selected>Text Field</option><option value='text'>Large Field</option><option value='text'>Radio Button</option></select>
            stringToAppend += "<input name='' class='input-xxlarge' value='" + datafields[i].name + "' />";
            stringToAppend += "<br />";
        }
        stringToAppend += "</div></form>";
        $(".content-master").append(stringToAppend);
    });

});