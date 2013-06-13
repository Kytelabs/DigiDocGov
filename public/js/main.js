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

    function done(section)
    {

        switch(section)
		{
			case 1:
				experimentInfoDone = true;
				break;
			case 2:
				peopleDone = true;
				break;
			case 3:
				statsDone = true;
				break;
			default:
				return "Error";
		}

        if(experimentInfoDone == true && peopleDone == true && statsDone == true)
        {
            $(".loading").fadeOut("slow", function(){
		        $(".content-master").fadeIn("slow");
	        });
            $(".loading-form").fadeOut("slow", function(){
		        $(".content-master").fadeIn("slow");
	        });
        }

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

    $("#btn-add-person").click(function(event)
    {
        window.location.replace("/interviews/new");
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

// Functions

	function getString(digit, intensityBoolean)
	{
		if(intensityBoolean)
		{
			switch(digit)
			{
			case 1:
				return "Low intensity";
				break;
			case 2:
				return "Medium intensity"
				break;
			case 3:
				return "High intensity"
				break;
			default:
				return "Error";
			}
		}
		else
		{
			switch(digit)
			{
			case 1:
				return "Low frequency";
				break;
			case 2:
				return "Medium frequency"
				break;
			case 3:
				return "High frequency"
				break;
			default:
				return "Error";
			}	
		}
	}
	
	
	function createChartsDemo(containerDiv, infoArray)
	{
		for(var i = 0; i < infoArray.length; i++)
		{
			var stat = infoArray[i];
		
			var title = stat.title;
			
			var datapoints = [];
			var valueStat;
			
			var maxIndex = 0;
			var maxCount = 0;
			var maxValue;
			
			for(var j = 0; j < stat.values.length; j++)
			{

				valueStat = stat.values[j];
				
				if(valueStat.count >= maxCount)
				{
					maxIndex = j;
					maxCount = valueStat.count;
					maxValue = valueStat;	
				}
				datapoints.push(new Array(valueStat.value,valueStat.count));
			}
			
			datapoints[maxIndex] =                     
			{
                name: maxValue.value,
                y: maxValue.count,
                sliced: true,
                selected: true
            };
			
			chartName = "chart" + chartDigit;		
			containerDiv.append("<div id='chart" + chartDigit +"' class='chart' style='width:800px; height:400px;'></div>");	
			chartDigit++;
			
			createChart(chartName ,title,datapoints);
		}
	}
	
	function createChartsPG(containerDiv, infoArray)
	{
		for(var i = 0; i < infoArray.length; i++)
		{
			var stat = infoArray[i];
		
			var title = stat.title;
			
			chartIterate(stat.intensity, containerDiv, title, true);
			chartIterate(stat.priority, containerDiv, "", false);
		}
	}	
	
	function chartIterate(iterationValue, containerDiv, title, intensityBoolean)
	{
		var datapoints = [];
		var valueStat;
			
		var maxIndex = 0;
		var maxCount = 0;
		var maxValue;
		
		for(var j = 0; j < iterationValue.length; j++)
			{

				valueStat = iterationValue[j];
				
				if(valueStat.count >= maxCount)
				{
					maxIndex = j;
					maxCount = valueStat.count;
					maxValue = valueStat;	
				}
				
				var string = getString(valueStat.value, intensityBoolean);
				
				datapoints.push(new Array(string,valueStat.count));
			}
			
			datapoints[maxIndex] =                     
			{
                name: getString(maxValue.value, intensityBoolean),
                y: maxValue.count,
                sliced: true,
                selected: true
            };
			
			chartName = "chart" + chartDigit;		
			containerDiv.append("<div id='chart" + chartDigit +"' class='chart' style='width:800px; height:400px;'></div>");	
			chartDigit++;
			
			createChart(chartName ,title,datapoints);	
	}
	
	function createChart(renderDiv, title ,datapoints)
	{	
		var chart = {
				chart: {
					style: {
						fontFamily: 'open-sans',
					},
					renderTo: renderDiv,
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false
				},
				title: {
					text: title,
					style: {
						fontFamily: "'open-sans', sans-serif"
					}
				},
				tooltip: {
                     formatter: function() {
                        return '<b>'+ this.point.name +'</b>: '+ Math.round(this.percentage) +' %';
                     }
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
					name: 'Segement',
					data: datapoints
				}]
			};
			
			allTheCharts.push(chart);
			return chart;
	}
	
	function validKey(string) {
		if (string != "deleted_at" && string != "updated_at" && string != "created_at" && string != "_id" && string != "version") {
			return true;
		}
		else {
			return false;
		}
	}