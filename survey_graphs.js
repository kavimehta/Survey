function getUserData() {
	var username = document.getElementById('Username').value;
	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1pkfeP8RcJEE0nha_duBzI6L7Yt3EacfqOK3H0RecjxE/edit?ts=58572ebe#gid=97524261');
	query.setQuery('select * where B = ' + username);
	query.send(handleQueryResponse);
}

function handleQueryResponse(queryResponse) {
	var userTable = queryResponse.getDataTable();
	if (userTable == null) {
		alert('The username you entered does not match any entries.')
	} else {

	}
}