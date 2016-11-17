import React from 'react'; 
import { Line, Circle } from 'react-progressbar.js';
import Add from './Add.jsx';

class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			monthly: this.props.monthly,
		}
	}
	
	saveChanges(event) {
		event = event.replace(',', '.');

		if(event.slice(-1) === "."){
			event = parseFloat(event) + event.slice(-1) || 0;
		}
		else {
			event = parseFloat(event) || 0;
		}

		this.props.update(event);
	}

	updateMonthly(monthly) {
		this.setState({monthly: monthly});
	}

	getWeeksLeft() {
		var weeks = moment(moment().endOf('month')).diff(moment().today, 'weeks');
		return weeks; 
	}

	getDaysLeft() {
		var daysLeft = moment(moment().endOf('month')).diff(moment().today, 'days')
		return daysLeft; 
	}

	render() {
		return (
			<div className="content">
				<h4>Set budget for this month</h4>
				
				{ /*<input 
					autoFocus
					type="text"
					defaultValue= { this.props.monthly }  
					placeholder="0" 
					ref="monthlyInput"
					onChange={ this.saveChanges.bind(this) }
				/>
			*/}

				<div className="availableToday">
					<div className="now">{ parseFloat(this.state.monthly / moment().daysInMonth()).toFixed(2) } </div>
				   <span className="description">Daily budget</span>

				</div>

				<Add
					favorites = { false }
					defaultValue = { this.props.monthly }
					title = { {type: 'icon', content: "done" } }
					updateValue = { this.updateMonthly.bind(this) }
					addExpense={ this.saveChanges.bind(this) }
				/>

			</div>


		);
	}
}

export default Settings;
