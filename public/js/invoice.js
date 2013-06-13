$(document).ready(function (e) {

    console.log($.url().param('form'));
    var formID = $.url().param('form');

    $(document).on("click", "#btn-add-invoice", function (e) {
        var jsonForm = $('#formData').serializeObject();
        var jsonObject = JSON.stringify(jsonForm);

        console.log(jsonObject);

        $.ajax({
            type: "POST",
            url: "http://digidocgov.herokuapp.com/invoices.json",
            data: jsonObject,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                window.location.replace("/");
            }
        });


    });

    $.getJSON('http://digidocgov.herokuapp.com/forms/' + formID + '.json', function (response) {
        $(".loading").fadeOut("slow", function () {
            $(".content-master").fadeIn("slow");
        });

        $(".content-master").html("");

        var massiveString = "<h1>Llenar Formulario</h1><form id='formData'><p style='margin-top:2em; line-height:1.5em;'><strong>Titulo: </strong>" + response.title + "<br/><strong>Descripcion: </strong>" + response.description + "<br/><strong>Agencia: </strong>" + response.agency + "<br/><strong>Tipo de Contrato: </strong>" + response.documentType + "</p><hr />";

        var datafields = response.datafields;

        massiveString += "<div class='control-group dynamicInputs dynamicForms'><input name='title' class='input-xxlarge' type='text' placeholder='Titulo de la solicitud" + datafields[i].name + "' /><br/>";
        for (var i = 0; i < datafields.length; i++) {
            //<input name='datafields[][name]' class='input-xxlarge' type='text' placeholder='Ej. Tipo de Contrato, Jefe de Agencia, etc.' /> <select name='datafields[][fieldType]'><option value='text' selected>Text Field</option><option value='text'>Large Field</option><option value='text'>Radio Button</option></select>
            massiveString += "<input name='value' class='input-xxlarge' type='text' placeholder='" + datafields[i].name + "' /><input type='hidden' name='name' value='" + datafields[i].name + "'/><input type='hidden' name='fieldType' value='text'/><br />";
        }
        massiveString += "</div> <hr />";

        massiveString += "<div class='control-group'><input name='creatorName' class='input-xlarge' type='text' placeholder='Nombre del solicitante' /><br/><input name='creatorEmail' class='input-xlarge' type='text' placeholder='Email del solicitante' /></div><div class='control-group'><input name='signeeName' class='input-large' type='text' placeholder='Nombre del firmante'/><br/><input name='signeeEmail' class='input-large' type='text' placeholder='Email del firmante'/></div>";
        massiveString += "</form>";
        massiveString += "<button id='btn-add-invoice' class='btn-add-unique btn btn-inverse pull-left' type='button'>Enviar Solicitud</button>";
        $(".content-master").append(massiveString);
    });

});