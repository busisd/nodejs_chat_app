$(function () {
	var socket = io();
	
	socket.on('message', function(data) {
		message_container.addMessage(data);
	});
	
	var name_input= $("#name_input");
	var chat_input = $("#chat_input");
	$('form').submit(function(e) {
		e.preventDefault();
		
		msg_info_dict = {"name": name_input.val(), "message": chat_input.val()}
		if (chat_input.val().slice(0,7) === "/export") {
			msg_info_dict["build_data"] = build_display.exportBuild();
		}
		
		socket.emit('new chat', msg_info_dict);
		chat_input.val("");
		
		return false;
	});
	
	setMsgContainerMaxHeight();
	$(window).resize(setMsgContainerMaxHeight);
});

var msg_container = $("#message_container");
function setMsgContainerMaxHeight() {
	msg_container.css({ 'maxHeight' : (window.innerHeight*.9).toString()+"px" });
}

