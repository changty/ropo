import React from 'react'; 
import { Line, Circle } from 'react-progressbar.js';

class Settings extends React.Component {
	
	saveChanges(event) {		
		event.target.value = event.target.value.replace(',', '.');

		if(event.target.value.slice(-1) === "."){
			event.target.value = parseFloat(event.target.value) + event.target.value.slice(-1) || 0;
		}
		else {
			event.target.value = parseFloat(event.target.value) || 0;
		}

		this.props.update(event.target.value);
	}

		getCircle() {

		var options = {
		           strokeWidth: 5
		       };

       // For demo purposes so the container has some dimensions.
       // Otherwise progress bar won't be shown
       var containerStyle = {
           width: '20vmin',
           height: '20vmin',
       };

		return (
			<Circle
			    progress="100"
			    text={'test'}
			    options={options}
			    initialAnimate={true}
			    containerStyle={containerStyle}
			    containerClassName={'progressbar'}
			 />
		);
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
				<h2>Set funds available for this month</h2>
				<p>Daily funds will be calculated from this moment on.</p>
				<input 
					autoFocus
					type="text"
					defaultValue= { this.props.monthly }  
					placeholder="0" 
					ref="monthlyInput"
					onChange={ this.saveChanges.bind(this) }
				/>
				<p>
					Weekly: { this.props.monthly / this.getWeeksLeft() }
				</p>

				<p>
					Daily: { this.props.monthly / moment().daysInMonth() }
				</p>
				{this.getCircle()}
			</div>


		);
	}
}

export default Settings;
