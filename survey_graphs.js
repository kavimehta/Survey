/* Load the necessary libraries for Google Charts. */
google.charts.load('current', {'packages':['corechart', 'line', 'table']});
google.charts.setOnLoadCallback(drawChart);

/* Called when user hits Submit button. */
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

	var query3 = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1pkfeP8RcJEE0nha_duBzI6L7Yt3EacfqOK3H0RecjxE/edit?usp=sharing/gviz/tq');
	query3.setQuery("SELECT A, X, M WHERE B = '" + username + "' ORDER BY A");
	query3.send(handleQueryResponse3);
}

/* Generate main graph of Score by Time. */
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

/* Generate graph with a line for each emotion's score. */
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

/* Generate a table for each entry's score and message. */
function handleQueryResponse3(response) {
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}
	var userTable = response.getDataTable();
	if (userTable.getNumberOfRows() == 0) {
		alert('The username you entered does not match any entries.')
	} else {
		var table = new google.visualization.Table(document.getElementById('msg_table_div'));
		var options = null;
		table.draw(userTable, options);
	}
}

/* Global variable to store the nudges for each day. */
var nudges = {
	1 : {
		"low" : "",
		"medium" : "",
		"high" : ""
	},
	2 : {
		"low" : "",
		"medium" : "",
		"high" : ""
	},
	3 : {
		"low" : "",
		"medium" : "",
		"high" : ""
	},
	4 : {
		"low" : "",
		"medium" : "",
		"high" : ""
	},
	5 : {
		"low" : "",
		"medium" : "",
		"high" : ""
	}
}

/* Returns what range a score is in: low, medium, or high. */
function get_range(score) {
	if (score <= 42) {
		return "low";
	} else if (score <= 67) {
		return "medium";
	} else {
		return "high";
	}
}

