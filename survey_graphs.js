google.charts.load('current', {'packages':['corechart', 'line']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
	username = document.getElementById('username').value;
	if (username == "") {
		return;
	}
	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1pkfeP8RcJEE0nha_duBzI6L7Yt3EacfqOK3H0RecjxE/edit?usp=sharing/gviz/tq');
	query.setQuery("SELECT A, X WHERE B = '" + username + "' ORDER BY A");
	query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}
	var userTable = response.getDataTable();
	if (userTable.getNumberOfRows() == 0) {
		alert('The username you entered does not match any entries.')
	} else {
		var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
		var options = {
			pointSize : 3,
			vAxis: {
	            viewWindowMode:'explicit',
	            viewWindow: {
	              max:100,
	              min:0
            	}
            }
		}
		chart.draw(userTable, options);
	}
}
