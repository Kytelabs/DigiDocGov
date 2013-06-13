$(document).ready(function (e) {

    $(".btn-add-unique").click(function (e) {

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