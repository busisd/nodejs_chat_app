class AlertMessage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			alert_msg: this.props.alert_msg,
			username: this.props.username,
		};
	}
	
	sendAlertMsg(obj) {
		alert(obj.state.alert_msg.slice(6));
	}
	
	render() {
		return (
			<li onClick={() => this.sendAlertMsg(this)}>
				<span className="username">
					{this.state.username}
				</span>: Click to see message 
			</li>
		);
	}
}

class BuildMessage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			build_data: this.props.build_data,
			username: this.props.username,
		};
	}
	
	sendStoredBuild() {
		console.log(this.state.build_data);
		build_display.importBuild(this.state.build_data);
	}
	
	render() {
		return (
			<li onClick={() => this.sendStoredBuild(this)}>
				<span className="username">
					{this.state.username}
				</span>: Click to import build 
			</li>
		);
	}
}

function MessageEmote(props) {
	return (
		<img src={props.src} className="inline-image" />
	);
}

const emotes = [
	["GNOME", "gnome.png"],
	["DOOT", "doot.jpg"],
];
function BasicMessage(props) {
	let msg = props.message;
	let msg_arr = [msg];
	let img_key = 0;
	
	for (emote_row of emotes) {
		let emote = emote_row[0];
		let index = 0;
		while(index < msg_arr.length) {
			if (typeof msg_arr[index] !== "string") {
				index += 1;
				continue;
			}
			
			let emote_loc = msg_arr[index].search(emote);
			if (emote_loc === -1) {
				index += 1;
				continue;
			} 

			before_emote = msg_arr[index].substring(0, emote_loc);
			after_emote = msg_arr[index].substring(emote_loc+emote.length, msg_arr[index].length);
			new_emote = <MessageEmote src={emote_row[1]} key={img_key}/>;
			msg_arr.splice(index, 1, before_emote, new_emote, after_emote);
			
			img_key++;
		}
	}
		
	let final_elements_arr = [];
	for (item of msg_arr) {
		if (typeof(item) === "string") {
			if (item) {
				final_elements_arr.push(item);
			}
		} else {
			final_elements_arr.push(item);
		}
	}
		
	return (
		<li> <span className="username"> {props.name}</span>: {msg_arr.map((msg_item) => {
			return msg_item;
		})} </li>
	);
}

class MessageContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
		};
	}
	
	renderMessage(msg, key) {
		return (
			<BasicMessage 
				name={msg.name ? msg.name : "Anonymous"}
				message={msg.message}
				key={key}
			/>
		);
	}
	
	renderAlertMessage(msg, key) {
		return (
			<AlertMessage
				username={msg.name ? msg.name : "Anonymous"}
				alert_msg={msg.message}
				key={key}
			/>
		);
	}
	
	renderBuildMessage(msg, key) {
		return (
			<BuildMessage
				username={msg.name ? msg.name : "Anonymous"}
				build_data={msg.build_data}
				key={key}
			/>
		);
	}
	
	addMessage(msg) {
		var new_messages_state = this.state.messages.slice();
		new_messages_state.push(msg);
		this.setState({messages: new_messages_state});
	}
	
	render() {
		return (
			<ul>
				{Object.entries(this.state.messages).map(
					(msg_row) => {
						if (msg_row[1].message.slice(0,6) === "alert:") {
							return this.renderAlertMessage(msg_row[1], msg_row[0]);
						} else if (msg_row[1].message.slice(0,7) === "/export") {
							return this.renderBuildMessage(msg_row[1], msg_row[0]);
						} else {
							return this.renderMessage(msg_row[1], msg_row[0]);
						}
					})
				}
			</ul>
		);
	}
}

var message_container = ReactDOM.render(<MessageContainer />, document.getElementById("message_container"));

