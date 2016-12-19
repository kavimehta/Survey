google.charts.load('current', {'packages':['corechart', 'line']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
	username = document.getElementById('username').value;
	if (username == "") {
		return;
	}
	var query1 = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1pkfeP8RcJEE0nha_duBzI6L7Yt3EacfqOK3H0RecjxE/edit?usp=sharing/gviz/tq');
	query1.setQuery("SELECT A, X WHERE B = '" + username + "' ORDER BY A");
	query1.send(handleQueryResponse1);

	var query2 = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1pkfeP8RcJEE0nha_duBzI6L7Yt3EacfqOK3H0RecjxE/edit?usp=sharing/gviz/tq');
	query2.setQuery("SELECT A, N, O, P, Q, R, S, T, U, V, W WHERE B = '" + username + "' ORDER BY A");
	query2.send(handleQueryResponse2);
}

function handleQueryResponse1(response) {
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}
	var userTable = response.getDataTable();
	if (userTable.getNumberOfRows() == 0) {
		alert('The username you entered does not match any entries.')
	} else {
		var chart = new google.visualization.LineChart(document.getElementById('agg_chart_div'));
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

function handleQueryResponse2(response) {
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}
	var userTable = response.getDataTable();
	if (userTable.getNumberOfRows() == 0) {
		alert('The username you entered does not match any entries.')
	} else {
		var chart = new google.charts.Line(document.getElementById('individual_chart_div'));
		var options = null;
		chart.draw(userTable, options);
	}
}
