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

		if(event.target.innerHTML == 'B') {
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
			<div className="content">
				<div className="addValue">
					{ this.state.value }
				</div>
				<div className="keypad">
					<div className="row">
						<div className="key key1" onClick={this.changeValue.bind(this)}>1</div>						
						<div className="key key2" onClick={this.changeValue.bind(this)}>2</div>
						<div className="key key3" onClick={this.changeValue.bind(this)}>3</div>
					</div>
					<div  className="row">
						<div className="key key4" onClick={this.changeValue.bind(this)}>4</div>						
						<div className="key key5" onClick={this.changeValue.bind(this)}>5</div>
						<div className="key key6" onClick={this.changeValue.bind(this)}>6</div>
					</div>
					<div  className="row">
						<div className="key key7" onClick={this.changeValue.bind(this)}>7</div>						
						<div className="key key8" onClick={this.changeValue.bind(this)}>8</div>
						<div className="key key9" onClick={this.changeValue.bind(this)}>9</div>
					</div>
					<div  className="row">
						<div className="key keyBackSpace" onClick={this.changeValue.bind(this)}>B</div>						
						<div className="key key0" onClick={this.changeValue.bind(this)}>0</div>
						<div className="key keyDot" onClick={this.changeValue.bind(this)}>.</div>
					</div>
				</div>
				<div className="btn btn-ok btn-block" onClick={ this.props.addExpense.bind(this, this.state.value) }>Save</div>
			</div>


		);
	}
}

export default Add;
