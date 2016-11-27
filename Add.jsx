import React from 'react'; 
import SwipeableViews from 'react-swipeable-views'; 
import List from './List.jsx';

class Add extends React.Component {
	constructor(props) {
		super(props);
		var val = ""; 
		if(this.props.defaultValue === undefined) {
			val = "0.00"; 
		}
		else {
			val = this.props.defaultValue + "";
		}

		if(val.indexOf('.') === -1) {
			console.log("decimal");
			val = val + ".00";
		}
		this.state = {
			value: val,
			index: 0,
			active: 'other'
		}
	}

	changeValue(event) {
		var str = this.state.value.toString(); 
		var index = this.state.index;

		str = str.replace(".", ""); 
		// backspace
		if(event == 'backspace') {
			str = str.slice(0, -1);
			if(index > 0) {
				index--;	
			}
		}
		else {
			index++; 
			str += event;
		}

		if(index < 4 && str.substring(0,1) == '0') {
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
		if(str == '0.00') {
			index = 0;
		}

		if(!isNaN(str)) {
			this.setState({value: str, index: index});
		}

		if(this.props.updateValue) {
			this.props.updateValue(str);
		}
	}

	setActive(category) {
		this.setState({active: category});
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
					onClick={ this.props.addExpense.bind(this, this.state.value, true, this.state.cateogry) }
				>
					<i className="material-icons">{this.props.title.content}</i>
				</button>
			);
		}
	}
	render() {
			console.log("drawing value: ", this.state.value);

		if(this.props.favorites) {
			return (
				<SwipeableViews
						axis = { 'x' }
	                    resistance = { true }
	                >
	                <div className="vertical">
	                <div className="addValue">
	                	{ this.state.value }
	                </div>
					<div className="bottom">


						<div className="categories">
							<div onClick={ this.setActive.bind(this, 'other') } className={ this.state.active === 'other' ? 'active category': 'category' }><i className="material-icons">lightbulb_outline</i></div>	
							<div onClick={ this.setActive.bind(this, 'food') } className={ this.state.active === 'food' ?  'active category': 'category'}><i className="material-icons">restaurant</i></div>
							<div onClick={ this.setActive.bind(this, 'drink') } className={ this.state.active === 'drink' ?  'active category': 'category'}><i className="material-icons">local_bar</i></div>
							<div onClick={ this.setActive.bind(this, 'activity') } className={ this.state.active === 'activity' ?  'active category': 'category'}><i className="material-icons">local_activity</i></div>
							<div onClick={ this.setActive.bind(this, 'grocery') } className={ this.state.active === 'grocery' ?  'active category': 'category'}><i className="material-icons">local_grocery_store</i></div>

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
								<div className="key keyOk mdl-button mdl-js-button mdl-js-ripple-effect" onClick={ this.props.addExpense.bind(this, this.state.value, true, this.state.active) }> <i className="material-icons">{this.props.title.content}</i> </div>
							</div>
						</div>
					</div>
					</div>

					<div className="vertical">
						<List 
							favorites = { true }
							expenses = { this.props.expenses }
							isRemove = { this.props.isRemove }
							updateExpenses = { this.props.updateExpenses.bind(this) }
							getCurrentView = { this.props.getCurrentView.bind(this) }
							onChangeIndex = { this.props.onChangeIndex.bind(this) }
							addExpense = { this.props.addExpense.bind(this) }
						/>
					</div>
				</SwipeableViews>
			);
		}
		else {
					return (
						<SwipeableViews
								axis = { 'y' }
			                    resistance = { true }
			                >
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
										<div className="key keyOk mdl-button mdl-js-button mdl-js-ripple-effect" onClick={ this.props.addExpense.bind(this, this.state.value, this.state.active) }> <i className="material-icons">{this.props.title.content}</i> </div>
									</div>
								</div>

							</div>
						</SwipeableViews>
					);
		}

	}
}

export default Add;
