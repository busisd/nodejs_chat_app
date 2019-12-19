$(function () {
	var socket = io();
	
	socket.on('message', function(data) {
		message_container.addMessage(data);
	});
	
	var name_input= $("#name_input");
	var chat_input = $("#chat_input");
	$('form').submit(function(e) {
		e.preventDefault();
		socket.emit('new chat', {"name": name_input.val(), "message": chat_input.val()});
		chat_input.val("");
		
		return false;
	});
	
	setMsgContainerMaxHeight();
	$(window).resize(setMsgContainerMaxHeight);
});

var msg_container = $("#message_container");
function setMsgContainerMaxHeight() {
	msg_container.css({ 'maxHeight' : (window.innerHeight*.9).toString()+"px" });
	console.log('ssss');
}

