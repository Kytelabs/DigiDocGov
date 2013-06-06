var allTheCharts = [];
var chartDigit = 0;

 // Initial page loader
$(document).ready(function (e) {

    var curexperiment = $("#sidebar-current").val();
    var experimentNumber = $("#sidebar-current-digit").val();
    
    var experimentInfoDone = false;
    var peopleDone = false;
    var statsDone = false;

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
        }

    }


    $.getJSON('http://leanpad.herokuapp.com/experiments/' + curexperiment + '.json?callback=?', function (response) {

        //$("#body").html(JSON.stringify(response));

        $(".experiment-info").html("<div class='row-fluid'><div class='span10'><div class='row-fluid'><div class='span10'><h1>" + response.title + "</h1></div></div><div class='row-fluid'><div class='span4'><strong>Start:</strong> " + response.startTime + "</div><div class='span6'><strong>Total Interviews:</strong> " + response.totalInterviews + "</div></div><div class='row-fluid'><div class='span4'><strong>End:</strong> " + response.endTime + "</div><div class='span6'><strong>Customer Segement:</strong> " + response.custsegTitle + "</div></div><div class='row-fluid'><div class='span10'><p>" + response.description + "</p></div></div></div><div class='span2'><div class='jumbo-experiment'><div class='jumbo-number'>" + experimentNumber + "</div></div></div></div>");

        var infoDiv = $("#info");
		
        var demographic = response.demofields;
        var pains = response.painhypos;
        var gains = response.gainhypos;
		
		var stringToAppend;
				
        infoDiv.append("<h2>Demographics</h2>");
		
		stringToAppend = "<ol>";
		for(var i = 0; i < demographic.length; i++)
		{
			stringToAppend += "<li>" + demographic[i].title + ": " + demographic[i].typeof  + "</li>";
        }
		stringToAppend += "</ol>";
		infoDiv.append(stringToAppend);
		
        $("#info").append("<h2>Pains</h2>")
		
		stringToAppend = "<ol>";
		for(var i = 0; i < pains.length; i++)
		{
            stringToAppend += "<li>" + pains[i].title + "</li>";
        }
		stringToAppend += "</ol>";
		infoDiv.append(stringToAppend);
		
        $("#info").append("<h2>Gains</h2>");
		
		stringToAppend = "<ol>";
		for(var i = 0; i < gains.length; i++)
		{
            stringToAppend += "<li>" + gains[i].title + "</li>";
        }
		stringToAppend += "</ol>";
		infoDiv.append(stringToAppend);

        done(1);
    });
	
	$.getJSON('http://leanpad.herokuapp.com/experiments/' + curexperiment + '/interviews.json?callback=?', function (response) {
		
		var peopleDiv = $("#people");
		
		if(response.length == 0)
		{
			peopleDiv.prepend("<p>No interviews yet.</p>");	
		}
		else
		{
			peopleDiv.prepend("<table id='peopleTable' class='table table-striped table-hover'><thead><tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Date</th><th>Delete</th><th></th></tr></thead><tbody></tbody></table>");
			
			peopleDiv = peopleDiv.find("tbody");
			
			for(var i = 0; i < response.length; i++)
			{
				peopleDiv.append("<tr data-toggle='tooltip' rel='tooltip' data-container='body'><td><a href='http://leanpad.herokuapp.com/interviews/" + response[i]._id + ".json' class='table-anchor'>" + (i+1) + "</a></td><td>" + response[i].name + "</td><td>" + response[i].email + "</td><td>" + response[i].phone + "</td><td>" + response[i].interviewDate + "</td><td><a class='deletePerson' href='http://leanpad.herokuapp.com/interviews/" + response[i]._id + ".json'>Delete</a></td><td><input type='checkbox'></td></tr>");
			}
		}
        done(2);
	});	
	
	
	$.getJSON('http://leanpad.herokuapp.com/experiments/' + curexperiment + '/stats.json?callback=?', function (response)
	{

		var statsDiv = $("#stats");
		var demographic = response.demographics;
		
        var pains = response.pains;
        var gains = response.gains;

		statsDiv.append("<h2>Demographics</h2>");
		createChartsDemo(statsDiv, demographic)
		statsDiv.append("<h2>Pains</h2>");
		createChartsPG(statsDiv, pains)
		statsDiv.append("<h2>Gains</h2>");
		createChartsPG(statsDiv, gains)

        done(3);
		
	});
	
	$("#statTab").click(function(event)
	{
		for(var i = 0; i < allTheCharts.length; i++)
		{
			new Highcharts.Chart(allTheCharts[i]);	
		}
		$("#statTab").unbind('click')
	});

    $("#btn-add-person").click(function(event)
    {
        window.location.replace("/interviews/new");
    });

	$('#people').on( 'click', 'tr', function (event) 
	{
		if (event.target.nodeName != "A" & event.target.nodeName != "BUTTON" & event.target.nodeName != "INPUT") {
		    window.location.href = $(this).find("a:first").attr("href");
		}
		else if (event.target.nodeName == "A") {
		    window.location.href = $(this).find(".deletePerson").attr("href");
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