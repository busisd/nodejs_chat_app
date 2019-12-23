var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function StatField(props) {
	return React.createElement(
		"span",
		null,
		props.stat,
		": ",
		React.createElement("input", {
			type: "number",
			min: 1,
			max: 99,
			step: 1,
			value: props.val,
			onChange: props.change_handler,
			onBlur: props.blur_handler
		}),
		React.createElement("br", null)
	);
}

function handleChange(e) {
	console.log(e.target.value);
}

var BuildDisplay = function (_React$Component) {
	_inherits(BuildDisplay, _React$Component);

	function BuildDisplay(props) {
		_classCallCheck(this, BuildDisplay);

		var _this = _possibleConstructorReturn(this, (BuildDisplay.__proto__ || Object.getPrototypeOf(BuildDisplay)).call(this, props));

		_this.state = {
			Vig: 1,
			Att: 1,
			End: 1,
			Vit: 1,
			Str: 1,
			Dex: 1,
			Int: 1,
			Fai: 1,
			Luc: 1
		};
		return _this;
	}

	_createClass(BuildDisplay, [{
		key: "exportBuild",
		value: function exportBuild() {
			return this.state;
		}
	}, {
		key: "importBuild",
		value: function importBuild(new_build) {
			this.setState(new_build);
		}
	}, {
		key: "makeChangeHandler",
		value: function makeChangeHandler(stat_name) {
			var _this2 = this;

			return function (e) {
				if (isNaN(e.target.value)) return;

				update_stat_dict = {};
				update_stat_dict[stat_name] = e.target.value;
				_this2.setState(update_stat_dict);
			};
		}
	}, {
		key: "makeBlurHandler",
		value: function makeBlurHandler(stat_name) {
			var _this3 = this;

			return function (e) {
				input_val = parseInt(e.target.value);
				if (isNaN(input_val)) input_val = 1;
				if (input_val < 1) input_val = 1;
				if (input_val > 99) input_val = 99;

				update_stat_dict = {};
				update_stat_dict[stat_name] = input_val;
				_this3.setState(update_stat_dict);
			};
		}
	}, {
		key: "render",
		value: function render() {
			var _this4 = this;

			return React.createElement(
				"p",
				null,
				" ",
				Object.entries(this.state).map(function (entry) {
					return React.createElement(StatField, {
						key: entry[0],
						stat: entry[0],
						val: entry[1],
						change_handler: _this4.makeChangeHandler(entry[0]),
						blur_handler: _this4.makeBlurHandler(entry[0])
					});
				}),
				" "
			);
		}
	}]);

	return BuildDisplay;
}(React.Component);

var build_display = ReactDOM.render(React.createElement(BuildDisplay, null), document.getElementById("build_display"));