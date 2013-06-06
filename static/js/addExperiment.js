$(document).ready(function (e) {
    $(document).on("keyup", ".dynamicInputs input[type='text']:last-of-type", function (e) {
        var parent = $(this).parent();
        if ($(this).val() != "") {
            if (parent.hasClass("demographics")) {
                parent.append("<input name='demofields[][title]' class='input-xxlarge' type='text' placeholder='Ej. Tipo de Contrato, Jefe de Agencia, etc.' /><select name='demofields[][typeof]'><option value='text' selected>Text Field</option><option value='text'>Large Field</option><option value='text'>Radio Button</option></select> <br/>");
            }
            else if (parent.hasClass("pains")) {
                parent.append("<input name='painhypos[][title]' class='input-xxlarge' type='text' placeholder='Ex. Too expensive, Too hard to understand, etc.'/>");
            }
            else {
                parent.append("<input name='gainhypos[][title]' class='input-xxlarge' type='text' placeholder='Ex. Save time, Easy to use, Automation, etc.'/>");
            }

            if ($(".dynamicInputs-text", parent).length) {
                parent.append($(".dynamicInputs-text", parent));
                //$(".dynamicInputs-text", parent).length()
            }
            else {
                parent.append("<p class='dynamicInputs-text'>Leave the field empty if you don't wish to use it.</p>");
            }
            $(this).unbind("keyup");

        }
        else {
            // Do nothing
        }

    });
    $(document).on("blur", ".dynamicInputs > input[type='text']", function (e) {
        var parent = $(this).parent();
        if ($(this).val() == "") {
            var digit = $("input[type='text']", parent).filter(function () { return $(this).val() == ""; }).length;
            if (digit > 1) {
                $(this).next().next("br").remove();
                $(this).next("select").remove();
                $(this).remove();
            }
        }
        else {
            // Chill broski, all is good in the world.
        }
    });

    $("#btn-add-experiment").click(function (e) {

        $(".dynamicInputs > input[type='text']").filter(function () { return $(this).val() == ""; }).each(
            function () {
                $(this).next().next("br").remove();
                $(this).next("select").remove();
                $(this).remove();
            }
        );

        var jsonForm = $('#experimentData').serializeObject();
        var jsonObject = JSON.stringify(jsonForm);

        $.ajax({
            type: "POST",
            url: "http://leanpad.herokuapp.com/experiments.json",
            data: jsonObject,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                window.location.replace("/experiments");
            }
        });
    });

});