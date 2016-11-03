import React from 'react'; 

class Add extends React.Component {
	constructor() {
		super();
		this.state = {
			value: "0"
		}
	}

	changeValue(event) {
		var str = this.state.value; 
		console.log(event.target.className);
		if(event.target.className.indexOf('backspace') !== -1) {
			str = str.slice(0, -1); 
		}
		else if(str === "0") {
			str = event.target.innerHTML; 
		} 
		else {
			str += event.target.innerHTML; 
		}

		this.setState({value: str}); 
	}

	render() {
		return (
			<div className="content bottom">
				<div className="addValue">
					{ this.state.value }
				</div>
				<div className="keypad">
					<div className="row">
						<div className="key key1 mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.changeValue.bind(this)}>1</div>						
						<div className="key key2 mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.changeValue.bind(this)}>2</div>
						<div className="key key3 mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.changeValue.bind(this)}>3</div>
					</div>
					<div  className="row">
						<div className="key key4 mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.changeValue.bind(this)}>4</div>						
						<div className="key key5 mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.changeValue.bind(this)}>5</div>
						<div className="key key6 mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.changeValue.bind(this)}>6</div>
					</div>
					<div  className="row">
						<div className="key key7 mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.changeValue.bind(this)}>7</div>						
						<div className="key key8 mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.changeValue.bind(this)}>8</div>
						<div className="key key9 mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.changeValue.bind(this)}>9</div>
					</div>
					<div  className="row">
						<div className="key keyBackSpace backspace mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.changeValue.bind(this)}><i className="material-icons backspace">backspace</i></div>						
						<div className="key key0 mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.changeValue.bind(this)}>0</div>
						<div className="key keyDot mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.changeValue.bind(this)}>.</div>
					</div>
				</div>
				<button 
					className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-block btn-add" 
					onClick={ this.props.addExpense.bind(this, this.state.value) }
				>
					<i className="material-icons">add</i>
				</button>
			</div>


		);
	}
}

export default Add;
