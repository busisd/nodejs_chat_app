function BasicMessage(props) {
	return (
		<li> {props.name}: {props.message} </li>
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
	
	addMessage(msg) {
		var new_messages_state = this.state.messages.slice();
		new_messages_state.push(msg);
		this.setState({messages: new_messages_state});
	}
	
	render() {
		return (
			<ul>
				{Object.entries(this.state.messages).map(
					(msg) => {
						return this.renderMessage(msg[1], msg[0]);
					})
				}
			</ul>
		);
	}
}

var message_container = ReactDOM.render(<MessageContainer />, document.getElementById("message_container"));

