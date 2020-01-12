function StatField(props) {
	return (
		<span>
			{props.stat}: <input 
				type="number" 
				className="stat_num"
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

function DamageDisplay(props) {
	return (
		<span> Damage: {calc_damage(props.Str, props.Dex, props.Int)} </span>
	);
}

function calc_damage(Str,Dex,Int) {
	return parseInt(Str)+parseInt(Dex)+parseInt(Int);
}

class BuildDisplay extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			Vig: 10,
			Att: 10,
			End: 10,
			Vit: 10,
			Str: 10,
			Dex: 10,
			Int: 10,
			Fai: 10,
			Luc: 10,
		}
	}
	
	exportBuild() {
		return this.state;
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
			input_val = parseInt(e.target.value);
			if (isNaN(input_val)) input_val = 1;
			if (input_val < 1) input_val = 1;
			if (input_val > 99) input_val = 99;
			
			update_stat_dict = {};
			update_stat_dict[stat_name] = input_val;
			this.setState(update_stat_dict);
		}
	}
	
	render() {
		return (
			<div>
				<div id="stat_list"> {
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
				} </div>
				<DamageDisplay Str={this.state.Str} Dex={this.state.Dex} Int={this.state.Int}/>
			</div>
		);
	}
}

var build_display = ReactDOM.render(<BuildDisplay />, document.getElementById("build_display"));
