import React from 'react'; 

class Add extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.defaultValue || "0.00",
			index: 0
		}
	}

	changeValue(event) {
		console.log(event);
		var str = this.state.value.toString(); 
		var index = this.state.index;

		str = str.replace(".", ""); 
		// backspace
		if(event == 'backspace') {
			// index--; 
			// this.setState({index: index}); 
			//str = str.slice(0, -1); 
			str = str.slice(0, -1);
			if(index > 0) {
				index--;	
			}
		}
		else {
			index++; 
			str += event;
		}

		// else if(str === "0") {
		// 	str = event.target.innerHTML; 
		// } 
		// else {
		// 	str += event.target.innerHTML; 
		// }


		if(index < 4) {
			str = str.substring(1, str.length); 
		}


		if(str.length === 1) {
 			str = "00" + str;  
		}
		else if(str.length === 2) {
			str = "0" + str; 
		}


		// Add decimal point
		str = str.slice(0, -2) + "." + str.slice(-2); 

		if(!isNaN(str)) {
			this.setState({value: str, index: index});
		}

		if(this.props.updateValue) {
			this.props.updateValue(str);
		}
	}

	getButton() {
		if(this.props.title.type != 'icon') {
			return(
				<button 
					className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-block btn-add" 
				>
					{ this.props.title.content }
				</button>
			);

		}
		else {
			return(
				<button 
					className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-block btn-add" 
					onClick={ this.props.addExpense.bind(this, this.state.value) }
				>
					<i className="material-icons">{this.props.title.content}</i>
				</button>
			);
		}
	}
	render() {
		return (
			<div className="bottom">
				<div className="addValue">
					{ this.state.value }
				</div>
				<div className="keypad">
					<div className="row">
						<div className="key key1 mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.changeValue.bind(this, "1")}>1</div>						
						<div className="key key2 mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.changeValue.bind(this, "2")}>2</div>
						<div className="key key3 mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.changeValue.bind(this, "3")}>3</div>
					</div>
					<div  className="row">
						<div className="key key4 mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.changeValue.bind(this, "4")}>4</div>						
						<div className="key key5 mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.changeValue.bind(this, "5")}>5</div>
						<div className="key key6 mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.changeValue.bind(this, "6")}>6</div>
					</div>
					<div  className="row">
						<div className="key key7 mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.changeValue.bind(this, "7")}>7</div>						
						<div className="key key8 mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.changeValue.bind(this, "8")}>8</div>
						<div className="key key9 mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.changeValue.bind(this, "9")}>9</div>
					</div>
					<div  className="row">
						<div className="key keyBackSpace backspace mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.changeValue.bind(this, "backspace")}><i className="material-icons backspace">backspace</i></div>						
						<div className="key key0 mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.changeValue.bind(this, "0")}>0</div>
						<div className="key keyOk mdl-button mdl-js-button mdl-js-ripple-effect" onClick={ this.props.addExpense.bind(this, this.state.value) }> <i className="material-icons">{this.props.title.content}</i> </div>
					</div>
				</div>

			</div>


		);
	}
}

export default Add;
