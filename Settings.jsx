import React from 'react'; 
import { Line, Circle } from 'react-progressbar.js';
import Add from './Add.jsx';

class Settings extends React.Component {
	
	saveChanges(event) {	

		// event.target.value = event.target.value.replace(',', '.');

		// if(event.target.value.slice(-1) === "."){
		// 	event.target.value = parseFloat(event.target.value) + event.target.value.slice(-1) || 0;
		// }
		// else {
		// 	event.target.value = parseFloat(event.target.value) || 0;
		// }

		// this.props.update(event.target.value);


		event= event.replace(',', '.');

		if(event.slice(-1) === "."){
			event = parseFloat(event) + event.slice(-1) || 0;
		}
		else {
			event = parseFloat(event) || 0;
		}

		console.log(event);
		this.props.update(event);
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
				<h4>Set funds available for this month</h4>
				
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
					<div className="now">{ parseFloat(this.props.monthly / moment().daysInMonth()).toFixed(2) } </div>
				   <span className="description">Daily budget</span>

				</div>

				<Add
					defaultValue = { this.props.monthly }
					title = { {type: 'text', content: "Set monthly budget" } }
					addExpense={ this.saveChanges.bind(this) }
				/>

			</div>


		);
	}
}

export default Settings;
