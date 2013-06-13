$(document).ready(function (e) {

    $(".btn-add-unique").click(function (e) {

        $(".dynamicInputs > input[type='text']").filter(function () { return $(this).val() == ""; }).each(
            function () {
                $(this).next().next("br").remove();
                $(this).next("select").remove();
                $(this).remove();
            }
        );

        var jsonForm = $('#formData').serializeObject();
        var jsonObject = JSON.stringify(jsonForm);

        console.log(jsonObject);
        
        $.ajax({
            type: "POST",
            url: "http://digidocgov.herokuapp.com/forms.json",
            data: jsonObject,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                window.location.replace("/forms");
            }
        });
        

    });
});