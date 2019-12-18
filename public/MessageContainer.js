var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function BasicMessage(props) {
	return React.createElement(
		"li",
		null,
		" ",
		props.name,
		": ",
		props.message,
		" "
	);
}

var MessageContainer = function (_React$Component) {
	_inherits(MessageContainer, _React$Component);

	function MessageContainer(props) {
		_classCallCheck(this, MessageContainer);

		var _this = _possibleConstructorReturn(this, (MessageContainer.__proto__ || Object.getPrototypeOf(MessageContainer)).call(this, props));

		_this.state = {
			messages: []
		};
		return _this;
	}

	_createClass(MessageContainer, [{
		key: "renderMessage",
		value: function renderMessage(msg, key) {
			return React.createElement(BasicMessage, {
				name: msg.name ? msg.name : "Anonymous",
				message: msg.message,
				key: key
			});
		}
	}, {
		key: "addMessage",
		value: function addMessage(msg) {
			var new_messages_state = this.state.messages.slice();
			new_messages_state.push(msg);
			this.setState({ messages: new_messages_state });
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			return React.createElement(
				"ul",
				null,
				Object.entries(this.state.messages).map(function (msg) {
					return _this2.renderMessage(msg[1], msg[0]);
				})
			);
		}
	}]);

	return MessageContainer;
}(React.Component);

var message_container = ReactDOM.render(React.createElement(MessageContainer, null), document.getElementById("message_container"));