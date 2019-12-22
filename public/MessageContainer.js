var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AlertMessage = function (_React$Component) {
	_inherits(AlertMessage, _React$Component);

	function AlertMessage(props) {
		_classCallCheck(this, AlertMessage);

		var _this = _possibleConstructorReturn(this, (AlertMessage.__proto__ || Object.getPrototypeOf(AlertMessage)).call(this, props));

		_this.state = {
			alert_msg: _this.props.alert_msg,
			username: _this.props.username
		};
		return _this;
	}

	_createClass(AlertMessage, [{
		key: "sendAlertMsg",
		value: function sendAlertMsg(obj) {
			alert(obj.state.alert_msg.slice(6));
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			return React.createElement(
				"li",
				{ onClick: function onClick() {
						return _this2.sendAlertMsg(_this2);
					} },
				React.createElement(
					"span",
					{ className: "username" },
					this.state.username
				),
				": Click to see message "
			);
		}
	}]);

	return AlertMessage;
}(React.Component);

function MessageEmote(props) {
	return React.createElement("img", { src: props.src, className: "inline-image" });
}

var emotes = [["GNOME", "gnome.png"], ["DOOT", "doot.jpg"]];
function BasicMessage(props) {
	var msg = props.message;
	var msg_arr = [msg];
	var img_key = 0;

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = emotes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			emote_row = _step.value;

			var emote = emote_row[0];
			var index = 0;
			while (index < msg_arr.length) {
				if (typeof msg_arr[index] !== "string") {
					index += 1;
					continue;
				}

				var emote_loc = msg_arr[index].search(emote);
				if (emote_loc === -1) {
					index += 1;
					continue;
				}

				before_emote = msg_arr[index].substring(0, emote_loc);
				after_emote = msg_arr[index].substring(emote_loc + emote.length, msg_arr[index].length);
				new_emote = React.createElement(MessageEmote, { src: emote_row[1], key: img_key });
				msg_arr.splice(index, 1, before_emote, new_emote, after_emote);

				img_key++;
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	var final_elements_arr = [];
	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = msg_arr[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			item = _step2.value;

			if (typeof item === "string") {
				if (item) {
					final_elements_arr.push(item);
				}
			} else {
				final_elements_arr.push(item);
			}
		}
	} catch (err) {
		_didIteratorError2 = true;
		_iteratorError2 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion2 && _iterator2.return) {
				_iterator2.return();
			}
		} finally {
			if (_didIteratorError2) {
				throw _iteratorError2;
			}
		}
	}

	return React.createElement(
		"li",
		null,
		" ",
		React.createElement(
			"span",
			{ className: "username" },
			" ",
			props.name
		),
		": ",
		msg_arr.map(function (msg_item) {
			return msg_item;
		}),
		" "
	);
}

var MessageContainer = function (_React$Component2) {
	_inherits(MessageContainer, _React$Component2);

	function MessageContainer(props) {
		_classCallCheck(this, MessageContainer);

		var _this3 = _possibleConstructorReturn(this, (MessageContainer.__proto__ || Object.getPrototypeOf(MessageContainer)).call(this, props));

		_this3.state = {
			messages: []
		};
		return _this3;
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
		key: "renderAlertMessage",
		value: function renderAlertMessage(msg, key) {
			return React.createElement(AlertMessage, {
				username: msg.name ? msg.name : "Anonymous",
				alert_msg: msg.message,
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
			var _this4 = this;

			return React.createElement(
				"ul",
				null,
				Object.entries(this.state.messages).map(function (msg) {
					if (msg[1].message.slice(0, 6) === "alert:") {
						return _this4.renderAlertMessage(msg[1], msg[0]);
					} else {
						return _this4.renderMessage(msg[1], msg[0]);
					}
				})
			);
		}
	}]);

	return MessageContainer;
}(React.Component);

var message_container = ReactDOM.render(React.createElement(MessageContainer, null), document.getElementById("message_container"));