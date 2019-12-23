function StatField(props) {
	return (
		<span>
			{props.stat}: <input 
				type="number" 
				min={1} 
				max={99} 
				step={1} 
				value={props.val} 
				onChange={props.change_handler}
				onBlur={props.blur_handler}
			/>
			<br />
		</span>
	);
}

function handleChange(e) {
	console.log(e.target.value);
}

class BuildDisplay extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			Vig: 1,
			Att: 1,
			End: 1,
			Vit: 1,
			Str: 1,
			Dex: 1,
			Int: 1,
			Fai: 1,
			Luc: 1,
		}
	}
	
	exportBuild() {
		return this.state.slice();
	}
	
	importBuild(new_build) {
		this.setState(new_build);
	}
	
	makeChangeHandler(stat_name) {
		return (e) => {
			if (isNaN(e.target.value)) return;
			
			update_stat_dict = {};
			update_stat_dict[stat_name] = e.target.value;
			this.setState(update_stat_dict);
		}
	}
	
	makeBlurHandler(stat_name) {
		return (e) => {
			console.log(stat_name);
		}
	}
	
	render() {
		return (
			<p> {
				Object.entries(this.state).map(
					(entry) => {
						return <StatField 
							key={entry[0]}
							stat={entry[0]} 
							val={entry[1]} 
							change_handler={this.makeChangeHandler(entry[0])} 
							blur_handler={this.makeBlurHandler(entry[0])} 
						/>
					}
				)
			} </p>
		);
	}
}





var build_display = ReactDOM.render(<BuildDisplay />, document.getElementById("build_display"));
