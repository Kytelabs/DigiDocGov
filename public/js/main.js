var allTheCharts = [];
var chartDigit = 0;

 // Initial page loader
$(document).ready(function (e) {

    var curexperiment = $("#sidebar-current").val();
    var experimentNumber = $("#sidebar-current-digit").val();
    
    // Remember to change
    var experimentInfoDone = true;
    var peopleDone = true;
    var statsDone = true;

    //var experimentInfoDone = false;
    //var peopleDone = false;
    //var statsDone = false;

    if(experimentInfoDone == true && peopleDone == true && statsDone == true)
        {
            $(".loading").fadeOut("slow", function(){
		        $(".content-master").fadeIn("slow");
	        });
            $(".loading-form").fadeOut("slow", function(){
		        $(".content-master").fadeIn("slow");
	        });
        }

    
	
	$("#statTab").click(function(event)
	{
        $('.statcontainer').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: ''
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
                    ['PRIDCO',   12.8],
                    ['Hacienda',       26.8],
                    {
                        name: 'AAA',
                        y: 45.0,
                        sliced: true,
                        selected: true
                    },
                    ['OGP',    8.5],
                    ['Fortaleza',     6.2],
                    ['AEE',   0.7]
                ]
            }]
        });
       

        /*
		for(var i = 0; i < allTheCharts.length; i++)
		{
			new Highcharts.Chart(allTheCharts[i]);	
		}
		$("#statTab").unbind('click')
        */
	});

	$('#info').on( 'click', 'tr', function (event) 
	{
		if (event.target.nodeName != "A" & event.target.nodeName != "BUTTON" & event.target.nodeName != "INPUT") {
		    window.location.href = $(this).find("a:first").attr("href");
		}
		else {
		    // Do nothing
		}
		
		event.stopImmediatePropagation();
		event.stopPropagation();
		 
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