$(siteSetup);

function siteSetup() {
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
	
	load_weapon_scale_data();
}

var msg_container = $("#message_container");
function setMsgContainerMaxHeight() {
	msg_container.css({ 'maxHeight' : (window.innerHeight*.9).toString()+"px" });
}

var scale_data;
var sat_curve;
function load_weapon_scale_data() {
	$.get("/scale_data.csv", (scale_data_plaintext, textStatus, req) => {
		scale_data = parse_csv_key_by_first_row_and_column(scale_data_plaintext);
	});
	$.get("/sat_curve.csv", (sat_curve_plaintext, textStatus, req) => {
		sat_curve = parse_csv_key_by_first_row_and_column(sat_curve_plaintext);
	});
}

function parse_csv_key_by_first_row_and_column(csv_text) {
	let parsed_csv_dict = {}
	
	let data_array = csv_text.split("\n");
	let header_tags = data_array[0].split(",");
	
	for (let i=1; i<data_array.length; i++) {
		let cur_row = data_array[i].split(",");
		let new_row_dict = {};
		
		for (let j=1; j<header_tags.length; j++) {
			new_row_dict[header_tags[j]] = cur_row[j];
		}
		
		parsed_csv_dict[cur_row[0]] = new_row_dict; 
	}
	
	return parsed_csv_dict;
}
