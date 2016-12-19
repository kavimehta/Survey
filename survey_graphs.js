function getUserData(username) {
	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1pkfeP8RcJEE0nha_duBzI6L7Yt3EacfqOK3H0RecjxE/edit?ts=58572ebe#gid=97524261');
	query.setQuery('select * where B = ' + username);
	query.send(handleQueryResponse);
}

function handleQueryResponse(queryResponse) {
	var userTable = queryResponse.getDataTable();
	if (userTable == null) {
		alert('The username you entered does not match any entries.')
	} else {
		var userView = new google.visualization.DataView(userTable).setColumns([0, 23])
		var obj = new Object();
		obj.chartType = 'LineChart';
		obj.containerId = document.createElement("CANVAS").id;
		obj.dataTable = userTable;
		obj.view = userView;
		google.visualization.drawChart(obj);
	}
}
