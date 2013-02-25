function Game(player) {
	
	this.player = player
	this.player.id = player._id;
	this.container = $("#board");
	
	
	
	// Action Panel Click Handlers
	
	$("#action_panel .knight").on("click", {id: this.player.id}, function(event) {
		$.ajax({
			type: "POST",
			url: "./spawnknight",
			data: {
				playerid: event.data.id,
			},
			dataType: "json",
			success: function(response) {
				
			}
		});
	});
}