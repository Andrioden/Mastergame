function login() {
	
	var username = $("#login_username").val();
	var password = $("#login_password").val();

	$.ajax({
		type: "POST",
		url: "./weaklogin",
		data: {
			username: username,
			password: password
		},
		dataType: "json",
		success: function(response) {
			console.log(response);
			if (response.response == "success") loggedInnAs(response.player);
			else alert(response.error);
		}
	});

}

function createPlayer() {

	var username = $("#login_username").val();
	var password = $("#login_password").val();

	$.ajax({
		type: "POST",
		url: "./createplayer",
		data: {
			username: username,
			password: password
		},
		dataType: "json",
		success: function(response) {
			console.log(response);
			if (response.response == "success") loggedInnAs(response.player);
			else alert("Username taken");
		}
	});
}

function loggedInnAs(player) {
	game = new Game(player);
	$("#username_header").text(player.username);
	$("#login").hide();
	$("#game").show();
}