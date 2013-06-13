
// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/*
$(document).ready(function(e) {
	
        $('#container').highcharts({
            chart: {
			    style: {
           			fontFamily: 'open-sans',
        		},
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: 'Browser market shares at a specific website, 2010',
				style: {
         			fontFamily: "'open-sans', sans-serif"
      			}
            },
            tooltip: {
        	    pointFormat: '{series.name}: <b>{point.percentage}%</b>',
            	percentageDecimals: 1
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',
                        formatter: function() {
                            return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %';
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                data: [
                    ['Firefox',   45.0],
                    ['IE',       26.8],
                    {
                        name: 'Chrome',
                        y: 12.8,
                        sliced: true,
                        selected: true
                    },
                    ['Safari',    8.5],
                    ['Opera',     6.2],
                    ['Others',   0.7]
                ]
            }]
        });
    });
*/
// Place any jQuery/helper plugins in here.

$(document).ready(function (e) {

    $(document).on("click", ".btn-next-form", function (e) {
        $("#formDropDown option:selected").text();
        console.log($("#formDropDown option:selected").text());
    });


    $(".btn-createInvoice").click(function (e) {
        $(this).addClass("active");
        $(".content-master").fadeOut("slow", function () {
            $(".loading").fadeIn("slow", function () {

                $.getJSON('http://digidocgov.herokuapp.com/forms.json?callback=?', function (response) {

                    var hugeString = "<h1>Escoje Formulario</h1><br /><select id='formDropDown' style='width:300px;'>";

                    for (var i = 0; i < response.length; i++) {
                        hugeString += "<option value='" + response[i].id + "'>" + response[i].title + "</option>";
                    }

                    hugeString += "</select><br /><br /><button id='btn-next-form' class='btn btn-inverse pull-left' type='button'> Proximo </button>"

                    $(".content-master").html(hugeString);

                    $(".loading").fadeOut("slow", function () {
                        $(".content-master").fadeIn("slow");
                    });
                });


                //$(".content-master").html("<option value='text' selected=''>Formulario al CIO</option><option value='text'>PRIDCO Formulario</option></select><br /><br /><button id='btn-next-form' class='btn btn-inverse pull-left' type='button'> Proximo </button>");

            });
        });
    });
});